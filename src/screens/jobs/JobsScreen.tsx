import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

const JOBS = [
  { id: 'j1', title: 'Software Engineer', company: 'TCS Chennai', type: 'Full-time', salary: '₹8–12 LPA', posted: '2 days ago', location: 'Chennai' },
  { id: 'j2', title: 'School Teacher', company: 'Don Bosco School', type: 'Full-time', salary: '₹3–5 LPA', posted: '5 days ago', location: 'Mylapore' },
  { id: 'j3', title: 'Nurse', company: 'Apollo Hospital', type: 'Full-time', salary: '₹4–6 LPA', posted: '1 week ago', location: 'Chennai' },
  { id: 'j4', title: 'Accounts Executive', company: 'Local Business', type: 'Part-time', salary: '₹15K/month', posted: '1 week ago', location: 'Triplicane' },
  { id: 'j5', title: 'Driver', company: 'Parish Family', type: 'Part-time', salary: '₹12K/month', posted: '2 weeks ago', location: 'Mylapore' },
];

const TYPES = ['All', 'Full-time', 'Part-time'];

export default function JobsScreen() {
  const navigation = useNavigation<any>();
  const [filter, setFilter] = useState('All');

  const filtered = JOBS.filter(j => filter === 'All' || j.type === filter);

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <TopSafeArea color={Colors.primary.navy} />
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary.navyDark} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><MaterialCommunityIcons name="arrow-left" style={styles.backIcon} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Parish Jobs Board</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.filterRow}>
        {TYPES.map(t => (
          <TouchableOpacity
            key={t}
            style={[styles.filterPill, filter === t && styles.filterPillActive]}
            onPress={() => setFilter(t)}>
            <Text style={[styles.filterText, filter === t && styles.filterTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={j => j.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardTop}>
              <View style={styles.jobIcon}>
                <MaterialCommunityIcons name="briefcase-outline" style={styles.jobIconText} />
              </View>
              <View style={styles.jobInfo}>
                <Text style={styles.jobTitle}>{item.title}</Text>
                <Text style={styles.company}>{item.company}</Text>
                <Text style={styles.location}><MaterialCommunityIcons name="map-marker-outline" size={13} /> {item.location}</Text>
              </View>
              <View style={[styles.typeBadge, item.type === 'Part-time' ? styles.typePart : styles.typeFull]}>
                <Text style={styles.typeText}>{item.type}</Text>
              </View>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.salary}><MaterialCommunityIcons name="cash-multiple" size={13} /> {item.salary}</Text>
              <Text style={styles.posted}>{item.posted}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral.warmWhite },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primary.navy, paddingHorizontal: Spacing.screen, paddingVertical: 14 },
  backIcon: { color: Colors.neutral.white, fontSize: 22, marginRight: Spacing.md },
  headerTitle: { flex: 1, color: Colors.neutral.white, fontSize: 18, fontWeight: '700' },
  filterRow: { flexDirection: 'row', paddingHorizontal: Spacing.screen, paddingVertical: Spacing.md, gap: Spacing.sm },
  filterPill: { paddingHorizontal: 16, paddingVertical: 7, borderRadius: Radius.full, backgroundColor: Colors.neutral.white, borderWidth: 1, borderColor: Colors.neutral.gray200 },
  filterPillActive: { backgroundColor: Colors.accent.gold, borderColor: Colors.accent.gold },
  filterText: { fontSize: 13, color: Colors.neutral.gray500 },
  filterTextActive: { color: Colors.neutral.white, fontWeight: '700' },
  list: { paddingHorizontal: Spacing.screen, paddingBottom: 24 },
  card: { backgroundColor: Colors.neutral.white, borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.sm, ...Shadow.sm },
  cardTop: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: Spacing.sm },
  jobIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.accent.goldPale, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  jobIconText: { fontSize: 22 , color: Colors.primary.navy},
  jobInfo: { flex: 1 },
  jobTitle: { fontSize: 15, fontWeight: '700', color: Colors.primary.navy },
  company: { fontSize: 13, color: Colors.neutral.gray600, marginTop: 2 },
  location: { fontSize: 12, color: Colors.neutral.gray400, marginTop: 1 },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: Radius.full },
  typeFull: { backgroundColor: Colors.semantic.success + '20' },
  typePart: { backgroundColor: Colors.sky.bluePale },
  typeText: { fontSize: 11, fontWeight: '700', color: Colors.primary.navy },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.neutral.gray100 },
  salary: { fontSize: 13, color: Colors.semantic.success, fontWeight: '600' },
  posted: { fontSize: 12, color: Colors.neutral.gray400 },
});
