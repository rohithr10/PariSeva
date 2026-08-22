import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

const SECTIONS = [
  {
    day: 'Weekdays (Mon–Sat)',
    dayTA: 'திங்கள் - சனி',
    timings: [
      { time: '06:30 AM', title: 'Morning Mass', titleTA: 'காலை திருப்பலி', language: 'both', venue: 'Chapel' },
      { time: '06:30 PM', title: 'Evening Mass', titleTA: 'மாலை திருப்பலி', language: 'both', venue: 'Main Church' },
    ],
  },
  {
    day: 'Sunday',
    dayTA: 'ஞாயிறு',
    timings: [
      { time: '06:00 AM', title: 'Tamil Mass', titleTA: 'தமிழ் திருப்பலி', language: 'ta', venue: 'Main Church' },
      { time: '07:30 AM', title: 'English Mass', titleTA: 'ஆங்கில திருப்பலி', language: 'en', venue: 'Main Church' },
      { time: '09:00 AM', title: 'Tamil Mass', titleTA: 'தமிழ் திருப்பலி', language: 'ta', venue: 'Main Church' },
      { time: '11:00 AM', title: 'English Mass', titleTA: 'ஆங்கில திருப்பலி', language: 'en', venue: 'Grotto' },
      { time: '05:30 PM', title: 'Tamil Mass', titleTA: 'மாலை தமிழ் திருப்பலி', language: 'ta', venue: 'Main Church' },
    ],
  },
  {
    day: 'Holy Days of Obligation',
    dayTA: 'திருவிழா நாட்கள்',
    timings: [
      { time: '06:00 AM', title: 'Feast Mass', titleTA: 'திருவிழா திருப்பலி', language: 'both', venue: 'Main Church' },
      { time: '09:00 AM', title: 'Solemn Feast Mass', titleTA: 'கொண்டாட்ட திருப்பலி', language: 'both', venue: 'Main Church' },
      { time: '06:00 PM', title: 'Evening Feast Mass', titleTA: 'மாலை திருவிழா', language: 'both', venue: 'Main Church' },
    ],
  },
];

export default function MassTimingsScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TopSafeArea color={Colors.primary.navy} />
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary.navyDark} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.neutral.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mass Timings</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.churchBanner}>
          <MaterialCommunityIcons name="church" size={36} color={Colors.accent.gold} />
          <View>
            <Text style={styles.churchName}>St. Mary's Basilica</Text>
            <Text style={styles.churchArea}>George Town, Chennai</Text>
          </View>
        </View>

        {SECTIONS.map((section, si) => (
          <View key={si} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionDay}>{section.day}</Text>
              <Text style={styles.sectionDayTA}>{section.dayTA}</Text>
            </View>
            {section.timings.map((t, ti) => (
              <View key={ti} style={styles.row}>
                <View style={styles.timeCol}>
                  <Text style={styles.time}>{t.time}</Text>
                </View>
                <View style={styles.infoCol}>
                  <Text style={styles.massTitle}>{t.title}</Text>
                  <Text style={styles.massTitleTA}>{t.titleTA}</Text>
                  <View style={styles.venueRow}>
                    <MaterialCommunityIcons name="map-marker-outline" size={12} color={Colors.neutral.gray400} />
                    <Text style={styles.venue}>{t.venue}</Text>
                  </View>
                </View>
                <View style={[
                  styles.langBadge,
                  t.language === 'ta' ? styles.langTA : t.language === 'en' ? styles.langEN : styles.langBoth,
                ]}>
                  <Text style={styles.langText}>
                    {t.language === 'ta' ? 'Tamil' : t.language === 'en' ? 'English' : 'Bilingual'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ))}

        <View style={styles.noteCard}>
          <View style={styles.noteTitleRow}>
            <MaterialCommunityIcons name="information-outline" size={16} color={Colors.accent.goldDark} />
            <Text style={styles.noteTitle}>Note</Text>
          </View>
          <Text style={styles.noteText}>
            Mass timings may change on special feast days and holy days. Check announcements or contact the parish office for latest updates.
          </Text>
        </View>

        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Parish Office</Text>
          <View style={styles.contactRow}>
            <MaterialCommunityIcons name="phone-outline" size={15} color={Colors.neutral.gray500} />
            <Text style={styles.contactText}>+91 44 2534 1234</Text>
          </View>
          <View style={styles.contactRow}>
            <MaterialCommunityIcons name="clock-outline" size={15} color={Colors.neutral.gray500} />
            <Text style={styles.contactText}>Mon–Sat: 9:00 AM – 5:00 PM</Text>
          </View>
        </View>

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
    backgroundColor: Colors.primary.navy,
    paddingHorizontal: Spacing.screen,
    paddingVertical: 14,
  },
  headerTitle: { color: Colors.neutral.white, fontSize: 18, fontWeight: '700' },
  scroll: { padding: Spacing.screen },
  churchBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary.navyLight,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  churchName: { color: Colors.neutral.white, fontSize: 18, fontWeight: '700' },
  churchArea: { color: Colors.sky.blueLight, fontSize: 13, marginTop: 2 },
  section: {
    backgroundColor: Colors.neutral.white,
    borderRadius: Radius.lg,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  sectionHeader: {
    backgroundColor: Colors.primary.navy,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionDay: { color: Colors.neutral.white, fontWeight: '700', fontSize: 14 },
  sectionDayTA: { color: Colors.sky.blueLight, fontSize: 13 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray100,
  },
  timeCol: { width: 80 },
  time: { fontSize: 13, fontWeight: '700', color: Colors.primary.navy },
  infoCol: { flex: 1 },
  massTitle: { fontSize: 14, fontWeight: '600', color: Colors.neutral.gray800 },
  massTitleTA: { fontSize: 12, color: Colors.neutral.gray400 },
  venue: { fontSize: 11, color: Colors.neutral.gray400 },
  venueRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 2 },
  langBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  langTA: { backgroundColor: Colors.primary.navyLight + '30' },
  langEN: { backgroundColor: Colors.sky.bluePale },
  langBoth: { backgroundColor: Colors.accent.goldPale },
  langText: { fontSize: 11, fontWeight: '600', color: Colors.primary.navy },
  noteCard: {
    backgroundColor: Colors.accent.goldPale,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.accent.gold,
  },
  noteTitle: { fontSize: 14, fontWeight: '700', color: Colors.accent.goldDark },
  noteTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  noteText: { fontSize: 13, color: Colors.neutral.gray600, lineHeight: 20 },
  contactCard: {
    backgroundColor: Colors.neutral.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    ...Shadow.sm,
  },
  contactTitle: { fontSize: 15, fontWeight: '700', color: Colors.primary.navy, marginBottom: Spacing.sm },
  contactText: { fontSize: 13, color: Colors.neutral.gray600 },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
});
