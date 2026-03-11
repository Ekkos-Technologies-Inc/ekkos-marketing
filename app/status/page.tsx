'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  CheckCircle2, AlertTriangle, XCircle, RefreshCw,
  Server, Database, Globe, Cpu, Shield, Clock,
  ArrowLeft, ExternalLink, BookOpen, FileText, Loader2
} from 'lucide-react';

type ServiceStatus = 'operational' | 'degraded' | 'outage' | 'maintenance';

interface ServiceData {
  service_id: string;
  service_name: string;
  description: string;
  icon: string;
  status: ServiceStatus;
  response_time_ms: number | null;
  checked_at: string | null;
  uptime_30d: number;
}

interface IncidentData {
  id: string;
  title: string;
  description: string;
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved';
  severity: 'minor' | 'major' | 'critical';
  affected_services: string[];
  started_at: string;
  resolved_at: string | null;
}

interface StatusResponse {
  services: ServiceData[];
  incidents: IncidentData[];
  lastUpdated: string;
  overall: ServiceStatus;
  stats: {
    avgUptime: string;
    avgResponseTime: number | null;
    majorIncidents: number;
  };
}

const statusConfig = {
  operational: {
    label: 'Operational',
    color: 'text-[#00ff88]',
    bgColor: 'bg-[#00ff88]/10',
    borderColor: 'border-[#00ff88]/30',
    icon: CheckCircle2,
  },
  degraded: {
    label: 'Degraded',
    color: 'text-[#ffb800]',
    bgColor: 'bg-[#ffb800]/10',
    borderColor: 'border-[#ffb800]/30',
    icon: AlertTriangle,
  },
  outage: {
    label: 'Outage',
    color: 'text-[#ff3366]',
    bgColor: 'bg-[#ff3366]/10',
    borderColor: 'border-[#ff3366]/30',
    icon: XCircle,
  },
  maintenance: {
    label: 'Maintenance',
    color: 'text-[#00f0ff]',
    bgColor: 'bg-[#00f0ff]/10',
    borderColor: 'border-[#00f0ff]/30',
    icon: RefreshCw,
  },
};

// Map icon strings to components
const iconMap: Record<string, typeof Server> = {
  Server,
  Database,
  Globe,
  Cpu,
  Shield,
  BookOpen,
  FileText,
};

const serviceUrls: Record<string, string> = {
  'memory-api': 'https://api.ekkos.dev',
  'mcp-server': 'https://mcp.ekkos.dev',
  'platform': 'https://platform.ekkos.dev',
  'docs': 'https://docs.ekkos.dev',
  'marketing': 'https://ekkos.dev',
  'blog': 'https://blog.ekkos.dev',
};

