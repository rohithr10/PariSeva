import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../constants/colors';
import { Radius, Spacing } from '../../../constants/spacing';
import { useBibleTheme } from '../../../hooks/useBibleTheme';
import BaseLanguageToggle from '../LanguageToggle/LanguageToggle';

/** `onDark` sits on the navy header, `onSurface` sits on a page background. */
type Variant = 'onDark' | 'onSurface';

function useTint(variant: Variant) {
  const { theme } = useBibleTheme();
  if (variant === 'onDark') {
    return { fg: Colors.neutral.white, border: 'rgba(255,255,255,0.35)' };
  }
  return { fg: theme.accent, border: theme.accent };
}

/**
 * Switches the whole app between English and Tamil. Every Bible screen reads
 * `i18n.language`, so the reader, the daily readings and the book list all
 * move to the chosen language instead of showing the two side by side.
 */
export function LanguageToggle({
  variant = 'onSurface',
  style,
}: {
  variant?: Variant;
  style?: ViewStyle;
}) {
  const tint = useTint(variant);
  return (
    <BaseLanguageToggle color={tint.fg} borderColor={tint.border} style={style} />
  );
}

/** Flips the Bible section between light and dark reading modes. */
export function ThemeToggle({
  variant = 'onSurface',
  style,
}: {
  variant?: Variant;
  style?: ViewStyle;
}) {
  const { dark, toggle } = useBibleTheme();
  const tint = useTint(variant);

  return (
    <TouchableOpacity
      onPress={toggle}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={[styles.iconBtn, { borderColor: tint.border }, style]}>
      <MaterialCommunityIcons
        name={dark ? 'weather-sunny' : 'weather-night'}
        size={16}
        color={tint.fg}
      />
    </TouchableOpacity>
  );
}

/** Language + theme controls as one row — used in the Bible headers. */
export function BibleControls({
  variant = 'onSurface',
  style,
}: {
  variant?: Variant;
  style?: ViewStyle;
}) {
  return (
    <View style={[styles.row, style]}>
      <LanguageToggle variant={variant} />
      <ThemeToggle variant={variant} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
