import apiClient from './client';
import type { ApiResponse, AppNotification } from '../types';

/**
 * Notifications API.
 *
 * The backend is expected to expose these routes (church-scoped via the
 * X-Church-ID header + JWT set in the axios client). Until they are live,
 * `useNotifications` falls back to DUMMY_NOTIFICATIONS so the screen renders.
 */
export const notificationApi = {
  getNotifications: () =>
    apiClient.get<ApiResponse<AppNotification[]>>('/notifications'),

  markAsRead: (id: string) =>
    apiClient.patch<ApiResponse<AppNotification>>(`/notifications/${id}/read`),

  markAllAsRead: () => apiClient.patch<ApiResponse<null>>('/notifications/read-all'),
};

/** Placeholder data shown until the API route is available. */
const now = Date.now();
const minsAgo = (m: number) => new Date(now - m * 60_000).toISOString();

export const DUMMY_NOTIFICATIONS: AppNotification[] = [
  {
    _id: 'n1',
    title: 'Sunday Mass timing changed',
    titleTA: 'ஞாயிறு திருப்பலி நேரம் மாற்றம்',
    body: "This Sunday's 9:30 AM Mass has been moved to 10:00 AM due to the diocesan programme.",
    type: 'mass',
    read: false,
    createdAt: minsAgo(25),
  },
  {
    _id: 'n2',
    title: 'Donation received',
    body: 'Your offering of ₹1,000 towards the Building Fund has been received. Tap to view the receipt.',
    type: 'donation',
    read: false,
    createdAt: minsAgo(180),
  },
  {
    _id: 'n3',
    title: 'Certificate ready',
    body: 'Your Baptism certificate request has been approved and is ready to download.',
    type: 'certificate',
    read: false,
    createdAt: minsAgo(60 * 20),
  },
  {
    _id: 'n4',
    title: 'Parish council meeting',
    titleTA: 'பங்கு ஆலோசனை கூட்டம்',
    body: 'Monthly parish council meeting on June 10 at 7 PM in the parish hall.',
    type: 'announcement',
    read: true,
    createdAt: minsAgo(60 * 26),
  },
  {
    _id: 'n5',
    title: 'Youth Annual Sports Day',
    body: 'Register with the Youth Club before June 18 for the Annual Sports Day.',
    type: 'community',
    read: true,
    createdAt: minsAgo(60 * 48),
  },
  {
    _id: 'n6',
    title: 'Transfer request update',
    body: 'Your church transfer request is now pending review at the destination parish.',
    type: 'transfer',
    read: true,
    createdAt: minsAgo(60 * 72),
  },
];
