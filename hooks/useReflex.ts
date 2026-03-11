'use client';

type ReflexStatus = 'verified' | 'unverified' | 'contradicted' | 'pending';
import { useCallback, useState } from 'react';

export interface ReflexCheckResult {
  status: ReflexStatus;
  support_score: number;
  confidence: number;
  sources?: {
    crystallizations?: number;
    patterns?: number;
    collective?: number;
  };
  evidence?: string[];
  conflicts?: string[];
  recommendation?: string;
  directive_conflict?: {
    blocked?: boolean;
    reason?: string;
    directive?: any;
  };
}

export interface UseReflexOptions {
  onSuccess?: (result: ReflexCheckResult) => void;
  onError?: (error: Error) => void;
}

export function useReflex(options: UseReflexOptions = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<ReflexCheckResult | null>(null);

  const check = useCallback(
    async (request: string, proposedAnswer: string, context?: Record<string, any>) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/reflex/check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            request,
            proposed_answer: proposedAnswer,
            context,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to check reflex');
        }

        const data: ReflexCheckResult = await response.json();
        setResult(data);
        options.onSuccess?.(data);
        return data;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        options.onError?.(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [options]
  );

  return {
    check,
    loading,
    error,
    result,
  };
}
