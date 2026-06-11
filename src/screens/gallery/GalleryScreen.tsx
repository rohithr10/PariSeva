import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_SIZE = (SCREEN_WIDTH - Spacing.screen * 2 - Spacing.xs * 2) / 3;

const ALBUMS = [
  { id: 'al1', title: 'Sacred Heart Feast 2026', count: 48, cover: 'party-popper' },
  { id: 'al2', title: 'Youth Sports Day 2026', count: 32, cover: 'soccer' },
  { id: 'al3', title: 'Easter Celebrations', count: 56, cover: 'cross' },
  { id: 'al4', title: 'Christmas 2025', count: 64, cover: 'pine-tree' },
];

const PHOTOS = Array.from({ length: 12 }, (_, i) => ({
  id: `p${i}`,
  emoji: ['cross', 'church', 'hands-pray', 'party-popper', 'flower-outline', 'candle'][i % 6],
  title: `Photo ${i + 1}`,
}));

type TabType = 'albums' | 'photos';

export default function GalleryScreen() {
  const navigation = useNavigation<any>();
  const [tab, setTab] = useState<TabType>('albums');

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <TopSafeArea color={Colors.primary.navy} />
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary.navyDark} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><MaterialCommunityIcons name="arrow-left" style={styles.backIcon} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Gallery</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.tabRow}>
        {(['albums', 'photos'] as TabType[]).map(t => (
          <TouchableOpacity
            key={t}
            style={[styles.tabBtn, tab === t && styles.tabBtnActive]}
            onPress={() => setTab(t)}>
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {tab === 'albums' ? (
        <FlatList
          data={ALBUMS}
          keyExtractor={a => a.id}
          contentContainerStyle={styles.albumList}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.albumCard}>
              <View style={styles.albumCover}>
                <MaterialCommunityIcons name={item.cover} style={styles.albumCoverEmoji} />
              </View>
              <Text style={styles.albumTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.albumCount}>{item.count} photos</Text>
            </TouchableOpacity>
          )}
          numColumns={2}
        />
      ) : (
        <FlatList
          data={PHOTOS}
          keyExtractor={p => p.id}
          numColumns={3}
          contentContainerStyle={styles.photoGrid}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.photoItem}>
              <View style={styles.photoBg}>
                <MaterialCommunityIcons name={item.emoji} style={styles.photoEmoji} />
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral.warmWhite },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primary.navy, paddingHorizontal: Spacing.screen, paddingVertical: 14 },
  backIcon: { color: Colors.neutral.white, fontSize: 22, marginRight: Spacing.md },
  headerTitle: { flex: 1, color: Colors.neutral.white, fontSize: 18, fontWeight: '700' },
  tabRow: { flexDirection: 'row', padding: Spacing.screen, gap: Spacing.sm },
  tabBtn: { flex: 1, paddingVertical: 10, borderRadius: Radius.lg, backgroundColor: Colors.neutral.white, alignItems: 'center', borderWidth: 1.5, borderColor: Colors.neutral.gray200 },
  tabBtnActive: { backgroundColor: Colors.accent.gold, borderColor: Colors.accent.gold },
  tabText: { fontSize: 14, fontWeight: '600', color: Colors.neutral.gray500 },
  tabTextActive: { color: Colors.neutral.white },
  albumList: { padding: Spacing.screen },
  albumCard: { width: '48%', backgroundColor: Colors.neutral.white, borderRadius: Radius.lg, marginBottom: Spacing.sm, marginRight: '2%', overflow: 'hidden', ...Shadow.sm },
  albumCover: { height: 120, backgroundColor: Colors.primary.navyLight, alignItems: 'center', justifyContent: 'center' },
  albumCoverEmoji: { fontSize: 48 , color: Colors.primary.navy},
  albumTitle: { fontSize: 13, fontWeight: '600', color: Colors.primary.navy, padding: Spacing.sm, paddingBottom: 2 },
  albumCount: { fontSize: 11, color: Colors.neutral.gray400, paddingHorizontal: Spacing.sm, paddingBottom: Spacing.sm },
  photoGrid: { padding: Spacing.screen },
  photoItem: { margin: Spacing.xs / 2 },
  photoBg: { width: ITEM_SIZE, height: ITEM_SIZE, backgroundColor: Colors.primary.navyLight, borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center' },
  photoEmoji: { fontSize: 32 , color: Colors.primary.navy},
});
