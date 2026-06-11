import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from '../constants/routes';
import { Colors } from '../constants/colors';
import type { BibleStackParamList } from './types';

import BibleHomeScreen from '../screens/bible/BibleHomeScreen';
import BibleReaderScreen from '../screens/bible/BibleReaderScreen';
import DailyReadingScreen from '../screens/bible/DailyReadingScreen';
import BookmarksScreen from '../screens/bible/BookmarksScreen';
import BibleNotesScreen from '../screens/bible/BibleNotesScreen';

const Stack = createNativeStackNavigator<BibleStackParamList>();

export default function BibleNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary.navy },
        headerTintColor: Colors.neutral.white,
        headerTitleStyle: { fontWeight: '600' },
      }}>
      <Stack.Screen name={Routes.BibleHome} component={BibleHomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name={Routes.BibleReader} component={BibleReaderScreen} options={{ title: 'Bible' }} />
      <Stack.Screen name={Routes.DailyReading} component={DailyReadingScreen} options={{ title: "Today's Reading" }} />
      <Stack.Screen name={Routes.Bookmarks} component={BookmarksScreen} options={{ title: 'Bookmarks' }} />
      <Stack.Screen name={Routes.BibleNotes} component={BibleNotesScreen} options={{ title: 'Notes' }} />
    </Stack.Navigator>
  );
}
