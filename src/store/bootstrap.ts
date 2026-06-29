import { store } from './index';
import { hydrate } from './slices/auth.slice';
import { loadSession } from '../utils/session';

/**
 * Restores a persisted session into the store on app launch.
 * Always resolves; marks the auth slice as `bootstrapped` so the
 * root navigator can stop showing the splash and route correctly.
 */
export async function bootstrapSession(): Promise<void> {
  const session = await loadSession();
  store.dispatch(
    hydrate({
      user: session?.user ?? null,
      token: session?.token ?? null,
      refreshToken: session?.refreshToken ?? null,
      church: session?.church ?? null,
    }),
  );
}
