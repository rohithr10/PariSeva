import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

const RECORDED = [
  { id: 'r1', videoId: 'abc1', title: 'Sunday Holy Mass', titleTA: 'ஞாயிறு திருப்பலி', date: 'Jun 1, 2026', duration: '1h 12m', views: '1.2K', priest: 'Fr. Thomas Raj', type: 'sunday' },
  { id: 'r2', videoId: 'abc2', title: 'Feast of Sacred Heart', titleTA: 'திருவிழா திருப்பலி', date: 'Jun 4, 2026', duration: '58m', views: '873', priest: 'Bishop Joseph', type: 'feast' },
  { id: 'r3', videoId: 'abc3', title: 'Novena Mass - Day 9', titleTA: 'நவநாள் திருப்பலி', date: 'May 28, 2026', duration: '45m', views: '640', priest: 'Fr. Anthony Samy', type: 'novena' },
  { id: 'r4', videoId: 'abc4', title: 'Sunday Holy Mass', titleTA: 'ஞாயிறு திருப்பலி', date: 'May 25, 2026', duration: '1h 5m', views: '1.1K', priest: 'Fr. Thomas Raj', type: 'sunday' },
  { id: 'r5', videoId: 'abc5', title: 'Wednesday Evening Mass', titleTA: 'புதன் மாலை திருப்பலி', date: 'May 22, 2026', duration: '42m', views: '410', priest: 'Fr. Joseph', type: 'regular' },
  { id: 'r6', videoId: 'abc6', title: 'Corpus Christi Mass', titleTA: 'திரு உடல் திருவிழா', date: 'May 15, 2026', duration: '1h 20m', views: '2.1K', priest: 'Bishop Joseph', type: 'feast' },
];

const FILTER_TYPES = ['All', 'Sunday', 'Feast', 'Novena'];

export default function RecordedMassScreen() {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = RECORDED.filter(v => {
    const matchFilter = filter === 'All' || v.type === filter.toLowerCase();
    const matchSearch = !search || v.title.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TopSafeArea color={Colors.primary.navy} />
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary.navyDark} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recorded Masses</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.searchBar}>
        <MaterialCommunityIcons name="magnify" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Search masses..."
          placeholderTextColor={Colors.neutral.gray400}
        />
      </View>

      <View style={styles.filterRow}>
        {FILTER_TYPES.map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterPill, filter === f && styles.filterPillActive]}
            onPress={() => setFilter(f)}>
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={i => i.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate(Routes.LiveMass, { videoId: item.videoId, title: item.title })}>
            <View style={styles.thumbnail}>
              <MaterialCommunityIcons name="play" style={styles.playIcon} />
              <View style={styles.durationBadge}>
                <Text style={styles.durationText}>{item.duration}</Text>
              </View>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.cardTitleTA}>{item.titleTA}</Text>
              <Text style={styles.cardMeta}>{item.priest}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.cardDate}><MaterialCommunityIcons name="calendar-outline" size={13} /> {item.date}</Text>
                <Text style={styles.cardViews}><MaterialCommunityIcons name="eye-outline" size={13} /> {item.views}</Text>
              </View>
            </View>
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.white,
    margin: Spacing.screen,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    ...Shadow.sm,
  },
  searchIcon: { fontSize: 16, marginRight: Spacing.xs , color: Colors.neutral.gray400},
  searchInput: { flex: 1, paddingVertical: 10, fontSize: 14, color: Colors.neutral.gray800 },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.screen,
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: Radius.full,
    backgroundColor: Colors.neutral.white,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  filterPillActive: { backgroundColor: Colors.accent.gold, borderColor: Colors.accent.gold },
  filterText: { fontSize: 13, color: Colors.neutral.gray500 },
  filterTextActive: { color: Colors.neutral.white, fontWeight: '600' },
  list: { paddingHorizontal: Spacing.screen, paddingBottom: 24 },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.neutral.white,
    borderRadius: Radius.lg,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  thumbnail: {
    width: 110,
    height: 88,
    backgroundColor: Colors.primary.navyLight,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  playIcon: { color: Colors.neutral.white, fontSize: 28 },
  durationBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  durationText: { color: '#fff', fontSize: 10, fontWeight: '600' },
  cardInfo: { flex: 1, padding: Spacing.sm },
  cardTitle: { fontSize: 14, fontWeight: '600', color: Colors.neutral.gray800, marginBottom: 2 },
  cardTitleTA: { fontSize: 12, color: Colors.neutral.gray400, marginBottom: 4 },
  cardMeta: { fontSize: 12, color: Colors.neutral.gray500 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  cardDate: { fontSize: 11, color: Colors.neutral.gray400 },
  cardViews: { fontSize: 11, color: Colors.neutral.gray400 },
});
