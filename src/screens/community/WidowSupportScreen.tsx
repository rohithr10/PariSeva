import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

const SERVICES = [
  { icon: 'handshake-outline', title: 'Counselling', desc: 'Free professional counselling sessions' },
  { icon: 'cash-multiple', title: 'Financial Aid', desc: 'Monthly stipend for eligible families' },
  { icon: 'account-child-outline', title: 'Children Support', desc: 'School fees and education support for children' },
  { icon: 'hospital-building', title: 'Medical Help', desc: 'Assistance for medical expenses' },
];

export default function WidowSupportScreen() {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <TopSafeArea color={Colors.primary.navy} />
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary.navyDark} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><MaterialCommunityIcons name="arrow-left" style={styles.backIcon} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Widow Support</Text>
        <View style={{ width: 32 }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, { backgroundColor: Colors.accent.gold }]}>
          <MaterialCommunityIcons name="account-heart-outline" style={styles.heroIcon} />
          <Text style={styles.heroTitle}>Widow Support Group</Text>
          <Text style={styles.heroTA}>விதவை உதவி</Text>
          <Text style={styles.heroDesc}>Supporting widows and their families with financial, emotional and spiritual care</Text>
          <Text style={styles.memberCount}>32 families supported</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          {SERVICES.map((s, i) => (
            <View key={i} style={styles.card}>
              <MaterialCommunityIcons name={s.icon} style={styles.cardIcon} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{s.title}</Text>
                <Text style={styles.cardDesc}>{s.desc}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Need Help?</Text>
          <Text style={styles.contactText}>Contact the parish office or call our support coordinator:</Text>
          <Text style={styles.contactPhone}><MaterialCommunityIcons name="phone-outline" size={13} /> +91 98765 99999</Text>
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
  heroTitle: { color: Colors.neutral.white, fontSize: 22, fontWeight: '700' },
  heroTA: { color: 'rgba(255,255,255,0.8)', fontSize: 16, marginTop: 4 },
  heroDesc: { color: 'rgba(255,255,255,0.9)', fontSize: 14, textAlign: 'center', lineHeight: 22, marginTop: Spacing.sm },
  memberCount: { color: Colors.neutral.white, fontWeight: '700', marginTop: Spacing.sm },
  section: { padding: Spacing.screen },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: Colors.primary.navy, marginBottom: Spacing.sm },
  card: { flexDirection: 'row', backgroundColor: Colors.neutral.white, borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.sm, ...Shadow.sm },
  cardIcon: { fontSize: 24, marginRight: Spacing.md , color: Colors.primary.navy},
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 14, fontWeight: '700', color: Colors.primary.navy },
  cardDesc: { fontSize: 13, color: Colors.neutral.gray500, marginTop: 4 },
  contactCard: { backgroundColor: Colors.accent.goldPale, margin: Spacing.screen, borderRadius: Radius.lg, padding: Spacing.lg, borderLeftWidth: 3, borderLeftColor: Colors.accent.gold },
  contactTitle: { fontSize: 16, fontWeight: '700', color: Colors.primary.navy, marginBottom: Spacing.sm },
  contactText: { fontSize: 13, color: Colors.neutral.gray600, lineHeight: 20 },
  contactPhone: { fontSize: 16, fontWeight: '700', color: Colors.primary.navy, marginTop: Spacing.sm },
});
