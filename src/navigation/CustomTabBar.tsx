import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Routes } from '../constants/routes';
import { Colors } from '../constants/colors';

const TAB_ICONS: Record<string, { active: string; inactive: string }> = {
  [Routes.Home]: { active: 'home-variant', inactive: 'home-variant-outline' },
  [Routes.MassTab]: { active: 'church', inactive: 'church' },
  [Routes.BibleTab]: {
    active: 'book-open-page-variant',
    inactive: 'book-open-page-variant-outline',
  },
  [Routes.GiveTab]: { active: 'hand-heart', inactive: 'hand-heart-outline' },
  [Routes.ProfileTab]: {
    active: 'account-circle',
    inactive: 'account-circle-outline',
  },
};

const CENTER_ROUTE = Routes.BibleTab;

function RegularTab({
  label,
  iconActive,
  iconInactive,
  focused,
  onPress,
  onLongPress,
}: {
  label: string;
  iconActive: string;
  iconInactive: string;
  focused: boolean;
  onPress: () => void;
  onLongPress: () => void;
}) {
  const anim = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: focused ? 1 : 0,
      useNativeDriver: true,
      friction: 6,
      tension: 80,
    }).start();
  }, [focused, anim]);

  const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.12] });
  const lift = anim.interpolate({ inputRange: [0, 1], outputRange: [0, -2] });

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tab}
      android_ripple={{ color: Colors.accent.goldPale, borderless: true }}>
      <Animated.View
        style={[
          styles.iconWrap,
          focused && styles.iconWrapActive,
          { transform: [{ scale }, { translateY: lift }] },
        ]}>
        <MaterialCommunityIcons
          name={focused ? iconActive : iconInactive}
          size={23}
          color={focused ? Colors.accent.goldDark : Colors.neutral.gray400}
        />
      </Animated.View>
      <Text style={[styles.label, focused && styles.labelActive]}>{label}</Text>
      <View style={[styles.dot, focused && styles.dotActive]} />
    </Pressable>
  );
}

function CenterTab({
  label,
  focused,
  onPress,
  onLongPress,
}: {
  label: string;
  focused: boolean;
  onPress: () => void;
  onLongPress: () => void;
}) {
  const anim = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: focused ? 1 : 0,
      useNativeDriver: true,
      friction: 5,
      tension: 90,
    }).start();
  }, [focused, anim]);

  const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] });
  const rotate = anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-8deg'] });

  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} style={styles.tab}>
      <Animated.View style={[styles.centerWrap, { transform: [{ scale }] }]}>
        <LinearGradient
          colors={[Colors.accent.goldLight, Colors.accent.gold, Colors.accent.goldDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.centerBtn}>
          <Animated.View style={{ transform: [{ rotate }] }}>
            <MaterialCommunityIcons
              name={focused ? 'book-open-page-variant' : 'book-cross'}
              size={26}
              color={Colors.neutral.white}
            />
          </Animated.View>
        </LinearGradient>
      </Animated.View>
      <Text style={[styles.label, styles.centerLabel, focused && styles.labelActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = (options.tabBarLabel as string) ?? options.title ?? route.name;
        const focused = state.index === index;
        const icons = TAB_ICONS[route.name] ?? { active: 'circle', inactive: 'circle-outline' };

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({ type: 'tabLongPress', target: route.key });
        };

        if (route.name === CENTER_ROUTE) {
          return (
            <CenterTab
              key={route.key}
              label={label}
              focused={focused}
              onPress={onPress}
              onLongPress={onLongPress}
            />
          );
        }

        return (
          <RegularTab
            key={route.key}
            label={label}
            iconActive={icons.active}
            iconInactive={icons.inactive}
            focused={focused}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: Colors.neutral.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 10,
    paddingHorizontal: 6,
    // soft elevated shadow
    shadowColor: Colors.primary.navyDark,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconWrap: {
    width: 40,
    height: 30,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: Colors.accent.goldPale,
  },
  label: {
    fontSize: 10.5,
    fontWeight: '600',
    color: Colors.neutral.gray400,
    marginTop: 3,
    letterSpacing: 0.2,
  },
  labelActive: {
    color: Colors.accent.goldDark,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'transparent',
    marginTop: 3,
  },
  dotActive: {
    backgroundColor: Colors.accent.gold,
  },
  centerWrap: {
    marginTop: -34,
    // white halo ring behind the gold button
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: Colors.neutral.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: Colors.accent.goldDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 10,
  },
  centerBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerLabel: {
    marginTop: 4,
    marginBottom: Platform.OS === 'android' ? 0 : 0,
  },
});
