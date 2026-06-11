import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from '../constants/routes';
import { Colors } from '../constants/colors';
import type { ProfileStackParamList } from './types';

import ProfileScreen from '../screens/profile/ProfileScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import FamilyCardScreen from '../screens/family/FamilyCardScreen';
import MembersScreen from '../screens/family/MembersScreen';
import AddMemberScreen from '../screens/family/AddMemberScreen';
import CertificatesScreen from '../screens/family/CertificatesScreen';
import CertificateRequestScreen from '../screens/family/CertificateRequestScreen';
import ChurchTransferScreen from '../screens/transfer/ChurchTransferScreen';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary.navy },
        headerTintColor: Colors.neutral.white,
        headerTitleStyle: { fontWeight: '600' },
      }}>
      <Stack.Screen name={Routes.Profile} component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name={Routes.Settings} component={SettingsScreen} options={{ title: 'Settings' }} />
      <Stack.Screen name={Routes.FamilyCard} component={FamilyCardScreen} options={{ title: 'Family Card' }} />
      <Stack.Screen name={Routes.Members} component={MembersScreen} options={{ title: 'Family Members' }} />
      <Stack.Screen name={Routes.AddMember} component={AddMemberScreen} options={{ title: 'Add Member' }} />
      <Stack.Screen name={Routes.Certificates} component={CertificatesScreen} options={{ title: 'Certificates' }} />
      <Stack.Screen name={Routes.CertificateRequest} component={CertificateRequestScreen} options={{ title: 'Request Certificate' }} />
      <Stack.Screen name={Routes.ChurchTransfer} component={ChurchTransferScreen} options={{ title: 'Church Transfer' }} />
    </Stack.Navigator>
  );
}
