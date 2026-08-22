import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../constants/colors';
import { Radius, Spacing } from '../../../constants/spacing';
import { setAppLanguage, type AppLanguage } from '../../../i18n';

const LABEL: Record<AppLanguage, string> = { en: 'EN', ta: 'தமிழ்' };

interface Props {
  /** Icon + label colour. */
  color?: string;
  /** Outline colour; defaults to `color`. */
  borderColor?: string;
  style?: ViewStyle;
}

/**
 * Switches the whole app between English and Tamil and persists the choice.
 * Shows the language it will switch *to*, so the action is unambiguous.
 */
export default function LanguageToggle({ color, borderColor, style }: Props) {
  const { i18n } = useTranslation();
  const lang = (i18n.language as AppLanguage) ?? 'en';
  const next: AppLanguage = lang === 'en' ? 'ta' : 'en';

  const fg = color ?? Colors.accent.goldDark;
  const bc = borderColor ?? fg;

  const onPress = useCallback(() => {
    void setAppLanguage(next);
  }, [next]);

  return (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={`Switch to ${next === 'ta' ? 'Tamil' : 'English'}`}
      style={[styles.pill, { borderColor: bc }, style]}>
      <MaterialCommunityIcons name="translate" size={14} color={fg} />
      <Text style={[styles.pillText, { color: fg }]}>{LABEL[next]}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  pillText: { fontSize: 12, fontWeight: '700' },
});
