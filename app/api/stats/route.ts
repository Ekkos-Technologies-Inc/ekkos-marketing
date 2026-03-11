import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
// Service role key bypasses RLS to get global (all-user) counts
const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const LIVE_STATS_URL = process.env.EKKOS_LIVE_STATS_URL || 'https://ekkos.dev/api/stats';

export const runtime = 'edge';
export const revalidate = 60; // Cache for 60 seconds

const FALLBACK = {
  applications: 0,
  applyRate: '—',
  patterns: 0,
  highConfidencePatterns: 0,
  deltaEvaluations: 0,
  sessions: 0,
  speedup: null as number | null,
  speedupResolutions: 0,
  speedupPatternAssisted: 0,
  avgTurnsNoPatterns: null as number | null,
  avgTurnsWithPatterns: null as number | null,
};

type RetrievalRow = {
  session_id: string | null;
  pattern_count: number | null;
  retrieved_patterns: string[] | null;
  applied_patterns: string[] | null;
};

type MarketingStatsRow = {
  applications: number;
  patterns: number;
  high_confidence_patterns: number;
  delta_evaluations: number;
  sessions: number;
  total_retrieved_patterns: number;
};

async function fetchLiveStatsFromProduction(): Promise<Record<string, unknown> | null> {
  try {
    const response = await fetch(LIVE_STATS_URL, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 60 },
    });

    if (!response.ok) return null;
    const payload = await response.json();
    if (!payload || typeof payload !== 'object') return null;
    return payload as Record<string, unknown>;
  } catch {
    return null;
  }
}

async function fetchMarketingStatsDirect(
  supabase: { from: (table: string) => any },
  windowStart: string
): Promise<MarketingStatsRow> {
  const fetchAllRows = async <T>(
    pageFetcher: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: { message: string } | null }>
  ): Promise<T[]> => {
    const pageSize = 1000;
    let from = 0;
    const rows: T[] = [];

    while (true) {
      const { data, error } = await pageFetcher(from, from + pageSize - 1);
      if (error) throw new Error(error.message);
      if (!data || data.length === 0) break;
      rows.push(...data);
      if (data.length < pageSize) break;
      from += pageSize;
    }

    return rows;
  };

  const [
    applicationsRes,
    patternsRes,
    highConfidenceRes,
    deltaEvaluationsRes,
    retrievalRows,
  ] = await Promise.all([
    supabase
      .from('pattern_applications')
      .select('*', { count: 'exact', head: true })
      .gte('applied_at', windowStart),
    supabase
      .from('patterns')
      .select('*', { count: 'exact', head: true }),
    supabase
      .from('patterns')
      .select('*', { count: 'exact', head: true })
      .gte('success_rate', 0.8)
      .gt('applied_count', 0),
    supabase
      .from('delta_evaluations')
      .select('*', { count: 'exact', head: true }),
    fetchAllRows<RetrievalRow>((from, to) =>
      supabase
        .from('pattern_retrievals')
        .select('session_id, pattern_count, retrieved_patterns, applied_patterns')
        .gte('created_at', windowStart)
        .order('created_at', { ascending: true })
        .range(from, to)
    ),
  ]);

  const queryErrors = [
    applicationsRes.error && `pattern_applications: ${applicationsRes.error.message}`,
    patternsRes.error && `patterns(total): ${patternsRes.error.message}`,
    highConfidenceRes.error && `patterns(high_confidence): ${highConfidenceRes.error.message}`,
    deltaEvaluationsRes.error && `delta_evaluations: ${deltaEvaluationsRes.error.message}`,
  ].filter(Boolean);

  if (queryErrors.length > 0) {
    throw new Error(queryErrors.join('; '));
  }

  let totalRetrievedPatterns = 0;
  const sessions = new Set<string>();

  for (const row of retrievalRows) {
    const sessionId = row.session_id?.trim();
    if (sessionId) sessions.add(sessionId);

    const retrievedCountFromArray = Array.isArray(row.retrieved_patterns) ? row.retrieved_patterns.length : 0;
    const retrievedCount =
      typeof row.pattern_count === 'number' && row.pattern_count > 0
        ? row.pattern_count
        : retrievedCountFromArray;
    totalRetrievedPatterns += Math.max(0, retrievedCount);
  }

  return {
    applications: applicationsRes.count || 0,
    patterns: patternsRes.count || 0,
    high_confidence_patterns: highConfidenceRes.count || 0,
    delta_evaluations: deltaEvaluationsRes.count || 0,
    sessions: sessions.size,
    total_retrieved_patterns: totalRetrievedPatterns,
  };
}

