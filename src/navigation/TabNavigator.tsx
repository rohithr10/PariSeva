import React from 'react';
import { useTranslation } from 'react-i18next';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Routes } from '../constants/routes';
import { Colors } from '../constants/colors';
import type { TabParamList } from './types';
import CustomTabBar from './CustomTabBar';

// Stacks
import MassNavigator from './MassNavigator';
import BibleNavigator from './BibleNavigator';
import DonationNavigator from './DonationNavigator';
import ProfileNavigator from './ProfileNavigator';

// Home Screen
import HomeScreen from '../screens/home/HomeScreen';

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: Colors.neutral.warmWhite },
      }}>
      <Tab.Screen
        name={Routes.Home}
        component={HomeScreen}
        options={{ tabBarLabel: t('nav.home') }}
      />
      <Tab.Screen
        name={Routes.MassTab}
        component={MassNavigator}
        options={{ tabBarLabel: t('nav.mass') }}
      />
      <Tab.Screen
        name={Routes.BibleTab}
        component={BibleNavigator}
        options={{ tabBarLabel: t('nav.bible') }}
      />
      <Tab.Screen
        name={Routes.GiveTab}
        component={DonationNavigator}
        options={{ tabBarLabel: t('nav.give') }}
      />
      <Tab.Screen
        name={Routes.ProfileTab}
        component={ProfileNavigator}
        options={{ tabBarLabel: t('nav.profile') }}
      />
    </Tab.Navigator>
  );
}
