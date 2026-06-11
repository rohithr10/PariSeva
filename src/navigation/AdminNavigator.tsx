import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
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
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary.navy },
        headerTintColor: Colors.neutral.white,
        headerTitleStyle: { fontWeight: '600' },
      }}>
      <Stack.Screen name={Routes.AdminDashboard} component={AdminDashboardScreen} options={{ title: 'Parish Dashboard' }} />
      <Stack.Screen name={Routes.AdminMass} component={AdminMassScreen} options={{ title: 'Mass Timings' }} />
      <Stack.Screen name={Routes.AdminFamilies} component={AdminFamiliesScreen} options={{ title: 'Families' }} />
      <Stack.Screen name={Routes.AdminDonations} component={AdminDonationsScreen} options={{ title: 'Donations' }} />
      <Stack.Screen name={Routes.AdminCertificates} component={AdminCertificatesScreen} options={{ title: 'Certificates' }} />
      <Stack.Screen name={Routes.AdminTransfers} component={AdminTransfersScreen} options={{ title: 'Transfers' }} />
      <Stack.Screen name={Routes.AdminAnnouncements} component={AdminAnnouncementsScreen} options={{ title: 'Announcements' }} />
    </Stack.Navigator>
  );
}
