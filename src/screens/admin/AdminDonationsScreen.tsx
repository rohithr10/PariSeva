import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  StatusBar, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import Badge from '../../components/common/Badge/Badge';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

const DONATIONS = [
  { id: 'd1', family: 'Thomas Family', type: 'Sunday Offering', amount: 500, date: 'Jun 1, 2026', status: 'completed' },
  { id: 'd2', family: 'Joseph Family', type: 'Church Maintenance', amount: 2000, date: 'Jun 2, 2026', status: 'completed' },
  { id: 'd3', family: 'Maria Family', type: 'Candle Offering', amount: 200, date: 'Jun 3, 2026', status: 'completed' },
  { id: 'd4', family: 'Peter Family', type: 'Poor Fund', amount: 1000, date: 'Jun 3, 2026', status: 'pending' },
  { id: 'd5', family: 'Paul Family', type: 'Feast Fund', amount: 500, date: 'Jun 4, 2026', status: 'completed' },
];

const TOTAL = DONATIONS.filter(d => d.status === 'completed').reduce((s, d) => s + d.amount, 0);

export default function AdminDonationsScreen() {
  const navigation = useNavigation<any>();
  const [period, setPeriod] = useState('month');

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <TopSafeArea color={Colors.primary.navy} />
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary.navyDark} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Donations</Text>
        <TouchableOpacity style={styles.exportBtn}>
          <Text style={styles.exportText}>Export</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total Received (This Month)</Text>
        <Text style={styles.summaryAmount}>₹{TOTAL.toLocaleString('en-IN')}</Text>
        <Text style={styles.summaryCount}>{DONATIONS.filter(d => d.status === 'completed').length} transactions</Text>
      </View>

      <View style={styles.periodRow}>
        {['today', 'week', 'month', 'year'].map(p => (
          <TouchableOpacity
            key={p}
            style={[styles.periodPill, period === p && styles.periodPillActive]}
            onPress={() => setPeriod(p)}>
            <Text style={[styles.periodText, period === p && styles.periodTextActive]}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={DONATIONS}
        keyExtractor={d => d.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.amountCircle}>
              <Text style={styles.amountText}>₹{item.amount >= 1000 ? `${item.amount / 1000}K` : item.amount}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.family}>{item.family}</Text>
              <Text style={styles.type}>{item.type}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <Badge
              label={item.status}
              variant={item.status === 'completed' ? 'success' : 'warning'}
              size="sm"
            />
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
  exportBtn: { borderWidth: 1, borderColor: Colors.neutral.white, borderRadius: Radius.full, paddingHorizontal: 12, paddingVertical: 5 },
  exportText: { color: Colors.neutral.white, fontSize: 12 },
  summaryCard: {
    backgroundColor: Colors.primary.navyLight,
    margin: Spacing.screen,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
  },
  summaryLabel: { color: Colors.sky.blueLight, fontSize: 13, marginBottom: 6 },
  summaryAmount: { color: Colors.neutral.white, fontSize: 32, fontWeight: '700', marginBottom: 4 },
  summaryCount: { color: Colors.sky.blueLight, fontSize: 12 },
  periodRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.screen,
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  periodPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.full,
    backgroundColor: Colors.neutral.white,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  periodPillActive: { backgroundColor: Colors.accent.gold, borderColor: Colors.accent.gold },
  periodText: { fontSize: 12, color: Colors.neutral.gray500 },
  periodTextActive: { color: Colors.neutral.white, fontWeight: '700' },
  list: { paddingHorizontal: Spacing.screen, paddingBottom: 24 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.xs,
    ...Shadow.sm,
  },
  amountCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.accent.goldPale,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  amountText: { fontSize: 13, fontWeight: '700', color: Colors.accent.goldDark },
  info: { flex: 1 },
  family: { fontSize: 14, fontWeight: '700', color: Colors.primary.navy },
  type: { fontSize: 13, color: Colors.neutral.gray500 },
  date: { fontSize: 11, color: Colors.neutral.gray400, marginTop: 1 },
});
