import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../../constants/colors';
import { Radius } from '../../../constants/spacing';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'gold' | 'navy' | 'live';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  style?: ViewStyle;
  dot?: boolean;
}

export default function Badge({
  label,
  variant = 'info',
  size = 'md',
  style,
  dot = false,
}: BadgeProps) {
  return (
    <View style={[styles.base, styles[variant], size === 'sm' && styles.sm, style]}>
      {dot && <View style={[styles.dot, styles[`dot_${variant}`]]} />}
      <Text style={[styles.text, styles[`text_${variant}`], size === 'sm' && styles.textSm]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
    alignSelf: 'flex-start',
  },
  sm: { paddingHorizontal: 8, paddingVertical: 2 },

  // Variants
  success: { backgroundColor: Colors.semantic.successBg },
  warning: { backgroundColor: Colors.semantic.warningBg },
  error: { backgroundColor: Colors.semantic.errorBg },
  info: { backgroundColor: Colors.sky.blueLight },
  gold: { backgroundColor: Colors.accent.goldPale, borderWidth: 1, borderColor: Colors.accent.gold + '60' },
  navy: { backgroundColor: Colors.primary.navy },
  live: { backgroundColor: Colors.semantic.live },

  // Text colors
  text: { fontSize: 12, fontWeight: '600' },
  textSm: { fontSize: 11 },
  text_success: { color: Colors.semantic.success },
  text_warning: { color: Colors.semantic.warning },
  text_error: { color: Colors.semantic.error },
  text_info: { color: Colors.sky.blue },
  text_gold: { color: Colors.accent.goldDark },
  text_navy: { color: Colors.neutral.white },
  text_live: { color: Colors.neutral.white },

  // Dots
  dot: { width: 6, height: 6, borderRadius: 3, marginRight: 5 },
  dot_success: { backgroundColor: Colors.semantic.success },
  dot_warning: { backgroundColor: Colors.semantic.warning },
  dot_error: { backgroundColor: Colors.semantic.error },
  dot_live: { backgroundColor: Colors.neutral.white },
  dot_info: { backgroundColor: Colors.sky.blue },
  dot_gold: { backgroundColor: Colors.accent.gold },
  dot_navy: { backgroundColor: Colors.neutral.white },
});
