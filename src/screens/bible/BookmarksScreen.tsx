import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  StatusBar, TouchableOpacity, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

const MOCK_BOOKMARKS = [
  { id: '1', book: 'John', chapter: 3, verse: 16, text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.', date: '2 days ago' },
  { id: '2', book: 'Psalm', chapter: 23, verse: 1, text: 'The Lord is my shepherd, I shall not want.', date: '5 days ago' },
  { id: '3', book: 'Isaiah', chapter: 40, verse: 31, text: 'But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.', date: '1 week ago' },
  { id: '4', book: 'Matthew', chapter: 5, verse: 9, text: 'Blessed are the peacemakers, for they will be called children of God.', date: '2 weeks ago' },
  { id: '5', book: 'Romans', chapter: 8, verse: 28, text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.', date: '3 weeks ago' },
];

export default function BookmarksScreen() {
  const navigation = useNavigation<any>();
  const [bookmarks, setBookmarks] = useState(MOCK_BOOKMARKS);

  const deleteBookmark = (id: string) => {
    Alert.alert('Remove Bookmark', 'Remove this verse from bookmarks?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => setBookmarks(b => b.filter(x => x.id !== id)) },
    ]);
  };

  if (bookmarks.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <TopSafeArea color={Colors.primary.navy} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Bookmarks</Text>
          <View style={{ width: 32 }} />
        </View>
        <View style={styles.empty}>
          <MaterialCommunityIcons name="bookmark-outline" style={styles.emptyIcon} />
          <Text style={styles.emptyTitle}>No Bookmarks Yet</Text>
          <Text style={styles.emptySubtitle}>Long-press on any verse while reading to bookmark it.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary.navyDark} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bookmarks</Text>
        <Text style={styles.count}>{bookmarks.length}</Text>
      </View>

      <FlatList
        data={bookmarks}
        keyExtractor={i => i.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate(Routes.BibleReader, { book: item.book, chapter: item.chapter })}>
            <View style={styles.cardHeader}>
              <Text style={styles.ref}>{item.book} {item.chapter}:{item.verse}</Text>
              <View style={styles.headerRight}>
                <Text style={styles.date}>{item.date}</Text>
                <TouchableOpacity onPress={() => deleteBookmark(item.id)} style={styles.deleteBtn}>
                  <Text style={styles.deleteIcon}>×</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.verse} numberOfLines={3}>"{item.text}"</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral.warmWhite },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primary.navy,
    paddingHorizontal: Spacing.screen,
    paddingVertical: 14,
  },
  backIcon: { color: Colors.neutral.white, fontSize: 22 },
  headerTitle: { color: Colors.neutral.white, fontSize: 18, fontWeight: '700' },
  count: {
    backgroundColor: Colors.accent.gold,
    color: Colors.neutral.white,
    borderRadius: Radius.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 13,
    fontWeight: '700',
    minWidth: 28,
    textAlign: 'center',
  },
  list: { padding: Spacing.screen },
  card: {
    backgroundColor: Colors.neutral.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: Colors.accent.gold,
    ...Shadow.sm,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm },
  ref: { fontSize: 14, fontWeight: '700', color: Colors.accent.goldDark },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  date: { fontSize: 12, color: Colors.neutral.gray400 },
  deleteBtn: { padding: 4 },
  deleteIcon: { fontSize: 20, color: Colors.neutral.gray400 },
  verse: { fontSize: 14, color: Colors.neutral.gray700, lineHeight: 22, fontStyle: 'italic' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  emptyIcon: { fontSize: 64, marginBottom: Spacing.lg , color: Colors.neutral.gray300},
  emptyTitle: { fontSize: 20, fontWeight: '700', color: Colors.primary.navy, marginBottom: Spacing.sm },
  emptySubtitle: { fontSize: 14, color: Colors.neutral.gray500, textAlign: 'center', lineHeight: 22 },
});
