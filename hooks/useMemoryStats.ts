'use client';

import useSWR from 'swr';
interface LearningMetrics {
  totalPatterns: number;
  totalEpisodes: number;
  totalSearches: number;
  successRate: number;
  velocity: number;
}

interface MemoryLayerStats {
  layer: string;
  count: number;
  health: string;
  last_updated: string;
  last_24h: number;
}

interface MemoryStatsResponse {
  success: boolean;
  metrics: LearningMetrics;
  layers: MemoryLayerStats[];
  lastUpdated: string;
}

// Memory API URL - use environment variable or default to Vercel deployment
const MEMORY_API_URL = process.env.NEXT_PUBLIC_MEMORY_API_URL || 'https://ekkos-memory.vercel.app';

/**
 * Hook for fetching memory stats from the REAL Memory API
 * Source of truth: Memory Service /api/v1/memory/metrics/full endpoint
 */
export function useMemoryStats(refreshInterval = 30000) {
  const { data, error, isLoading, mutate } = useSWR<MemoryStatsResponse>(
    'memory-metrics',
    async () => {
      try {
        // Fetch from Memory API - the SINGLE SOURCE OF TRUTH
        const response = await fetch(`${MEMORY_API_URL}/api/v1/memory/metrics/full`, {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Memory API error: ${response.status}`);
        }

        const data = await response.json();

        // Validate API response structure
        if (!data || typeof data !== 'object' || !data.memoryLayers) {
          throw new Error('Invalid API response: missing memoryLayers');
        }

        const layers = data.memoryLayers;

        // Validate required layer properties
        const requiredLayers = [
          'layer_1_working',
          'layer_2_episodic',
          'layer_3_semantic',
          'layer_4_pattern',
          'layer_5_procedural',
          'layer_6_collective',
          'layer_7_meta',
          'layer_8_codebase',
        ];

        for (const layerName of requiredLayers) {
          if (!layers[layerName] || typeof layers[layerName].count !== 'number') {
            throw new Error(`Invalid API response: missing or invalid ${layerName}`);
          }
        }

        // Transform to expected format
        return {
          success: true,
          metrics: {
            totalPatterns: layers.layer_4_pattern?.count ?? 0,
            totalEpisodes: layers.layer_2_episodic?.count ?? 0,
            totalSearches: layers.layer_3_semantic?.count ?? 0,
            successRate: Math.round((layers.pattern_success_rate ?? 0) * 100 * 10) / 10,
            velocity: layers.learning_velocity ?? 0,
          },
          layers: [
            {
              layer: 'working',
              count: layers.layer_1_working?.count ?? 0,
              health: (layers.layer_1_working?.last_24h ?? 0) > 0 ? 'healthy' : 'warning',
              last_updated: layers.layer_1_working?.last_at || new Date().toISOString(),
              last_24h: layers.layer_1_working?.last_24h ?? 0,
            },
            {
              layer: 'episodic',
              count: layers.layer_2_episodic?.count ?? 0,
              health: (layers.layer_2_episodic?.last_24h ?? 0) > 0 ? 'healthy' : 'warning',
              last_updated: layers.layer_2_episodic?.last_at || new Date().toISOString(),
              last_24h: layers.layer_2_episodic?.last_24h ?? 0,
            },
            {
              layer: 'semantic',
              count: layers.layer_3_semantic?.count ?? 0,
              health: (layers.layer_3_semantic?.last_24h ?? 0) > 0 ? 'healthy' : 'warning',
              last_updated: layers.layer_3_semantic?.last_at || new Date().toISOString(),
              last_24h: layers.layer_3_semantic?.last_24h ?? 0,
            },
            {
              layer: 'pattern',
              count: layers.layer_4_pattern?.count ?? 0,
              health: (layers.layer_4_pattern?.last_24h ?? 0) > 0 ? 'healthy' : 'warning',
              last_updated: layers.layer_4_pattern?.last_at || new Date().toISOString(),
              last_24h: layers.layer_4_pattern?.last_24h ?? 0,
            },
            {
              layer: 'procedural',
              count: layers.layer_5_procedural?.count ?? 0,
              health: (layers.layer_5_procedural?.last_24h ?? 0) > 0 ? 'healthy' : 'warning',
              last_updated: layers.layer_5_procedural?.last_at || new Date().toISOString(),
              last_24h: layers.layer_5_procedural?.last_24h ?? 0,
            },
            {
              layer: 'collective',
              count: layers.layer_6_collective?.count ?? 0,
              health: (layers.layer_6_collective?.last_24h ?? 0) > 0 ? 'healthy' : 'warning',
              last_updated: layers.layer_6_collective?.last_at || new Date().toISOString(),
              last_24h: layers.layer_6_collective?.last_24h ?? 0,
            },
            {
              layer: 'meta',
              count: layers.layer_7_meta?.count ?? 0,
              health: (layers.layer_7_meta?.last_24h ?? 0) > 0 ? 'healthy' : 'warning',
              last_updated: layers.layer_7_meta?.last_at || new Date().toISOString(),
              last_24h: layers.layer_7_meta?.last_24h ?? 0,
            },
            {
              layer: 'codebase',
              count: layers.layer_8_codebase?.count ?? 0,
              health: (layers.layer_8_codebase?.last_24h ?? 0) > 0 ? 'healthy' : 'warning',
              last_updated: layers.layer_8_codebase?.last_at || new Date().toISOString(),
              last_24h: layers.layer_8_codebase?.last_24h ?? 0,
            },
          ],
          lastUpdated: data.timestamp || new Date().toISOString(),
        };
      } catch (error) {
        console.error('[useMemoryStats] Error fetching from Memory API:', error);
        // Return error state, don't fall back to mock data
        throw error;
      }
    },
    {
      refreshInterval,
      revalidateOnFocus: true,
      dedupingInterval: 10000,
    }
  );

  return {
    stats: data,
    isLoading,
    isError: error,
    refresh: mutate,
  };
}
