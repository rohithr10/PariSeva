import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

const ACTIVITIES = [
  { icon: 'hands-pray', title: 'Monthly Prayer Meeting', date: 'Every 1st Sunday', desc: 'Rosary, novena and intercessory prayer' },
  { icon: 'food', title: 'Charity Kitchen', date: 'Every Saturday', desc: 'Meals for the poor and homeless' },
  { icon: 'book-open-page-variant-outline', title: "Women's Bible Study", date: 'Every Wednesday', desc: 'Group scripture reflection and sharing' },
];

export default function WomensClubScreen() {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <TopSafeArea color={Colors.primary.navy} />
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary.navyDark} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><MaterialCommunityIcons name="arrow-left" style={styles.backIcon} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Women's Club</Text>
        <View style={{ width: 32 }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, { backgroundColor: Colors.semantic.error }]}>
          <MaterialCommunityIcons name="human-female" style={styles.heroIcon} />
          <Text style={styles.heroTitle}>Madar Sangam</Text>
          <Text style={styles.heroTA}>மாதர் சங்கம்</Text>
          <Text style={styles.heroDesc}>Prayer, fellowship and charitable service for women of the parish</Text>
          <Text style={styles.memberCount}>120 active members</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activities</Text>
          {ACTIVITIES.map((a, i) => (
            <View key={i} style={styles.card}>
              <MaterialCommunityIcons name={a.icon} style={styles.cardIcon} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{a.title}</Text>
                <Text style={styles.cardDate}><MaterialCommunityIcons name="calendar-month-outline" size={13} /> {a.date}</Text>
                <Text style={styles.cardDesc}>{a.desc}</Text>
              </View>
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
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primary.navy, paddingHorizontal: Spacing.screen, paddingVertical: 14 },
  backIcon: { color: Colors.neutral.white, fontSize: 22, marginRight: Spacing.md },
  headerTitle: { flex: 1, color: Colors.neutral.white, fontSize: 18, fontWeight: '700' },
  hero: { padding: Spacing.xl, alignItems: 'center' },
  heroIcon: { fontSize: 48, marginBottom: Spacing.sm , color: Colors.neutral.white},
  heroTitle: { color: Colors.neutral.white, fontSize: 24, fontWeight: '700' },
  heroTA: { color: 'rgba(255,255,255,0.8)', fontSize: 16, marginTop: 4 },
  heroDesc: { color: 'rgba(255,255,255,0.9)', fontSize: 14, textAlign: 'center', lineHeight: 22, marginTop: Spacing.sm },
  memberCount: { color: Colors.neutral.white, fontWeight: '700', marginTop: Spacing.sm },
  section: { padding: Spacing.screen },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: Colors.primary.navy, marginBottom: Spacing.sm },
  card: { flexDirection: 'row', backgroundColor: Colors.neutral.white, borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.sm, ...Shadow.sm },
  cardIcon: { fontSize: 24, marginRight: Spacing.md , color: Colors.primary.navy},
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 14, fontWeight: '700', color: Colors.primary.navy },
  cardDate: { fontSize: 12, color: Colors.neutral.gray400, marginTop: 2 },
  cardDesc: { fontSize: 13, color: Colors.neutral.gray500, marginTop: 4 },
});
