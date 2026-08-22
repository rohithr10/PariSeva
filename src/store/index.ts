import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import churchReducer from './slices/church.slice';
import donationReducer from './slices/donation.slice';
import bibleReducer from './slices/bible.slice';
import notificationReducer from './slices/notification.slice';
import uiReducer from './slices/ui.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    church: churchReducer,
    donation: donationReducer,
    bible: bibleReducer,
    notification: notificationReducer,
    ui: uiReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Persist auth to AsyncStorage whenever it changes (login, logout, refresh).
import { saveSession } from '../utils/session';
import { StorageKeys, writeJson } from '../utils/appStorage';

let lastSnapshot = '';
store.subscribe(() => {
  const { user, token, refreshToken, church, bootstrapped } = store.getState().auth;
  if (!bootstrapped) return; // don't overwrite storage before hydration completes
  const snapshot = JSON.stringify({ user, token, refreshToken, church });
  if (snapshot !== lastSnapshot) {
    lastSnapshot = snapshot;
    void saveSession({ user, token, refreshToken, church });
  }
});

/**
 * Persist the slices the user expects to survive a relaunch: which
 * notifications were read, their Bible bookmarks / reader preferences and
 * announcements posted from the Admin screen. Each writes only when its own
 * snapshot changes, so an unrelated dispatch doesn't touch storage.
 */
const persisters: { key: string; snapshot: string; select: () => unknown }[] = [
  {
    key: StorageKeys.notifications,
    snapshot: '',
    select: () => {
      const { readIds, local } = store.getState().notification;
      return { readIds, local };
    },
  },
  {
    key: StorageKeys.bible,
    snapshot: '',
    select: () => {
      const { bookmarks, nightMode, fontSize } = store.getState().bible;
      return { bookmarks, nightMode, fontSize };
    },
  },
  {
    key: StorageKeys.announcements,
    snapshot: '',
    select: () => store.getState().church.announcements,
  },
];

store.subscribe(() => {
  persisters.forEach(p => {
    const snapshot = JSON.stringify(p.select());
    if (snapshot !== p.snapshot) {
      p.snapshot = snapshot;
      writeJson(p.key, JSON.parse(snapshot));
    }
  });
});
