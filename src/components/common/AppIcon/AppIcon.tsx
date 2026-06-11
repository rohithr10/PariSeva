import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../constants/colors';

export type AppIconName = string;

interface AppIconProps {
  /** MaterialCommunityIcons icon name */
  name: AppIconName;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

/**
 * Plain vector icon (MaterialCommunityIcons).
 */
export function AppIcon({
  name,
  size = 22,
  color = Colors.neutral.gray700,
  style,
}: AppIconProps) {
  return (
    <MaterialCommunityIcons name={name} size={size} color={color} style={style} />
  );
}

interface BoxedIconProps extends AppIconProps {
  /** Diameter of the rounded container */
  boxSize?: number;
  /** Background tint of the container */
  background?: string;
  /** Corner radius — defaults to a soft rounded square */
  radius?: number;
}

/**
 * Icon inside a soft tinted rounded container — used for menu tiles,
 * list rows and feature cards to keep the UI clean and consistent.
 */
export function BoxedIcon({
  name,
  size = 22,
  color = Colors.primary.navy,
  boxSize = 44,
  background = Colors.sky.blueLight,
  radius,
  style,
}: BoxedIconProps) {
  return (
    <View
      style={[
        styles.box,
        {
          width: boxSize,
          height: boxSize,
          borderRadius: radius ?? boxSize * 0.32,
          backgroundColor: background,
        },
        style,
      ]}>
      <MaterialCommunityIcons name={name} size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppIcon;
