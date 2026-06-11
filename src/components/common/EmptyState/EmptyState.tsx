import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../constants/colors';
import { Spacing } from '../../../constants/spacing';
import Button from '../Button/Button';
import { BoxedIcon } from '../AppIcon/AppIcon';

interface Props {
  /** MaterialCommunityIcons icon name */
  icon?: string;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon = 'inbox-outline',
  title,
  subtitle,
  actionLabel,
  onAction,
}: Props) {
  return (
    <View style={styles.container}>
      <BoxedIcon
        name={icon}
        size={32}
        boxSize={72}
        color={Colors.neutral.gray400}
        background={Colors.neutral.gray100}
        style={styles.icon}
      />
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {actionLabel && onAction && (
        <Button title={actionLabel} onPress={onAction} style={styles.button} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: Spacing.xl },
  icon: { marginBottom: Spacing.md },
  title: { fontSize: 16, fontWeight: '600', color: Colors.neutral.gray800, textAlign: 'center' },
  subtitle: { fontSize: 14, color: Colors.neutral.gray500, textAlign: 'center', marginTop: Spacing.xs, lineHeight: 22 },
  button: { marginTop: Spacing.lg },
});
