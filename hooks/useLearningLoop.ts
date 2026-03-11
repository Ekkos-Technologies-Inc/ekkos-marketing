'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';

export interface LearningEvent {
  id: string;
  type: 'pattern_learned' | 'episode_created' | 'query_processed' | 'agent_connected' | 'error';
  message: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface LearningLoopState {
  velocity: number; // patterns/hour
  successRate: number;
  activeAgents: number;
  recentEvents: LearningEvent[];
  isLearning: boolean;
}

export function useLearningLoop(refreshInterval = 30000) {
  const [events, setEvents] = useState<LearningEvent[]>([]);

  const { data, error, isLoading } = useSWR<LearningLoopState>(
    '/api/learning/loop',
    async (url: string) => {
      // Fetch real learning loop data from API
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Failed to fetch learning loop data');
      }
      const json = await res.json();
      return {
        velocity: json.velocity || 0,
        successRate: json.successRate || 0,
        activeAgents: json.activeAgents || 0,
        recentEvents: json.recentEvents || [],
        isLearning: json.isLearning || false,
      };
    },
    {
      refreshInterval,
      revalidateOnFocus: false,
      dedupingInterval: 2000,
      errorRetryCount: 3,
    }
  );

  // Simulate new events
  useEffect(() => {
    const eventTypes: LearningEvent['type'][] = [
      'pattern_learned',
      'episode_created',
      'query_processed',
      'agent_connected',
    ];

    const messages: Record<LearningEvent['type'], string[]> = {
      pattern_learned: [
        'New pattern learned from Cursor session',
        'Pattern extracted: Error handling in React components',
        'Pattern evolved: API retry logic improved',
      ],
      episode_created: [
        'Episode captured: Debugging React component',
        'Episode saved: Authentication flow complete',
        'Episode recorded: Database migration',
      ],
      query_processed: [
        'Semantic search query processed',
        'Pattern query completed',
        'Memory retrieval successful',
      ],
      error: [
        'Connection timeout - retrying',
        'Rate limit reached - backing off',
        'Temporary processing error',
      ],
      agent_connected: [
        'Claude agent connected',
        'Cursor agent active',
        'ChatGPT agent connected',
      ],
    };

    const interval = setInterval(() => {
      const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      const typeMessages = messages[type];
      const message = typeMessages[Math.floor(Math.random() * typeMessages.length)];

      const newEvent: LearningEvent = {
        id: `${Date.now()}-${Math.random()}`,
        type,
        message,
        timestamp: new Date().toISOString(),
      };

      setEvents(prev => [newEvent, ...prev].slice(0, 10)); // Keep last 10
    }, 8000 + Math.random() * 7000); // Random interval 8-15s

    return () => clearInterval(interval);
  }, []);

  return {
    state: data,
    events,
    isLoading,
    isError: error,
  };
}
