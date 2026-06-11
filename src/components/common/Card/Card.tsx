import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../../constants/colors';
import { Spacing, Radius, Shadow } from '../../../constants/spacing';

type CardVariant = 'default' | 'featured' | 'flat' | 'gold';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  style?: ViewStyle;
  padding?: number;
}

export default function Card({
  children,
  variant = 'default',
  style,
  padding = Spacing.md,
}: CardProps) {
  return (
    <View style={[styles.base, styles[variant], { padding }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: Colors.neutral.white,
    borderRadius: Radius.lg,
    ...Shadow.md,
  },
  default: {},
  featured: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.accent.gold,
  },
  flat: {
    shadowOpacity: 0,
    elevation: 0,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  gold: {
    backgroundColor: Colors.accent.goldPale,
    borderWidth: 1,
    borderColor: Colors.accent.gold + '40',
  },
});
