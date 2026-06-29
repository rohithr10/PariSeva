import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User, Church } from '../types';

const KEY = '@myholynest/session';

export interface PersistedSession {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  church: Church | null;
}

export async function saveSession(session: PersistedSession): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(session));
  } catch {
    /* storage write failures are non-fatal */
  }
}

export async function loadSession(): Promise<PersistedSession | null> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PersistedSession) : null;
  } catch {
    return null;
  }
}

export async function clearSession(): Promise<void> {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
