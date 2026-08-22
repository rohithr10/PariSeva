import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Tiny JSON wrapper around AsyncStorage for slices that need to survive a
 * relaunch (read notifications, bookmarks, locally-posted announcements).
 * Writes are fire-and-forget — a storage failure must never break the UI.
 */
export async function readJson<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJson(key: string, value: unknown): void {
  AsyncStorage.setItem(key, JSON.stringify(value)).catch(() => {});
}

export const StorageKeys = {
  notifications: '@myholynest/notifications',
  bible: '@myholynest/bible',
  announcements: '@myholynest/announcements',
} as const;
