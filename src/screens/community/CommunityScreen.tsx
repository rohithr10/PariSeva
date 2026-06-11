import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

const GROUPS = [
  { icon: 'soccer', name: 'Youth Club', nameTA: 'இளைஞர் குழு', members: 48, color: Colors.sky.blue, description: 'Sports, cultural events, camps' },
  { icon: 'human-female', name: "Women's Club", nameTA: 'மாதர் சங்கம்', members: 120, color: Colors.semantic.error, description: 'Prayer, fellowship, service' },
  { icon: 'account-heart-outline', name: 'Widow Support', nameTA: 'விதவை உதவி', members: 32, color: Colors.accent.gold, description: 'Counselling and support' },
  { icon: 'book-multiple-outline', name: 'Children Scholarship', nameTA: 'குழந்தை உதவி', members: 55, color: Colors.semantic.success, description: 'Education sponsorships' },
];

const UPCOMING = [
  { title: 'Youth Annual Sports Day', date: 'Jun 22, 2026', icon: 'soccer', type: 'Youth Club' },
  { title: 'Women\'s Fellowship Meeting', date: 'Jun 15, 2026', icon: 'human-female', type: "Women's Club" },
  { title: 'Scholarship Distribution', date: 'Jun 10, 2026', icon: 'book-multiple-outline', type: 'Children Scholarship' },
];

export default function CommunityScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <TopSafeArea color={Colors.primary.navy} />
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary.navyDark} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community</Text>
        <Text style={styles.headerSub}>St. Mary's Basilica Groups</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Groups */}
        <Text style={styles.sectionTitle}>Parish Groups</Text>
        {GROUPS.map((g, i) => (
          <TouchableOpacity key={i} style={styles.groupCard}>
            <View style={[styles.groupIconBg, { backgroundColor: g.color + '20' }]}>
              <MaterialCommunityIcons name={g.icon} style={styles.groupIcon} />
            </View>
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>{g.name}</Text>
              <Text style={styles.groupNameTA}>{g.nameTA}</Text>
              <Text style={styles.groupDesc}>{g.description}</Text>
            </View>
            <View style={styles.groupRight}>
              <Text style={styles.memberCount}>{g.members}</Text>
              <Text style={styles.memberLabel}>members</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Upcoming Events */}
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        {UPCOMING.map((e, i) => (
          <View key={i} style={styles.eventCard}>
            <MaterialCommunityIcons name={e.icon} style={styles.eventIcon} />
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{e.title}</Text>
              <Text style={styles.eventMeta}>{e.type} · <MaterialCommunityIcons name="calendar-outline" size={12} /> {e.date}</Text>
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
  },
  headerTitle: { fontSize: 26, fontWeight: '700', color: Colors.neutral.white },
  headerSub: { fontSize: 13, color: Colors.sky.blueLight, marginTop: 2 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: Colors.primary.navy, paddingHorizontal: Spacing.screen, marginTop: Spacing.lg, marginBottom: Spacing.sm },
  groupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.white,
    marginHorizontal: Spacing.screen,
    marginBottom: Spacing.sm,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    ...Shadow.sm,
  },
  groupIconBg: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  groupIcon: { fontSize: 26 , color: Colors.primary.navy},
  groupInfo: { flex: 1 },
  groupName: { fontSize: 15, fontWeight: '700', color: Colors.primary.navy },
  groupNameTA: { fontSize: 12, color: Colors.neutral.gray400 },
  groupDesc: { fontSize: 12, color: Colors.neutral.gray500, marginTop: 2 },
  groupRight: { alignItems: 'center' },
  memberCount: { fontSize: 20, fontWeight: '700', color: Colors.primary.navy },
  memberLabel: { fontSize: 11, color: Colors.neutral.gray400 },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.white,
    marginHorizontal: Spacing.screen,
    marginBottom: Spacing.xs,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    ...Shadow.sm,
  },
  eventIcon: { fontSize: 24, marginRight: Spacing.md , color: Colors.primary.navy},
  eventInfo: { flex: 1 },
  eventTitle: { fontSize: 14, fontWeight: '600', color: Colors.neutral.gray800 },
  eventMeta: { fontSize: 12, color: Colors.neutral.gray400, marginTop: 2 },
});
