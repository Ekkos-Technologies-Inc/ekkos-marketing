'use client';

import { useState, useEffect } from 'react';

export interface SubstrateStats {
  applications: number;
  applyRate: string;
  patterns: number;
  highConfidencePatterns: number;
  deltaEvaluations: number;
  sessions: number;
  speedup: number | null;
  speedupResolutions: number;
  speedupPatternAssisted: number;
  avgTurnsNoPatterns: number | null;
  avgTurnsWithPatterns: number | null;
  timestamp: string;
}

const FALLBACK: SubstrateStats = {
  applications: 0,
  applyRate: '—',
  patterns: 0,
  highConfidencePatterns: 0,
  deltaEvaluations: 0,
  sessions: 0,
  speedup: null,
  speedupResolutions: 0,
  speedupPatternAssisted: 0,
  avgTurnsNoPatterns: null,
  avgTurnsWithPatterns: null,
  timestamp: new Date().toISOString(),
};

export function useLiveStats(refreshInterval = 60000) {
  const [stats, setStats] = useState<SubstrateStats>(FALLBACK);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      try {
        const res = await fetch('/api/stats', { next: { revalidate: 60 } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          const asNumber = (value: unknown, fallback: number): number => {
            const parsed = Number(value);
            return Number.isFinite(parsed) ? parsed : fallback;
          };
          const asNullableNumber = (value: unknown): number | null => {
            if (value === null || value === undefined) return null;
            const parsed = Number(value);
            return Number.isFinite(parsed) ? parsed : null;
          };
          const applyRate = typeof data.applyRate === 'string' ? data.applyRate : FALLBACK.applyRate;
          const timestamp = typeof data.timestamp === 'string' ? data.timestamp : new Date().toISOString();

          setStats({
            applications: asNumber(data.applications, FALLBACK.applications),
            applyRate,
            patterns: asNumber(data.patterns, FALLBACK.patterns),
            highConfidencePatterns: asNumber(data.highConfidencePatterns, FALLBACK.highConfidencePatterns),
            deltaEvaluations: asNumber(data.deltaEvaluations, FALLBACK.deltaEvaluations),
            sessions: asNumber(data.sessions, FALLBACK.sessions),
            speedup: asNullableNumber(data.speedup),
            speedupResolutions: asNumber(data.speedupResolutions, FALLBACK.speedupResolutions),
            speedupPatternAssisted: asNumber(data.speedupPatternAssisted, FALLBACK.speedupPatternAssisted),
            avgTurnsNoPatterns: asNullableNumber(data.avgTurnsNoPatterns),
            avgTurnsWithPatterns: asNullableNumber(data.avgTurnsWithPatterns),
            timestamp,
          });
          setError(null);
        }
      } catch (err) {
        if (!cancelled) setError(String(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchStats();
    const id = setInterval(fetchStats, refreshInterval);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [refreshInterval]);

  return { stats, loading, error };
}
