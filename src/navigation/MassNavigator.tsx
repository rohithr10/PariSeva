import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from '../constants/routes';
import { Colors } from '../constants/colors';
import type { MassStackParamList } from './types';

import MassHomeScreen from '../screens/mass/MassHomeScreen';
import LiveMassScreen from '../screens/mass/LiveMassScreen';
import RecordedMassScreen from '../screens/mass/RecordedMassScreen';
import MassTimingsScreen from '../screens/mass/MassTimingsScreen';
import MassCalendarScreen from '../screens/mass/MassCalendarScreen';

const Stack = createNativeStackNavigator<MassStackParamList>();

export default function MassNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary.navy },
        headerTintColor: Colors.neutral.white,
        headerTitleStyle: { fontWeight: '600' },
      }}>
      <Stack.Screen name={Routes.MassHome} component={MassHomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name={Routes.LiveMass} component={LiveMassScreen} options={{ title: 'Live Mass' }} />
      <Stack.Screen name={Routes.RecordedMass} component={RecordedMassScreen} options={{ title: 'Recorded Mass' }} />
      <Stack.Screen name={Routes.MassTimings} component={MassTimingsScreen} options={{ title: 'Mass Timings' }} />
      <Stack.Screen name={Routes.MassCalendar} component={MassCalendarScreen} options={{ title: 'Mass Calendar' }} />
    </Stack.Navigator>
  );
}
