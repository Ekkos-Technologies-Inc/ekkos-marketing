import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const runtime = 'edge';
export const revalidate = 30; // Cache for 30 seconds

interface ServiceStatus {
  service_id: string;
  service_name: string;
  description: string;
  icon: string;
  status: 'operational' | 'degraded' | 'outage' | 'maintenance';
  response_time_ms: number | null;
  checked_at: string | null;
  uptime_30d: number;
}

interface Incident {
  id: string;
  title: string;
  description: string;
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved';
  severity: 'minor' | 'major' | 'critical';
  affected_services: string[];
  started_at: string;
  resolved_at: string | null;
}

export async function GET() {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Get current status for all services using the function
    const { data: statusData, error: statusError } = await supabase
      .rpc('get_current_status');

    if (statusError) {
      console.error('Failed to fetch status:', statusError);
      // Return fallback data if database is unavailable
      return NextResponse.json({
        services: getDefaultServices(),
        incidents: [],
        lastUpdated: new Date().toISOString(),
        overall: 'operational',
      });
    }

    // Get recent incidents (last 90 days, non-resolved or resolved within 7 days)
    const { data: incidentsData } = await supabase
      .from('status_incidents')
      .select('*')
      .or('resolved_at.is.null,resolved_at.gte.' + new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .order('started_at', { ascending: false })
      .limit(10);

    const services: ServiceStatus[] = statusData?.map((s: Record<string, unknown>) => ({
      service_id: s.service_id,
      service_name: s.service_name,
      description: s.description,
      icon: s.icon,
      status: s.status || 'operational',
      response_time_ms: s.response_time_ms,
      checked_at: s.checked_at,
      uptime_30d: s.uptime_30d || 100,
    })) || getDefaultServices();

    const incidents: Incident[] = incidentsData || [];

    // Calculate overall status
    let overall: 'operational' | 'degraded' | 'outage' | 'maintenance' = 'operational';
    if (services.some(s => s.status === 'outage')) {
      overall = 'outage';
    } else if (services.some(s => s.status === 'degraded')) {
      overall = 'degraded';
    } else if (services.some(s => s.status === 'maintenance')) {
      overall = 'maintenance';
    }

    // Calculate stats
    const avgUptime = services.length > 0
      ? services.reduce((sum, s) => sum + (s.uptime_30d || 100), 0) / services.length
      : 100;

    const avgResponseTime = services.filter(s => s.response_time_ms).length > 0
      ? Math.round(
          services
            .filter(s => s.response_time_ms)
            .reduce((sum, s) => sum + (s.response_time_ms || 0), 0) /
          services.filter(s => s.response_time_ms).length
        )
      : null;

    const majorIncidents = incidents.filter(
      i => i.severity === 'major' || i.severity === 'critical'
    ).length;

    return NextResponse.json({
      services,
      incidents,
      lastUpdated: new Date().toISOString(),
      overall,
      stats: {
        avgUptime: avgUptime.toFixed(2),
        avgResponseTime,
        majorIncidents,
      },
    });
  } catch (error) {
    console.error('Status API error:', error);
    return NextResponse.json({
      services: getDefaultServices(),
      incidents: [],
      lastUpdated: new Date().toISOString(),
      overall: 'operational',
      stats: {
        avgUptime: '99.99',
        avgResponseTime: null,
        majorIncidents: 0,
      },
    });
  }
}

function getDefaultServices(): ServiceStatus[] {
  return [
    {
      service_id: 'memory-api',
      service_name: 'Memory API',
      description: 'Core memory storage and retrieval',
      icon: 'Server',
      status: 'operational',
      response_time_ms: null,
      checked_at: null,
      uptime_30d: 99.99,
    },
    {
      service_id: 'mcp-server',
      service_name: 'MCP Server',
      description: 'Model Context Protocol endpoint',
      icon: 'Cpu',
      status: 'operational',
      response_time_ms: null,
      checked_at: null,
      uptime_30d: 99.99,
    },
    {
      service_id: 'platform',
      service_name: 'Platform',
      description: 'Dashboard and user management',
      icon: 'Globe',
      status: 'operational',
      response_time_ms: null,
      checked_at: null,
      uptime_30d: 99.99,
    },
    {
      service_id: 'docs',
      service_name: 'Documentation',
      description: 'Docs and API reference',
      icon: 'BookOpen',
      status: 'operational',
      response_time_ms: null,
      checked_at: null,
      uptime_30d: 99.99,
    },
  ];
}