export async function GET() {
  try {
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      const liveStats = await fetchLiveStatsFromProduction();
      if (liveStats) {
        return NextResponse.json(liveStats);
      }

      return NextResponse.json({
        ...FALLBACK,
        timestamp: new Date().toISOString(),
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const toFiniteNumber = (value: unknown, fallback: number): number => {
      const numeric = Number(value);
      return Number.isFinite(numeric) ? numeric : fallback;
    };

    const [stats, speedupRes] = await Promise.all([
      fetchMarketingStatsDirect(supabase, thirtyDaysAgo),
      supabase
        .from('global_speedup_stats')
        .select('speedup_ratio, total_resolutions, pattern_assisted, avg_turns_no_patterns, avg_turns_with_patterns')
        .limit(1)
        .single(),
    ]);

    const totalApplications = toFiniteNumber(stats.applications, FALLBACK.applications);
    const totalPatterns = toFiniteNumber(stats.patterns, FALLBACK.patterns);
    const highConfidence = toFiniteNumber(stats.high_confidence_patterns, FALLBACK.highConfidencePatterns);
    const deltaEvaluations = toFiniteNumber(stats.delta_evaluations, FALLBACK.deltaEvaluations);
    const sessions = toFiniteNumber(stats.sessions, FALLBACK.sessions);
    const totalRetrievedPatterns = toFiniteNumber(stats.total_retrieved_patterns, 0);
    // Reuse rate: pattern application events divided by retrieved pattern opportunities (30d).
    const applyRateRaw = totalRetrievedPatterns > 0
      ? (totalApplications / totalRetrievedPatterns) * 100
      : null;
    const applyRateValue = applyRateRaw === null
      ? null
      : Math.max(0, Math.min(100, applyRateRaw));
    const applyRate = totalRetrievedPatterns > 0
      ? `${(applyRateValue || 0).toFixed(1)}%`
      : FALLBACK.applyRate;

    // Global speedup from PROMETHEUS materialized view
    if (speedupRes.error) {
      console.warn('[stats] global_speedup_stats unavailable:', speedupRes.error.message);
    }
    const speedup = speedupRes.data;

    return NextResponse.json({
      applications: totalApplications,
      applyRate,
      patterns: totalPatterns,
      highConfidencePatterns: highConfidence,
      deltaEvaluations,
      sessions,
      speedup: speedup?.speedup_ratio ?? FALLBACK.speedup,
      speedupResolutions: speedup?.total_resolutions ?? FALLBACK.speedupResolutions,
      speedupPatternAssisted: speedup?.pattern_assisted ?? FALLBACK.speedupPatternAssisted,
      avgTurnsNoPatterns: speedup?.avg_turns_no_patterns ?? FALLBACK.avgTurnsNoPatterns,
      avgTurnsWithPatterns: speedup?.avg_turns_with_patterns ?? FALLBACK.avgTurnsWithPatterns,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[stats] error:', err);
    const liveStats = await fetchLiveStatsFromProduction();
    if (liveStats) {
      return NextResponse.json(liveStats);
    }

    return NextResponse.json(
      { ...FALLBACK, timestamp: new Date().toISOString(), error: 'stats_unavailable' }
    );
  }
}
