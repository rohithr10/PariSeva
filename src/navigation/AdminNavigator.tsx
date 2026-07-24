import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from '../constants/routes';
import type { AdminStackParamList } from './types';

import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import AdminMassScreen from '../screens/admin/AdminMassScreen';
import AdminFamiliesScreen from '../screens/admin/AdminFamiliesScreen';
import AdminDonationsScreen from '../screens/admin/AdminDonationsScreen';
import AdminCertificatesScreen from '../screens/admin/AdminCertificatesScreen';
import AdminTransfersScreen from '../screens/admin/AdminTransfersScreen';
import AdminAnnouncementsScreen from '../screens/admin/AdminAnnouncementsScreen';

const Stack = createNativeStackNavigator<AdminStackParamList>();

export default function AdminNavigator() {
  return (
    // Each admin screen renders its own navy header (with back button),
    // so the native stack header is hidden for the whole stack.
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.AdminDashboard} component={AdminDashboardScreen} />
      <Stack.Screen name={Routes.AdminMass} component={AdminMassScreen} />
      <Stack.Screen name={Routes.AdminFamilies} component={AdminFamiliesScreen} />
      <Stack.Screen name={Routes.AdminDonations} component={AdminDonationsScreen} />
      <Stack.Screen name={Routes.AdminCertificates} component={AdminCertificatesScreen} />
      <Stack.Screen name={Routes.AdminTransfers} component={AdminTransfersScreen} />
      <Stack.Screen name={Routes.AdminAnnouncements} component={AdminAnnouncementsScreen} />
    </Stack.Navigator>
  );
}
