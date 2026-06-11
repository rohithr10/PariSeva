import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import Button from '../../components/common/Button/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

const PLANS = [
  { id: 'p1', amount: 200, label: '₹200/month', sublabel: 'Candle Offering' },
  { id: 'p2', amount: 500, label: '₹500/month', sublabel: 'Sunday Offering', popular: true },
  { id: 'p3', amount: 1000, label: '₹1,000/month', sublabel: 'Premium Supporter' },
];

export default function SubscriptionScreen() {
  const navigation = useNavigation<any>();
  const [selected, setSelected] = useState('p2');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    await new Promise<void>(r => setTimeout(r, 1200));
    setLoading(false);
    Alert.alert('Auto-Giving Activated', 'Your monthly offering has been set up successfully. Thank you for your generosity!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  const plan = PLANS.find(p => p.id === selected)!;

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TopSafeArea color={Colors.neutral.white} />
      <StatusBar barStyle="dark-content" backgroundColor={Colors.neutral.white} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Auto-Giving</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.heroBanner}>
          <MaterialCommunityIcons name="calendar-sync-outline" style={styles.heroIcon} />
          <Text style={styles.heroTitle}>Set Up Monthly Offering</Text>
          <Text style={styles.heroSubtitle}>
            Give regularly and automatically. Your offering will be processed on the 1st of each month.
          </Text>
        </View>

        <Text style={styles.label}>Choose a Plan</Text>
        {PLANS.map(p => (
          <TouchableOpacity
            key={p.id}
            style={[styles.planCard, selected === p.id && styles.planCardActive]}
            onPress={() => setSelected(p.id)}>
            {p.popular && (
              <View style={styles.popularBadge}><Text style={styles.popularText}>Popular</Text></View>
            )}
            <View style={styles.planLeft}>
              <Text style={[styles.planAmount, selected === p.id && styles.planAmountActive]}>{p.label}</Text>
              <Text style={styles.planSublabel}>{p.sublabel}</Text>
            </View>
            <View style={[styles.radio, selected === p.id && styles.radioActive]}>
              {selected === p.id && <View style={styles.radioDot} />}
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.benefitsCard}>
          <Text style={styles.benefitsTitle}>Benefits of Auto-Giving</Text>
          {[
            'Never miss your weekly offering',
            'Automatic tax receipt at year end',
            'Cancel anytime from the app',
            'Secure and encrypted payments',
          ].map((b, i) => (
            <View key={i} style={styles.benefitRow}>
              <MaterialCommunityIcons name="check-circle-outline" size={16} color={Colors.semantic.success} />
              <Text style={styles.benefitItem}>{b}</Text>
            </View>
          ))}
        </View>

        <Button
          title={`Start Auto-Giving ₹${plan.amount}/month`}
          onPress={handleSubscribe}
          loading={loading}
          fullWidth
          size="lg"
          style={styles.cta}
        />
        <Text style={styles.note}>You can cancel anytime. No cancellation fees.</Text>
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral.warmWhite },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.neutral.white,
    paddingHorizontal: Spacing.screen,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  backIcon: { color: Colors.primary.navy, fontSize: 22 },
  headerTitle: { color: Colors.primary.navy, fontSize: 18, fontWeight: '700' },
  scroll: { padding: Spacing.screen },
  heroBanner: { alignItems: 'center', marginBottom: Spacing.xl },
  heroIcon: { fontSize: 64, marginBottom: Spacing.md , color: Colors.accent.gold},
  heroTitle: { fontSize: 22, fontWeight: '700', color: Colors.primary.navy, textAlign: 'center', marginBottom: Spacing.sm },
  heroSubtitle: { fontSize: 14, color: Colors.neutral.gray500, textAlign: 'center', lineHeight: 22 },
  label: { fontSize: 14, fontWeight: '700', color: Colors.primary.navy, marginBottom: Spacing.sm },
  planCard: {
    backgroundColor: Colors.neutral.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.neutral.gray200,
    ...Shadow.sm,
    position: 'relative',
    overflow: 'hidden',
  },
  planCardActive: { borderColor: Colors.accent.gold, backgroundColor: Colors.accent.goldPale },
  popularBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.accent.gold,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderBottomLeftRadius: Radius.md,
  },
  popularText: { color: Colors.neutral.white, fontSize: 10, fontWeight: '700' },
  planLeft: { flex: 1 },
  planAmount: { fontSize: 18, fontWeight: '700', color: Colors.neutral.gray700 },
  planAmountActive: { color: Colors.primary.navy },
  planSublabel: { fontSize: 13, color: Colors.neutral.gray500, marginTop: 2 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: Colors.neutral.gray300, alignItems: 'center', justifyContent: 'center' },
  radioActive: { borderColor: Colors.accent.gold },
  radioDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.accent.gold },
  benefitsCard: {
    backgroundColor: Colors.neutral.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadow.sm,
  },
  benefitsTitle: { fontSize: 15, fontWeight: '700', color: Colors.primary.navy, marginBottom: Spacing.md },
  benefitRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  benefitItem: { fontSize: 14, color: Colors.neutral.gray600, lineHeight: 22, flex: 1 },
  cta: { marginBottom: Spacing.sm },
  note: { textAlign: 'center', fontSize: 12, color: Colors.neutral.gray400 },
});
