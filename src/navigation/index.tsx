import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAppSelector } from '../hooks/useAppDispatch';
import { selectIsAuthenticated, selectUserRole } from '../store/slices/auth.slice';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import AdminNavigator from './AdminNavigator';

const ADMIN_ROLES = ['super_admin', 'diocese_admin', 'church_admin', 'priest', 'pa'];

export default function RootNavigator() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const role = useAppSelector(selectUserRole);

  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <AuthNavigator />
      ) : ADMIN_ROLES.includes(role ?? '') ? (
        <AdminNavigator />
      ) : (
        <DrawerNavigator />
      )}
    </NavigationContainer>
  );
}
