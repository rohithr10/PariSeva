import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from '../constants/routes';
import { Colors } from '../constants/colors';
import type { DonationStackParamList } from './types';

import DonationHomeScreen from '../screens/donation/DonationHomeScreen';
import MakeOfferingScreen from '../screens/donation/MakeOfferingScreen';
import SubscriptionScreen from '../screens/donation/SubscriptionScreen';
import DonationHistoryScreen from '../screens/donation/DonationHistoryScreen';
import DonationReceiptScreen from '../screens/donation/DonationReceiptScreen';

const Stack = createNativeStackNavigator<DonationStackParamList>();

export default function DonationNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary.navy },
        headerTintColor: Colors.neutral.white,
        headerTitleStyle: { fontWeight: '600' },
      }}>
      <Stack.Screen name={Routes.DonationHome} component={DonationHomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name={Routes.MakeOffering} component={MakeOfferingScreen} options={{ title: 'Make an Offering' }} />
      <Stack.Screen name={Routes.Subscription} component={SubscriptionScreen} options={{ title: 'Monthly Subscription' }} />
      <Stack.Screen name={Routes.DonationHistory} component={DonationHistoryScreen} options={{ title: 'Donation History' }} />
      <Stack.Screen name={Routes.DonationReceipt} component={DonationReceiptScreen} options={{ title: 'Receipt' }} />
    </Stack.Navigator>
  );
}
