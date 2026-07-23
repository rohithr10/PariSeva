import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Routes } from "../constants/routes";
import type { ProfileStackParamList } from "./types";

import ProfileScreen from "../screens/profile/ProfileScreen";
import SettingsScreen from "../screens/profile/SettingsScreen";
import FamilyCardScreen from "../screens/family/FamilyCardScreen";
import MembersScreen from "../screens/family/MembersScreen";
import AddMemberScreen from "../screens/family/AddMemberScreen";
import CertificatesScreen from "../screens/family/CertificatesScreen";
import CertificateRequestScreen from "../screens/family/CertificateRequestScreen";
import ChurchTransferScreen from "../screens/transfer/ChurchTransferScreen";

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        // Every screen renders its own in-screen header (title + back button),
        // so the native stack header is hidden to avoid a duplicate.
        headerShown: false,
      }}
    >
      <Stack.Screen name={Routes.Profile} component={ProfileScreen} />
      <Stack.Screen name={Routes.Settings} component={SettingsScreen} />
      <Stack.Screen name={Routes.FamilyCard} component={FamilyCardScreen} />
      <Stack.Screen name={Routes.Members} component={MembersScreen} />
      <Stack.Screen name={Routes.AddMember} component={AddMemberScreen} />
      <Stack.Screen name={Routes.Certificates} component={CertificatesScreen} />
      <Stack.Screen name={Routes.CertificateRequest} component={CertificateRequestScreen} />
      <Stack.Screen name={Routes.ChurchTransfer} component={ChurchTransferScreen} />
    </Stack.Navigator>
  );
}
