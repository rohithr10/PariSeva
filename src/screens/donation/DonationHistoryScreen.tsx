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

const ALL_DONATIONS = [
  { id: 'd1', type: 'Sunday Offering', amount: 500, date: 'Jun 1, 2026', status: 'completed', txnId: 'TXN001' },
  { id: 'd2', type: 'Candle Offering', amount: 200, date: 'May 25, 2026', status: 'completed', txnId: 'TXN002' },
  { id: 'd3', type: 'Church Maintenance', amount: 1000, date: 'May 15, 2026', status: 'completed', txnId: 'TXN003' },
  { id: 'd4', type: 'Sunday Offering', amount: 500, date: 'May 11, 2026', status: 'completed', txnId: 'TXN004' },
  { id: 'd5', type: 'Poor Fund', amount: 300, date: 'May 4, 2026', status: 'completed', txnId: 'TXN005' },
  { id: 'd6', type: 'Feast Fund', amount: 700, date: 'Apr 27, 2026', status: 'completed', txnId: 'TXN006' },
  { id: 'd7', type: 'Sunday Offering', amount: 500, date: 'Apr 20, 2026', status: 'failed', txnId: 'TXN007' },
];

const YEARS = ['2026', '2025', '2024'];

export default function DonationHistoryScreen() {
  const navigation = useNavigation<any>();
  const [year, setYear] = useState('2026');

  const total = ALL_DONATIONS
    .filter(d => d.status === 'completed')
    .reduce((sum, d) => sum + d.amount, 0);

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TopSafeArea color={Colors.primary.navy} />
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary.navyDark} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Donation History</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.yearRow}>
        {YEARS.map(y => (
          <TouchableOpacity
            key={y}
            style={[styles.yearPill, year === y && styles.yearPillActive]}
            onPress={() => setYear(y)}>
            <Text style={[styles.yearText, year === y && styles.yearTextActive]}>{y}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total Given in {year}</Text>
        <Text style={styles.totalAmount}>₹{total.toLocaleString('en-IN')}</Text>
        <Text style={styles.totalCount}>{ALL_DONATIONS.filter(d => d.status === 'completed').length} transactions</Text>
      </View>

      <FlatList
        data={ALL_DONATIONS}
        keyExtractor={d => d.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate(Routes.DonationReceipt, {
              donationId: item.txnId, amount: item.amount, type: item.type,
            })}>
            <View style={[styles.statusDot, item.status === 'completed' ? styles.dotGreen : styles.dotRed]} />
            <View style={styles.rowInfo}>
              <Text style={styles.rowType}>{item.type}</Text>
              <Text style={styles.rowDate}>{item.date}</Text>
            </View>
            <View style={styles.rowRight}>
              <Text style={[styles.rowAmount, item.status === 'failed' && styles.rowAmountFailed]}>
                {item.status === 'failed' ? '—' : `₹${item.amount}`}
              </Text>
              <MaterialCommunityIcons
                name={item.status === 'completed' ? 'check-circle' : 'close-circle'}
                size={16}
                color={item.status === 'completed' ? Colors.semantic.success : Colors.semantic.error}
              />
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
  yearRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.screen,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  yearPill: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: Radius.full,
    backgroundColor: Colors.neutral.white,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  yearPillActive: { backgroundColor: Colors.accent.gold, borderColor: Colors.accent.gold },
  yearText: { fontSize: 14, color: Colors.neutral.gray500, fontWeight: '500' },
  yearTextActive: { color: Colors.neutral.white, fontWeight: '700' },

  totalCard: {
    backgroundColor: Colors.primary.navyLight,
    margin: Spacing.screen,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    marginTop: 0,
    alignItems: 'center',
  },
  totalLabel: { color: Colors.sky.blueLight, fontSize: 13, marginBottom: 6 },
  totalAmount: { color: Colors.neutral.white, fontSize: 36, fontWeight: '700', marginBottom: 4 },
  totalCount: { color: Colors.sky.blueLight, fontSize: 12 },

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
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: Spacing.md },
  dotGreen: { backgroundColor: Colors.semantic.success },
  dotRed: { backgroundColor: Colors.semantic.error },
  rowInfo: { flex: 1 },
  rowType: { fontSize: 14, fontWeight: '600', color: Colors.neutral.gray800 },
  rowDate: { fontSize: 12, color: Colors.neutral.gray400, marginTop: 2 },
  rowRight: { alignItems: 'flex-end' },
  rowAmount: { fontSize: 15, fontWeight: '700', color: Colors.primary.navy },
  rowAmountFailed: { color: Colors.semantic.error },
  rowStatus: { fontSize: 12, color: Colors.semantic.success, marginTop: 2 },
  rowStatusFailed: { color: Colors.semantic.error },
});
