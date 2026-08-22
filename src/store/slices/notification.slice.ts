import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppNotification } from '../../types';

interface NotificationState {
  /**
   * IDs the user has read. Kept in the store (not in a component) so the
   * Home bell badge and the Notifications screen always agree, and persisted
   * so a read notification stays read across relaunches.
   */
  readIds: string[];
  /** Notifications generated inside the app (subscription receipts, announcements). */
  local: AppNotification[];
}

const initialState: NotificationState = { readIds: [], local: [] };

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    hydrateNotifications: (
      state,
      action: PayloadAction<{ readIds?: string[]; local?: AppNotification[] }>,
    ) => {
      state.readIds = action.payload.readIds ?? [];
      state.local = action.payload.local ?? [];
    },
    markNotificationRead: (state, action: PayloadAction<string>) => {
      if (!state.readIds.includes(action.payload)) {
        state.readIds.push(action.payload);
      }
      const local = state.local.find(n => n._id === action.payload);
      if (local) local.read = true;
    },
    markNotificationsRead: (state, action: PayloadAction<string[]>) => {
      state.readIds = Array.from(new Set([...state.readIds, ...action.payload]));
      state.local.forEach(n => {
        n.read = true;
      });
    },
    addLocalNotification: (state, action: PayloadAction<AppNotification>) => {
      state.local.unshift(action.payload);
    },
    removeLocalNotification: (state, action: PayloadAction<string>) => {
      state.local = state.local.filter(n => n._id !== action.payload);
    },
  },
});

export const {
  hydrateNotifications,
  markNotificationRead,
  markNotificationsRead,
  addLocalNotification,
  removeLocalNotification,
} = notificationSlice.actions;

export const selectReadNotificationIds = (state: {
  notification: NotificationState;
}) => state.notification.readIds;

export const selectLocalNotifications = (state: {
  notification: NotificationState;
}) => state.notification.local;

export default notificationSlice.reducer;
