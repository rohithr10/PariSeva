import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

const EVENTS = [
  { icon: 'soccer', title: 'Annual Sports Day', date: 'Jun 22, 2026', desc: 'Cricket, football, athletics and more!' },
  { icon: 'drama-masks', title: 'Cultural Programme', date: 'Jul 5, 2026', desc: 'Drama, music and dance performances' },
  { icon: 'tent', title: 'Youth Camp', date: 'Aug 10–12, 2026', desc: '3-day spiritual and fun retreat' },
];

const LEADERS = [
  { name: 'Alex Thomas', role: 'President', initial: 'A' },
  { name: 'Priya Joseph', role: 'Secretary', initial: 'P' },
  { name: 'Raj Kumar', role: 'Treasurer', initial: 'R' },
];

export default function YouthClubScreen() {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <TopSafeArea color={Colors.primary.navy} />
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary.navyDark} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><MaterialCommunityIcons name="arrow-left" style={styles.backIcon} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Youth Club</Text>
        <View style={{ width: 32 }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <MaterialCommunityIcons name="soccer" style={styles.heroIcon} />
          <Text style={styles.heroTitle}>Youth Club</Text>
          <Text style={styles.heroTA}>இளைஞர் குழு</Text>
          <Text style={styles.heroDesc}>Sports, cultural events, spiritual retreats and camps for youth aged 15–35</Text>
          <Text style={styles.memberCount}>48 active members</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          {EVENTS.map((e, i) => (
            <View key={i} style={styles.eventCard}>
              <MaterialCommunityIcons name={e.icon} style={styles.eventIcon} />
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{e.title}</Text>
                <Text style={styles.eventDate}><MaterialCommunityIcons name="calendar-outline" size={13} /> {e.date}</Text>
                <Text style={styles.eventDesc}>{e.desc}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Leadership</Text>
          {LEADERS.map((l, i) => (
            <View key={i} style={styles.leaderRow}>
              <View style={styles.leaderAvatar}><Text style={styles.leaderAvatarText}>{l.initial}</Text></View>
              <View><Text style={styles.leaderName}>{l.name}</Text><Text style={styles.leaderRole}>{l.role}</Text></View>
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
  hero: { backgroundColor: Colors.sky.blue, padding: Spacing.xl, alignItems: 'center' },
  heroIcon: { fontSize: 48, marginBottom: Spacing.sm , color: Colors.neutral.white},
  heroTitle: { color: Colors.neutral.white, fontSize: 24, fontWeight: '700' },
  heroTA: { color: 'rgba(255,255,255,0.8)', fontSize: 16, marginTop: 4 },
  heroDesc: { color: 'rgba(255,255,255,0.9)', fontSize: 14, textAlign: 'center', lineHeight: 22, marginTop: Spacing.sm },
  memberCount: { color: Colors.neutral.white, fontWeight: '700', marginTop: Spacing.sm },
  section: { padding: Spacing.screen },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: Colors.primary.navy, marginBottom: Spacing.sm },
  eventCard: { flexDirection: 'row', backgroundColor: Colors.neutral.white, borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.sm, ...Shadow.sm },
  eventIcon: { fontSize: 24, marginRight: Spacing.md , color: Colors.primary.navy},
  eventInfo: { flex: 1 },
  eventTitle: { fontSize: 14, fontWeight: '700', color: Colors.primary.navy },
  eventDate: { fontSize: 12, color: Colors.neutral.gray400, marginTop: 2 },
  eventDesc: { fontSize: 13, color: Colors.neutral.gray500, marginTop: 4 },
  leaderRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.neutral.white, borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.xs, ...Shadow.sm },
  leaderAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.sky.blue, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  leaderAvatarText: { color: Colors.neutral.white, fontWeight: '700', fontSize: 16 },
  leaderName: { fontSize: 14, fontWeight: '600', color: Colors.primary.navy },
  leaderRole: { fontSize: 12, color: Colors.neutral.gray400 },
});
