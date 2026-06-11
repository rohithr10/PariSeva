import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

const SCHOLARSHIP_TYPES = [
  { icon: 'school-outline', title: 'School Fees Support', amount: '₹5,000 – ₹15,000/year', criteria: 'Family income below ₹2L/year' },
  { icon: 'book-multiple-outline', title: 'Books & Stationery', amount: '₹2,000/year', criteria: 'All parish school children' },
  { icon: 'bag-personal-outline', title: 'Higher Education', amount: 'Up to ₹50,000/year', criteria: 'Merit cum need basis' },
];

export default function ChildrenScholarshipScreen() {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <TopSafeArea color={Colors.primary.navy} />
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary.navyDark} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><MaterialCommunityIcons name="arrow-left" style={styles.backIcon} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Children Scholarship</Text>
        <View style={{ width: 32 }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, { backgroundColor: Colors.semantic.success }]}>
          <MaterialCommunityIcons name="book-multiple-outline" style={styles.heroIcon} />
          <Text style={styles.heroTitle}>Children Scholarship Fund</Text>
          <Text style={styles.heroTA}>குழந்தை கல்வி உதவி</Text>
          <Text style={styles.heroDesc}>Supporting the education of children from needy families in our parish</Text>
          <Text style={styles.stat}>55 children supported · ₹3.2L distributed this year</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Scholarships</Text>
          {SCHOLARSHIP_TYPES.map((s, i) => (
            <View key={i} style={styles.card}>
              <MaterialCommunityIcons name={s.icon} style={styles.cardIcon} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{s.title}</Text>
                <Text style={styles.cardAmount}><MaterialCommunityIcons name="cash-multiple" size={13} /> {s.amount}</Text>
                <Text style={styles.cardCriteria}>Eligibility: {s.criteria}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.applyCard}>
          <Text style={styles.applyTitle}>How to Apply</Text>
          <Text style={styles.applyText}>
            Submit an application at the parish office with family income certificate, school fee receipt, and family card copy. Applications are accepted in April–May each year.
          </Text>
        </View>
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral.warmWhite },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primary.navy, paddingHorizontal: Spacing.screen, paddingVertical: 14 },
  backIcon: { color: Colors.neutral.white, fontSize: 22, marginRight: Spacing.md },
  headerTitle: { flex: 1, color: Colors.neutral.white, fontSize: 18, fontWeight: '700' },
  hero: { padding: Spacing.xl, alignItems: 'center' },
  heroIcon: { fontSize: 48, marginBottom: Spacing.sm , color: Colors.neutral.white},
  heroTitle: { color: Colors.neutral.white, fontSize: 20, fontWeight: '700', textAlign: 'center' },
  heroTA: { color: 'rgba(255,255,255,0.8)', fontSize: 16, marginTop: 4 },
  heroDesc: { color: 'rgba(255,255,255,0.9)', fontSize: 14, textAlign: 'center', lineHeight: 22, marginTop: Spacing.sm },
  stat: { color: Colors.neutral.white, fontWeight: '700', marginTop: Spacing.sm, textAlign: 'center' },
  section: { padding: Spacing.screen },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: Colors.primary.navy, marginBottom: Spacing.sm },
  card: { flexDirection: 'row', backgroundColor: Colors.neutral.white, borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.sm, ...Shadow.sm },
  cardIcon: { fontSize: 24, marginRight: Spacing.md , color: Colors.primary.navy},
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 14, fontWeight: '700', color: Colors.primary.navy },
  cardAmount: { fontSize: 13, color: Colors.semantic.success, fontWeight: '600', marginTop: 2 },
  cardCriteria: { fontSize: 12, color: Colors.neutral.gray400, marginTop: 2 },
  applyCard: { backgroundColor: Colors.accent.goldPale, margin: Spacing.screen, borderRadius: Radius.lg, padding: Spacing.lg, borderLeftWidth: 3, borderLeftColor: Colors.accent.gold },
  applyTitle: { fontSize: 16, fontWeight: '700', color: Colors.primary.navy, marginBottom: Spacing.sm },
  applyText: { fontSize: 13, color: Colors.neutral.gray600, lineHeight: 20 },
});
