'use client';

import useSWR from 'swr';
interface Pattern {
  id: string;
  title: string;
  description: string;
  success_rate: number;
  use_count: number;
  created_at: string;
}

interface PatternsResponse {
  success: boolean;
  patterns: Pattern[];
  total: number;
}

export function usePatterns(filters?: {
  domain?: string;
  minSuccessRate?: number;
  limit?: number;
}) {
  const queryKey = `/api/patterns${filters ? `?${new URLSearchParams(filters as any)}` : ''}`;

  const { data, error, isLoading, mutate } = useSWR<PatternsResponse>(
    queryKey,
    async (url: string) => {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Failed to fetch patterns');
      }
      const json = await res.json();
      return {
        success: true,
        patterns: json.patterns || [],
        total: json.total || json.patterns?.length || 0,
      };
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    }
  );

  return {
    patterns: data?.patterns || [],
    total: data?.total || 0,
    isLoading,
    isError: error,
    refresh: mutate,
  };
}
