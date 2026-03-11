'use client';

import useSWR from 'swr';

export interface Notification {
  id: string;
  type: 'pattern' | 'agent' | 'learning' | 'system';
  title: string;
  description: string;
  time: string;
  unread: boolean;
  createdAt: string;
}

interface NotificationsResponse {
  notifications: Notification[];
  unreadCount: number;
  timestamp: string;
}

const fetcher = async (url: string): Promise<NotificationsResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch notifications');
  }
  return res.json();
};

export function useNotifications(refreshInterval = 30000) {
  const { data, error, isLoading, mutate } = useSWR<NotificationsResponse>(
    '/api/notifications',
    fetcher,
    {
      refreshInterval,
      revalidateOnFocus: true,
      dedupingInterval: 10000,
      errorRetryCount: 3,
    }
  );

  return {
    notifications: data?.notifications || [],
    unreadCount: data?.unreadCount || 0,
    isLoading,
    isError: error,
    refresh: mutate,
  };
}
