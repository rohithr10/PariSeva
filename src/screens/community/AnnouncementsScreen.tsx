import React from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

const ALL_ANNOUNCEMENTS = [
  { id: 'a1', title: 'Sunday Mass Change', titleTA: 'ஞாயிறு திருப்பலி மாற்றம்', content: 'Sunday 9:30 AM Mass moved to 10:00 AM this week due to diocesan programme.', priority: 'high', date: 'Jun 5, 2026' },
  { id: 'a2', title: 'Youth Annual Sports Day', titleTA: 'இளைஞர் ஆண்டு விளையாட்டு நாள்', content: 'Youth Annual Sports Day on June 22. Register with the Youth Club before June 18.', priority: 'normal', date: 'Jun 3, 2026' },
  { id: 'a3', title: 'Parish Meeting', titleTA: 'பங்கு ஆலோசனை கூட்டம்', content: 'Monthly parish council meeting on June 10 at 7 PM in the parish hall.', priority: 'normal', date: 'Jun 1, 2026' },
  { id: 'a4', title: 'Feast Day Preparations', titleTA: 'திருவிழா ஏற்பாடுகள்', content: 'Volunteers needed for Sacred Heart Feast Day preparations on June 18. Contact the parish office.', priority: 'high', date: 'May 28, 2026' },
  { id: 'a5', title: "New Women's Club Members", titleTA: 'புதிய மாதர் சங்கம்', content: 'New membership drive for the Madar Sangam. All women above 18 are welcome.', priority: 'normal', date: 'May 20, 2026' },
];

export default function AnnouncementsScreen() {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <TopSafeArea color={Colors.primary.navy} />
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary.navyDark} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><MaterialCommunityIcons name="arrow-left" style={styles.backIcon} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Announcements</Text>
        <View style={{ width: 32 }} />
      </View>
      <FlatList
        data={ALL_ANNOUNCEMENTS}
        keyExtractor={a => a.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={[styles.card, item.priority === 'high' && styles.cardHigh]}>
            <View style={styles.cardHeader}>
              <View style={[styles.priorityDot, item.priority === 'high' ? styles.dotHigh : styles.dotNormal]} />
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.titleTA}>{item.titleTA}</Text>
            <Text style={styles.content}>{item.content}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral.warmWhite },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primary.navy, paddingHorizontal: Spacing.screen, paddingVertical: 14 },
  backIcon: { color: Colors.neutral.white, fontSize: 22, marginRight: Spacing.md },
  headerTitle: { flex: 1, color: Colors.neutral.white, fontSize: 18, fontWeight: '700' },
  list: { padding: Spacing.screen },
  card: { backgroundColor: Colors.neutral.white, borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.sm, ...Shadow.sm },
  cardHigh: { borderLeftWidth: 3, borderLeftColor: Colors.accent.gold },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.xs },
  priorityDot: { width: 8, height: 8, borderRadius: 4, marginRight: Spacing.xs },
  dotHigh: { backgroundColor: Colors.accent.gold },
  dotNormal: { backgroundColor: Colors.neutral.gray300 },
  date: { fontSize: 11, color: Colors.neutral.gray400 },
  title: { fontSize: 15, fontWeight: '700', color: Colors.primary.navy, marginBottom: 2 },
  titleTA: { fontSize: 12, color: Colors.neutral.gray400, marginBottom: Spacing.xs },
  content: { fontSize: 13, color: Colors.neutral.gray600, lineHeight: 20 },
});
