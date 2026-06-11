import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  StatusBar, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

const MOCK_MEMBERS = [
  { id: 'm1', name: 'Thomas Raj', relation: 'Head of Family', dob: 'Jan 15, 1975', gender: 'male', occupation: 'Engineer', isHead: true },
  { id: 'm2', name: 'Mary Raj', relation: 'Spouse', dob: 'Mar 8, 1978', gender: 'female', occupation: 'Teacher', isHead: false },
  { id: 'm3', name: 'John Thomas', relation: 'Son', dob: 'Jun 22, 2002', gender: 'male', occupation: 'Student', isHead: false },
  { id: 'm4', name: 'Priya Thomas', relation: 'Daughter', dob: 'Sep 10, 2005', gender: 'female', occupation: 'Student', isHead: false },
];

export default function MembersScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TopSafeArea color={Colors.primary.navy} />
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary.navyDark} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Family Members</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate(Routes.AddMember)}>
          <Text style={styles.addBtnText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={MOCK_MEMBERS}
        keyExtractor={m => m.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={() => (
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNum}>{MOCK_MEMBERS.length}</Text>
              <Text style={styles.statLabel}>Total Members</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNum}>{MOCK_MEMBERS.filter(m => m.gender === 'male').length}</Text>
              <Text style={styles.statLabel}>Male</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNum}>{MOCK_MEMBERS.filter(m => m.gender === 'female').length}</Text>
              <Text style={styles.statLabel}>Female</Text>
            </View>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={[styles.memberCard, item.isHead && styles.memberCardHead]}>
            <View style={[styles.avatar, { backgroundColor: item.gender === 'female' ? Colors.sky.blue : Colors.primary.navy }]}>
              <Text style={styles.avatarText}>{item.name[0]}</Text>
            </View>
            <View style={styles.memberInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.memberName}>{item.name}</Text>
                {item.isHead && (
                  <View style={styles.headBadge}><Text style={styles.headBadgeText}>Head</Text></View>
                )}
              </View>
              <Text style={styles.relation}>{item.relation}</Text>
              <Text style={styles.details}><MaterialCommunityIcons name="cake-variant-outline" size={13} /> {item.dob}  ·  {item.occupation}</Text>
            </View>
            <TouchableOpacity style={styles.editBtn}>
              <MaterialCommunityIcons name="pencil-outline" style={styles.editIcon} />
            </TouchableOpacity>
          </View>
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
    backgroundColor: Colors.primary.navy,
    paddingHorizontal: Spacing.screen,
    paddingVertical: 14,
  },
  backIcon: { color: Colors.neutral.white, fontSize: 22, marginRight: Spacing.md },
  headerTitle: { flex: 1, color: Colors.neutral.white, fontSize: 18, fontWeight: '700' },
  addBtn: {
    backgroundColor: Colors.accent.gold,
    borderRadius: Radius.full,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  addBtnText: { color: Colors.neutral.white, fontWeight: '700', fontSize: 13 },
  list: { padding: Spacing.screen },
  statsRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md },
  statCard: {
    flex: 1,
    backgroundColor: Colors.neutral.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    ...Shadow.sm,
  },
  statNum: { fontSize: 22, fontWeight: '700', color: Colors.primary.navy },
  statLabel: { fontSize: 11, color: Colors.neutral.gray400, marginTop: 2 },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
  },
  memberCardHead: { borderLeftWidth: 3, borderLeftColor: Colors.accent.gold },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  avatarText: { color: Colors.neutral.white, fontSize: 18, fontWeight: '700' },
  memberInfo: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, marginBottom: 2 },
  memberName: { fontSize: 15, fontWeight: '600', color: Colors.neutral.gray800 },
  headBadge: {
    backgroundColor: Colors.accent.goldPale,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  headBadgeText: { fontSize: 10, fontWeight: '700', color: Colors.accent.goldDark },
  relation: { fontSize: 13, color: Colors.neutral.gray500, marginBottom: 2 },
  details: { fontSize: 12, color: Colors.neutral.gray400 },
  editBtn: { padding: Spacing.sm },
  editIcon: { fontSize: 16, color: Colors.neutral.gray400 },
});
