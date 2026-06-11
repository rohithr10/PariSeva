import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { useAppSelector } from '../../hooks/useAppDispatch';
import { selectUser } from '../../store/slices/auth.slice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

const STATS = [
  { icon: 'account-group-outline', value: '1,240', label: 'Families', sub: '+12 this month', color: Colors.primary.navy },
  { icon: 'cash-multiple', value: '₹42K', label: 'This Month', sub: '+8% vs last', color: Colors.semantic.success },
  { icon: 'certificate-outline', value: '8', label: 'Pending Certs', sub: '3 urgent', color: Colors.semantic.warning },
  { icon: 'swap-horizontal', value: '3', label: 'Transfers', sub: '2 pending review', color: Colors.sky.blue },
];

const QUICK_MODULES = [
  { icon: 'church', label: 'Mass Schedule', route: Routes.AdminMass },
  { icon: 'account-group-outline', label: 'Families', route: Routes.AdminFamilies },
  { icon: 'cash-multiple', label: 'Donations', route: Routes.AdminDonations },
  { icon: 'certificate-outline', label: 'Certificates', route: Routes.AdminCertificates },
  { icon: 'swap-horizontal', label: 'Transfers', route: Routes.AdminTransfers },
  { icon: 'bullhorn-outline', label: 'Announcements', route: Routes.AdminAnnouncements },
];

const RECENT_ACTIVITY = [
  { icon: 'certificate-outline', text: 'Certificate request from Thomas Raj', time: '2h ago', type: 'cert' },
  { icon: 'cash-multiple', text: 'Donation of ₹1,000 received', time: '4h ago', type: 'donation' },
  { icon: 'swap-horizontal', text: 'Transfer request from John Peter', time: '1d ago', type: 'transfer' },
  { icon: 'account-group-outline', text: 'New family registered: Joseph Family', time: '2d ago', type: 'family' },
];

export default function AdminDashboardScreen() {
  const navigation = useNavigation<any>();
  const user = useAppSelector(selectUser);

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <TopSafeArea color={Colors.primary.navy} />
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary.navyDark} />

      <View style={styles.header}>
        <View>
          <Text style={styles.headerGreet}>Admin Dashboard</Text>
          <Text style={styles.headerSub}>St. Mary's Basilica</Text>
        </View>
        <View style={styles.roleChip}>
          <Text style={styles.roleText}>{user?.role?.replace('_', ' ').toUpperCase() ?? 'ADMIN'}</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View style={styles.statsGrid}>
          {STATS.map((s, i) => (
            <View key={i} style={styles.statCard}>
              <MaterialCommunityIcons name={s.icon} style={[styles.statIcon, { color: s.color }]} />
              <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
              <Text style={styles.statSub}>{s.sub}</Text>
            </View>
          ))}
        </View>

        {/* Quick Modules */}
        <Text style={styles.sectionTitle}>Manage</Text>
        <View style={styles.modulesGrid}>
          {QUICK_MODULES.map((m, i) => (
            <TouchableOpacity
              key={i}
              style={styles.moduleCard}
              onPress={() => navigation.navigate(m.route)}>
              <MaterialCommunityIcons name={m.icon} style={styles.moduleIcon} />
              <Text style={styles.moduleLabel}>{m.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity */}
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {RECENT_ACTIVITY.map((a, i) => (
          <View key={i} style={styles.activityRow}>
            <View style={styles.activityIconBg}>
              <MaterialCommunityIcons name={a.icon} style={styles.activityIcon} />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityText}>{a.text}</Text>
              <Text style={styles.activityTime}>{a.time}</Text>
            </View>
          </View>
        ))}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral.warmWhite },
  header: {
    backgroundColor: Colors.primary.navy,
    paddingHorizontal: Spacing.screen,
    paddingTop: 8,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerGreet: { fontSize: 22, fontWeight: '700', color: Colors.neutral.white },
  headerSub: { fontSize: 13, color: Colors.sky.blueLight, marginTop: 2 },
  roleChip: {
    backgroundColor: Colors.accent.gold,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radius.full,
  },
  roleText: { color: Colors.neutral.white, fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: Spacing.screen, gap: Spacing.sm },
  statCard: {
    width: '47%',
    backgroundColor: Colors.neutral.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    ...Shadow.sm,
  },
  statIcon: { fontSize: 24, marginBottom: 6 , color: Colors.primary.navy},
  statValue: { fontSize: 22, fontWeight: '700', marginBottom: 2 },
  statLabel: { fontSize: 13, color: Colors.neutral.gray700, fontWeight: '600' },
  statSub: { fontSize: 11, color: Colors.neutral.gray400, marginTop: 2 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: Colors.primary.navy, paddingHorizontal: Spacing.screen, marginBottom: Spacing.sm },
  modulesGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: Spacing.screen, gap: Spacing.sm, marginBottom: Spacing.lg },
  moduleCard: {
    width: '30%',
    backgroundColor: Colors.neutral.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    ...Shadow.sm,
  },
  moduleIcon: { fontSize: 28, marginBottom: 6 , color: Colors.primary.navy},
  moduleLabel: { fontSize: 12, fontWeight: '600', color: Colors.primary.navy, textAlign: 'center' },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.screen,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray100,
  },
  activityIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.accent.goldPale,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  activityIcon: { fontSize: 18 , color: Colors.primary.navy},
  activityInfo: { flex: 1 },
  activityText: { fontSize: 14, color: Colors.neutral.gray700 },
  activityTime: { fontSize: 11, color: Colors.neutral.gray400, marginTop: 2 },
});
