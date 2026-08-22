import { useCallback } from 'react';
import { Colors } from '../constants/colors';
import { useAppDispatch, useAppSelector } from './useAppDispatch';
import { selectNightMode, toggleNightMode } from '../store/slices/bible.slice';

export interface BibleTheme {
  dark: boolean;
  /** Screen background. */
  bg: string;
  /** Card / raised surface. */
  surface: string;
  /** Subtle fill (pills, disabled cards). */
  surfaceAlt: string;
  border: string;
  text: string;
  textMuted: string;
  accent: string;
  headerBg: string;
  headerText: string;
  headerSub: string;
  statusBar: 'light-content' | 'dark-content';
}

const LIGHT: BibleTheme = {
  dark: false,
  bg: Colors.neutral.warmWhite,
  surface: Colors.neutral.white,
  surfaceAlt: Colors.neutral.gray100,
  border: Colors.neutral.gray200,
  text: Colors.neutral.gray800,
  textMuted: Colors.neutral.gray500,
  accent: Colors.accent.goldDark,
  headerBg: Colors.primary.navy,
  headerText: Colors.neutral.white,
  headerSub: Colors.sky.blueLight,
  statusBar: 'light-content',
};

const DARK: BibleTheme = {
  dark: true,
  bg: Colors.primary.navyDark,
  surface: '#183355',
  surfaceAlt: '#122944',
  border: '#254A72',
  text: Colors.neutral.white,
  textMuted: '#A9C3DC',
  accent: Colors.accent.goldLight,
  headerBg: '#0B1B33',
  headerText: Colors.neutral.white,
  headerSub: '#A9C3DC',
  statusBar: 'light-content',
};

/**
 * Reader theme for the Bible section. Night mode lives in the bible slice so
 * every Bible screen (home, reader, daily reading, bookmarks) flips together
 * and the choice survives a relaunch.
 */
export function useBibleTheme() {
  const dispatch = useAppDispatch();
  const night = useAppSelector(selectNightMode);
  const toggle = useCallback(() => {
    dispatch(toggleNightMode());
  }, [dispatch]);

  return { theme: night ? DARK : LIGHT, dark: night, toggle };
}