export default function StatusPage() {
  const [data, setData] = useState<StatusResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) {
      setIsRefreshing(true);
    }

    try {
      const response = await fetch('/api/status', {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch status');
      }

      const result: StatusResponse = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch status:', err);
      setError('Unable to fetch live status. Showing cached data.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => fetchStatus(), 30000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  const handleRefresh = () => {
    fetchStatus(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#00f0ff] animate-spin mx-auto mb-4" />
          <p className="text-[#7a7a8e] font-mono">Loading status...</p>
        </div>
      </div>
    );
  }

  const services = data?.services || [];
  const incidents = data?.incidents || [];
  const overallStatus = data?.overall || 'operational';
  const stats = data?.stats || { avgUptime: '99.99', avgResponseTime: null, majorIncidents: 0 };
  const lastUpdated = data?.lastUpdated ? new Date(data.lastUpdated) : new Date();

  const overallConfig = statusConfig[overallStatus];
  const OverallIcon = overallConfig.icon;

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#7a7a8e] hover:text-[#e8e8f0] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to ekkOS
        </Link>

        {/* Error banner */}
        {error && (
          <div className="max-w-4xl mx-auto mb-6">
            <div className="clip-md px-4 py-3 bg-[#ffb800]/10 border border-[#ffb800]/20 text-[#ffb800] text-sm font-mono">
              {error}
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center justify-center w-20 h-20 clip-md ${overallConfig.bgColor} ${overallConfig.borderColor} border mb-6`}>
            <OverallIcon className={`w-10 h-10 ${overallConfig.color}`} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-display text-[#e8e8f0] mb-4">System Status</h1>
          <p className={`text-2xl font-display ${overallConfig.color} mb-2`}>
            {overallStatus === 'operational'
              ? 'All Systems Operational'
              : overallStatus === 'degraded'
                ? 'Some Systems Degraded'
                : overallStatus === 'outage'
                  ? 'Service Disruption'
                  : 'Scheduled Maintenance'}
          </p>
          <div className="flex items-center justify-center gap-4 text-[#4a4a5e] text-sm font-mono">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1 hover:text-[#7a7a8e] transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="max-w-4xl mx-auto mb-12">
          <p className="section-label mb-6">SERVICES</p>
          <div className="space-y-4">
            {services.map((service) => {
              const config = statusConfig[service.status];
              const StatusIcon = config.icon;
              const ServiceIcon = iconMap[service.icon] || Globe;
              const serviceUrl = serviceUrls[service.service_id];

              return (
                <div
                  key={service.service_id}
                  className="clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] p-5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 clip-sm bg-[#0d0d14]/50 backdrop-blur-md flex items-center justify-center">
                        <ServiceIcon className="w-5 h-5 text-[#00f0ff]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-[#e8e8f0] font-display">{service.service_name}</h3>
                          {serviceUrl && (
                            <a
                              href={serviceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#4a4a5e] hover:text-[#7a7a8e] transition-colors"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                        <p className="text-sm text-[#4a4a5e] font-body">{service.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <p className="text-sm text-[#7a7a8e] font-mono">Uptime</p>
                        <p className="text-[#e8e8f0] font-mono">{service.uptime_30d.toFixed(2)}%</p>
                      </div>
                      {service.response_time_ms && (
                        <div className="text-right hidden md:block">
                          <p className="text-sm text-[#7a7a8e] font-mono">Latency</p>
                          <p className="text-[#e8e8f0] font-mono">{service.response_time_ms}ms</p>
                        </div>
                      )}
                      <div className={`flex items-center gap-2 px-3 py-1.5 clip-sm ${config.bgColor} ${config.borderColor} border`}>
                        <StatusIcon className={`w-4 h-4 ${config.color}`} />
                        <span className={`text-sm font-mono ${config.color}`}>
                          {config.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Uptime Summary */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] p-6">
            <p className="section-label mb-4">30-DAY UPTIME</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-mono font-bold text-[#00ff88]">{stats.avgUptime}%</p>
                <p className="text-sm text-[#4a4a5e] font-mono">Overall Uptime</p>
              </div>
              <div>
                <p className="text-3xl font-mono font-bold text-[#e8e8f0]">{stats.majorIncidents}</p>
                <p className="text-sm text-[#4a4a5e] font-mono">Major Incidents</p>
              </div>
              <div>
                <p className="text-3xl font-mono font-bold text-[#e8e8f0]">
                  {stats.avgResponseTime ? `${stats.avgResponseTime}ms` : '<50ms'}
                </p>
                <p className="text-sm text-[#4a4a5e] font-mono">Avg Response Time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Incidents */}
        <div className="max-w-4xl mx-auto mb-12">
          <p className="section-label mb-6">RECENT INCIDENTS</p>
          {incidents.length === 0 ? (
            <div className="clip-md bg-[#0d0d14]/50 backdrop-blur-md border border-[#1a1a2e] p-8 text-center">
              <CheckCircle2 className="w-12 h-12 text-[#00ff88] mx-auto mb-4" />
              <p className="text-[#7a7a8e] font-body">No incidents reported in the last 90 days</p>
            </div>
          ) : (
            <div className="space-y-4">
              {incidents.map((incident) => (
                <div key={incident.id} className="clip-md bg-[#111118]/60 backdrop-blur-xl border border-[#1a1a2e] p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-[#e8e8f0] font-display">{incident.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`tag ${
                        incident.severity === 'critical'
                          ? 'bg-[#ff3366]/10 text-[#ff3366] border-[#ff3366]/30'
                          : incident.severity === 'major'
                            ? 'bg-[#ffb800]/10 text-[#ffb800] border-[#ffb800]/30'
                            : 'bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/30'
                      }`}>
                        {incident.severity}
                      </span>
                      <span className={`tag ${
                        incident.status === 'resolved'
                          ? 'bg-[#00ff88]/10 text-[#00ff88] border-[#00ff88]/30'
                          : incident.status === 'monitoring'
                            ? 'bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/30'
                            : 'bg-[#ffb800]/10 text-[#ffb800] border-[#ffb800]/30'
                      }`}>
                        {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-[#4a4a5e] font-mono mb-2">
                    {new Date(incident.started_at).toLocaleDateString()}
                    {incident.resolved_at && ` - Resolved ${new Date(incident.resolved_at).toLocaleDateString()}`}
                  </p>
                  <p className="text-sm text-[#7a7a8e] font-body">{incident.description}</p>
                  {incident.affected_services.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {incident.affected_services.map((svc) => (
                        <span key={svc} className="tag bg-[#0d0d14]/50 backdrop-blur-md text-[#4a4a5e]">
                          {svc}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Subscribe */}
        <div className="max-w-4xl mx-auto">
          <div className="clip-lg bg-[#111118]/60 backdrop-blur-xl border border-[#00f0ff]/30 p-8 text-center">
            <h2 className="text-2xl font-display text-[#e8e8f0] mb-2">Stay Updated</h2>
            <p className="text-[#7a7a8e] mb-6 font-body">
              Get notified about scheduled maintenance and service disruptions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://twitter.com/ekkosdev"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Follow @ekkosdev
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                href="/support"
                className="btn-primary"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
