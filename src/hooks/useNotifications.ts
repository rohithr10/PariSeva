import { useCallback, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { notificationApi, DUMMY_NOTIFICATIONS } from '../api/notification.api';
import type { AppNotification } from '../types';

/**
 * Loads notifications from the API and exposes read-state helpers.
 *
 * If the `/notifications` endpoint isn't available yet, it transparently
 * falls back to DUMMY_NOTIFICATIONS so the screen still renders. Read-state
 * is tracked with a local overlay, so "mark as read" works in either mode;
 * the matching API call is fired best-effort and ignored on failure.
 */
export function useNotifications() {
  // IDs the user has read locally this session (overlays server/dummy state).
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  const query = useQuery({
    queryKey: ['notifications'],
    queryFn: async (): Promise<AppNotification[]> => {
      const res = await notificationApi.getNotifications();
      return res.data.data;
    },
    retry: false,
    // Render dummy data instantly while the real request runs, so the screen
    // never shows a blank spinner (e.g. during a cold backend start).
    placeholderData: DUMMY_NOTIFICATIONS,
  });

  const source: AppNotification[] = query.isError
    ? DUMMY_NOTIFICATIONS
    : query.data ?? [];

  const notifications = useMemo(
    () =>
      source.map(n =>
        readIds.has(n._id) ? { ...n, read: true } : n,
      ),
    [source, readIds],
  );

  const unreadCount = useMemo(
    () => notifications.filter(n => !n.read).length,
    [notifications],
  );

  const markAsRead = useCallback((id: string) => {
    setReadIds(prev => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    notificationApi.markAsRead(id).catch(() => {});
  }, []);

  const markAllAsRead = useCallback(() => {
    setReadIds(new Set(source.map(n => n._id)));
    notificationApi.markAllAsRead().catch(() => {});
  }, [source]);

  return {
    notifications,
    unreadCount,
    isLoading: query.isLoading,
    isRefetching: query.isRefetching,
    refetch: query.refetch,
    usingFallback: query.isError,
    markAsRead,
    markAllAsRead,
  };
}
