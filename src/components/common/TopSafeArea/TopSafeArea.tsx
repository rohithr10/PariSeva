import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  /** Background of the status-bar inset strip — match the screen header color */
  color?: string;
}

/**
 * Fills the status-bar area (notch / time / battery row) with a solid color
 * so screen headers never overlap the system UI.
 */
export default function TopSafeArea({ color = 'transparent' }: Props) {
  const insets = useSafeAreaInsets();
  return <View style={{ height: insets.top, backgroundColor: color }} />;
}
