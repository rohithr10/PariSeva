import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

const OFFERING_TYPES = [
  { icon: 'flower-outline', name: 'Sunday Offering', nameTA: 'ஞாயிறு காணிக்கை', desc: 'Regular weekly collection' },
  { icon: 'candle', name: 'Candle Offering', nameTA: 'மெழுகுவர்த்தி காணிக்கை', desc: 'Light a candle for intentions' },
  { icon: 'church', name: 'Church Maintenance', nameTA: 'தேவாலய பராமரிப்பு', desc: 'Help maintain our parish' },
  { icon: 'book-multiple-outline', name: 'Education Fund', nameTA: 'கல்வி நிதி', desc: 'Support parish school' },
  { icon: 'account-heart-outline', name: 'Poor Fund', nameTA: 'ஏழை நிதி', desc: 'Help the needy in our parish' },
  { icon: 'party-popper', name: 'Feast Fund', nameTA: 'திருவிழா நிதி', desc: 'Support parish feasts' },
];

const RECENT_DONATIONS = [
  { id: 'd1', type: 'Sunday Offering', amount: 500, date: 'Jun 1, 2026', status: 'completed' },
  { id: 'd2', type: 'Candle Offering', amount: 200, date: 'May 25, 2026', status: 'completed' },
  { id: 'd3', type: 'Church Maintenance', amount: 1000, date: 'May 15, 2026', status: 'completed' },
];

export default function DonationHomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TopSafeArea color={Colors.primary.navy} />
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary.navyDark} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Give</Text>
        <Text style={styles.headerSub}>St. Mary's Basilica</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Your Giving — {new Date().getFullYear()}</Text>
          <Text style={styles.summaryAmount}>₹4,200</Text>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: '42%' }]} />
          </View>
          <Text style={styles.progressLabel}>42% of annual goal ₹9,999</Text>
          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>8</Text>
              <Text style={styles.statLabel}>Donations</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>₹525</Text>
              <Text style={styles.statLabel}>Average</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>₹1,000</Text>
              <Text style={styles.statLabel}>Highest</Text>
            </View>
          </View>
        </View>

        {/* Offering Types */}
        <Text style={styles.sectionTitle}>Make an Offering</Text>
        <View style={styles.offeringGrid}>
          {OFFERING_TYPES.map((ot, i) => (
            <TouchableOpacity
              key={i}
              style={styles.offeringCard}
              onPress={() => navigation.navigate(Routes.MakeOffering, { offeringType: ot.name })}>
              <MaterialCommunityIcons name={ot.icon} style={styles.offeringIcon} />
              <Text style={styles.offeringName}>{ot.name}</Text>
              <Text style={styles.offeringNameTA}>{ot.nameTA}</Text>
              <Text style={styles.offeringDesc} numberOfLines={1}>{ot.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Subscription CTA */}
        <TouchableOpacity
          style={styles.subscriptionBanner}
          onPress={() => navigation.navigate(Routes.Subscription)}>
          <View>
            <Text style={styles.subscriptionTitle}>Auto-Giving</Text>
            <Text style={styles.subscriptionDesc}>Set up recurring monthly offerings automatically</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" style={styles.subscriptionArrow} />
        </TouchableOpacity>

        {/* Recent Donations */}
        <View style={styles.recentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Donations</Text>
            <TouchableOpacity onPress={() => navigation.navigate(Routes.DonationHistory)}>
              <Text style={styles.seeAll}>See All <MaterialCommunityIcons name="chevron-right" size={13} /></Text>
            </TouchableOpacity>
          </View>
          {RECENT_DONATIONS.map(d => (
            <View key={d.id} style={styles.donationRow}>
              <View style={styles.donationIcon}>
                <Text style={styles.donationIconText}>₹</Text>
              </View>
              <View style={styles.donationInfo}>
                <Text style={styles.donationType}>{d.type}</Text>
                <Text style={styles.donationDate}>{d.date}</Text>
              </View>
              <Text style={styles.donationAmount}>₹{d.amount}</Text>
            </View>
          ))}
        </View>

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
  },
  headerTitle: { fontSize: 26, fontWeight: '700', color: Colors.neutral.white },
  headerSub: { fontSize: 13, color: Colors.sky.blueLight, marginTop: 2 },

  summaryCard: {
    backgroundColor: Colors.primary.navyLight,
    margin: Spacing.screen,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    ...Shadow.md,
  },
  summaryLabel: { color: Colors.sky.blueLight, fontSize: 13, marginBottom: 4 },
  summaryAmount: { color: Colors.neutral.white, fontSize: 36, fontWeight: '700', marginBottom: Spacing.md },
  progressBg: { height: 6, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 3, marginBottom: 6 },
  progressFill: { height: 6, backgroundColor: Colors.accent.gold, borderRadius: 3 },
  progressLabel: { color: Colors.sky.blueLight, fontSize: 12, marginBottom: Spacing.md },
  summaryStats: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', paddingTop: Spacing.md },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { color: Colors.neutral.white, fontSize: 18, fontWeight: '700' },
  statLabel: { color: Colors.sky.blueLight, fontSize: 11, marginTop: 2 },
  statDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.15)' },

  sectionTitle: { fontSize: 17, fontWeight: '700', color: Colors.primary.navy, paddingHorizontal: Spacing.screen, marginBottom: Spacing.sm },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.screen, marginBottom: Spacing.sm },
  seeAll: { color: Colors.sky.blue, fontSize: 13 },

  offeringGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: Spacing.screen, gap: Spacing.sm, marginBottom: Spacing.lg },
  offeringCard: {
    width: '47%',
    backgroundColor: Colors.neutral.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    ...Shadow.sm,
  },
  offeringIcon: { fontSize: 28, marginBottom: 6 , color: Colors.primary.navy},
  offeringName: { fontSize: 13, fontWeight: '700', color: Colors.primary.navy, marginBottom: 2 },
  offeringNameTA: { fontSize: 11, color: Colors.neutral.gray400, marginBottom: 4 },
  offeringDesc: { fontSize: 11, color: Colors.neutral.gray500 },

  subscriptionBanner: {
    backgroundColor: Colors.accent.goldPale,
    marginHorizontal: Spacing.screen,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.accent.gold + '50',
    marginBottom: Spacing.lg,
  },
  subscriptionTitle: { fontSize: 15, fontWeight: '700', color: Colors.primary.navy, marginBottom: 4 },
  subscriptionDesc: { fontSize: 13, color: Colors.neutral.gray500 },
  subscriptionArrow: { fontSize: 28, color: Colors.accent.gold, fontWeight: '300' },

  recentSection: { marginBottom: Spacing.md },
  donationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.white,
    marginHorizontal: Spacing.screen,
    marginBottom: Spacing.xs,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    ...Shadow.sm,
  },
  donationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.accent.goldPale,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  donationIconText: { fontSize: 18, color: Colors.accent.goldDark, fontWeight: '700' },
  donationInfo: { flex: 1 },
  donationType: { fontSize: 14, fontWeight: '600', color: Colors.neutral.gray800 },
  donationDate: { fontSize: 12, color: Colors.neutral.gray400, marginTop: 2 },
  donationAmount: { fontSize: 16, fontWeight: '700', color: Colors.primary.navy },
});
