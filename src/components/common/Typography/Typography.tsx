import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { Colors } from '../../../constants/colors';
import { Typography as T } from '../../../constants/typography';

type Variant =
  | 'display1' | 'display2'
  | 'h1' | 'h2' | 'h3' | 'h4'
  | 'bodyLg' | 'body' | 'bodySm'
  | 'label' | 'caption';

interface Props {
  variant?: Variant;
  children: React.ReactNode;
  color?: string;
  style?: TextStyle;
  numberOfLines?: number;
  bold?: boolean;
  italic?: boolean;
  center?: boolean;
}

export default function Typography({
  variant = 'body',
  children,
  color = Colors.neutral.gray800,
  style,
  numberOfLines,
  bold = false,
  italic = false,
  center = false,
}: Props) {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        styles[variant],
        { color },
        bold && styles.bold,
        italic && styles.italic,
        center && styles.center,
        style,
      ]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  display1: { ...T.display1, fontWeight: '700' },
  display2: { ...T.display2, fontWeight: '700' },
  h1: { ...T.h1, fontWeight: '700' },
  h2: { ...T.h2, fontWeight: '700' },
  h3: { ...T.h3, fontWeight: '600' },
  h4: { ...T.h4, fontWeight: '600' },
  bodyLg: { ...T.bodyLg },
  body: { ...T.body },
  bodySm: { ...T.bodySm },
  label: { ...T.label, fontWeight: '600', textTransform: 'uppercase' },
  caption: { ...T.caption, color: Colors.neutral.gray400 },
  bold: { fontWeight: '700' },
  italic: { fontStyle: 'italic' },
  center: { textAlign: 'center' },
});
