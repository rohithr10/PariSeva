import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../constants/colors';
import { Spacing } from '../../../constants/spacing';

interface Props {
  size?: 'small' | 'large';
  label?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({ size = 'large', label, fullScreen = false }: Props) {
  return (
    <View style={[styles.container, fullScreen && styles.fullScreen]}>
      <ActivityIndicator size={size} color={Colors.accent.gold} />
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', padding: Spacing.lg },
  fullScreen: { flex: 1, backgroundColor: Colors.neutral.warmWhite },
  label: { marginTop: Spacing.sm, fontSize: 14, color: Colors.neutral.gray500 },
});
