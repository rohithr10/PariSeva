import { store } from './index';
import { hydrate } from './slices/auth.slice';
import { hydrateNotifications } from './slices/notification.slice';
import { hydrateBible } from './slices/bible.slice';
import { setAnnouncements } from './slices/church.slice';
import { loadSession } from '../utils/session';
import { readJson, StorageKeys } from '../utils/appStorage';
import { SEED_ANNOUNCEMENTS } from '../constants/announcements';
import type { Announcement, AppNotification, Bookmark } from '../types';

/**
 * Restores a persisted session into the store on app launch.
 * Always resolves; marks the auth slice as `bootstrapped` so the
 * root navigator can stop showing the splash and route correctly.
 *
 * Read-notification state, Bible bookmarks/reader preferences and locally
 * published announcements are restored in the same pass — everything is read
 * before the first dispatch so the store's persistence subscriber can't
 * overwrite storage with defaults mid-hydration.
 */
export async function bootstrapSession(): Promise<void> {
  const [session, notifications, bible, announcements] = await Promise.all([
    loadSession(),
    readJson<{ readIds?: string[]; local?: AppNotification[] }>(
      StorageKeys.notifications,
      {},
    ),
    readJson<{ bookmarks?: Bookmark[]; nightMode?: boolean; fontSize?: number }>(
      StorageKeys.bible,
      {},
    ),
    readJson<Announcement[]>(StorageKeys.announcements, SEED_ANNOUNCEMENTS),
  ]);

  store.dispatch(hydrateNotifications(notifications));
  store.dispatch(hydrateBible(bible));
  store.dispatch(
    setAnnouncements(
      Array.isArray(announcements) && announcements.length
        ? announcements
        : SEED_ANNOUNCEMENTS,
    ),
  );
  store.dispatch(
    hydrate({
      user: session?.user ?? null,
      token: session?.token ?? null,
      refreshToken: session?.refreshToken ?? null,
      church: session?.church ?? null,
    }),
  );
}
