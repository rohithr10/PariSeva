import { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { notificationApi, DUMMY_NOTIFICATIONS } from '../api/notification.api';
import { useAppDispatch, useAppSelector } from './useAppDispatch';
import {
  markNotificationRead,
  markNotificationsRead,
  selectLocalNotifications,
  selectReadNotificationIds,
} from '../store/slices/notification.slice';
import type { AppNotification } from '../types';

/**
 * Loads notifications from the API and exposes read-state helpers.
 *
 * If the `/notifications` endpoint isn't available yet, it transparently
 * falls back to DUMMY_NOTIFICATIONS so the screen still renders. Read-state
 * lives in the store (not in this hook) so every consumer — the Home bell
 * badge and the Notifications screen — sees the same counts; the matching API
 * call is fired best-effort and ignored on failure.
 */
export function useNotifications() {
  const dispatch = useAppDispatch();
  const readIds = useAppSelector(selectReadNotificationIds);
  const localNotifications = useAppSelector(selectLocalNotifications);

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

  const remote: AppNotification[] = query.isError
    ? DUMMY_NOTIFICATIONS
    : query.data ?? [];

  // App-generated notifications (subscription receipts, new announcements)
  // sit alongside the server's, newest first.
  const source = useMemo(
    () =>
      [...localNotifications, ...remote].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [localNotifications, remote],
  );

  const notifications = useMemo(() => {
    const read = new Set(readIds);
    return source.map(n => (read.has(n._id) ? { ...n, read: true } : n));
  }, [source, readIds]);

  const unreadCount = useMemo(
    () => notifications.filter(n => !n.read).length,
    [notifications],
  );

  const markAsRead = useCallback(
    (id: string) => {
      dispatch(markNotificationRead(id));
      notificationApi.markAsRead(id).catch(() => {});
    },
    [dispatch],
  );

  const markAllAsRead = useCallback(() => {
    dispatch(markNotificationsRead(source.map(n => n._id)));
    notificationApi.markAllAsRead().catch(() => {});
  }, [dispatch, source]);

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

/** Builds an in-app notification with a unique id and the current timestamp. */
export function buildLocalNotification(
  input: Omit<AppNotification, '_id' | 'createdAt' | 'read'> &
    Partial<Pick<AppNotification, '_id' | 'createdAt' | 'read'>>,
): AppNotification {
  return {
    ...input,
    _id:
      input._id ??
      `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: input.createdAt ?? new Date().toISOString(),
    read: input.read ?? false,
  };
}
