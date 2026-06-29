import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import churchReducer from './slices/church.slice';
import donationReducer from './slices/donation.slice';
import bibleReducer from './slices/bible.slice';
import uiReducer from './slices/ui.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    church: churchReducer,
    donation: donationReducer,
    bible: bibleReducer,
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
