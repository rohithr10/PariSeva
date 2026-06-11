import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

const UPCOMING_EVENTS = [
  { date: '2026-06-09', title: 'Corpus Christi', titleTA: 'திரு உடல் திருவிழா', type: 'feast', color: Colors.accent.gold },
  { date: '2026-06-13', title: 'Feast of St. Anthony', titleTA: 'அந்தோணி திருவிழா', type: 'feast', color: Colors.accent.gold },
  { date: '2026-06-19', title: 'Sacred Heart of Jesus', titleTA: 'திரு இதய திருவிழா', type: 'feast', color: Colors.semantic.error },
  { date: '2026-06-24', title: 'Birth of St. John Baptist', titleTA: 'யோவான் பாப்திஸ்து', type: 'feast', color: Colors.accent.gold },
  { date: '2026-06-29', title: 'Feast of Sts. Peter & Paul', titleTA: 'பேதுரு பவுல் திருவிழா', type: 'feast', color: Colors.accent.gold },
  { date: '2026-07-16', title: 'Our Lady of Mt. Carmel', titleTA: 'கார்மல் அன்னை', type: 'feast', color: Colors.sky.blue },
  { date: '2026-08-15', title: 'Assumption of Mary', titleTA: 'மரியாயி எடுத்துக்கொள்ளப்படல்', type: 'holyday', color: Colors.semantic.error },
];

function buildCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

function formatDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export default function MassCalendarScreen() {
  const navigation = useNavigation<any>();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const cells = buildCalendar(year, month);
  const today = now.getDate();

  const eventDates = new Set(UPCOMING_EVENTS.map(e => e.date));

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
  };

  const currentMonthEvents = UPCOMING_EVENTS.filter(e =>
    e.date.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`));

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TopSafeArea color={Colors.primary.navy} />
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary.navyDark} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mass Calendar</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Month Navigator */}
        <View style={styles.monthNav}>
          <TouchableOpacity onPress={prevMonth} style={styles.navBtn}>
            <MaterialCommunityIcons name="chevron-left" style={styles.navArrow} />
          </TouchableOpacity>
          <Text style={styles.monthTitle}>{MONTH_NAMES[month]} {year}</Text>
          <TouchableOpacity onPress={nextMonth} style={styles.navBtn}>
            <MaterialCommunityIcons name="chevron-right" style={styles.navArrow} />
          </TouchableOpacity>
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendarCard}>
          <View style={styles.dayRow}>
            {['S','M','T','W','T','F','S'].map((d, i) => (
              <Text key={i} style={styles.dayHeader}>{d}</Text>
            ))}
          </View>
          <View style={styles.grid}>
            {cells.map((cell, i) => {
              if (cell === null) return <View key={i} style={styles.cell} />;
              const dateStr = formatDate(year, month, cell);
              const isToday = cell === today && month === now.getMonth() && year === now.getFullYear();
              const hasEvent = eventDates.has(dateStr);
              return (
                <View key={i} style={styles.cell}>
                  <View style={[styles.dayCircle, isToday && styles.todayCircle]}>
                    <Text style={[styles.dayNum, isToday && styles.todayNum]}>{cell}</Text>
                  </View>
                  {hasEvent && <View style={styles.eventDot} />}
                </View>
              );
            })}
          </View>
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: Colors.accent.gold }]} />
            <Text style={styles.legendText}>Feast Day</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: Colors.semantic.error }]} />
            <Text style={styles.legendText}>Holy Day of Obligation</Text>
          </View>
        </View>

        {/* Events This Month */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Events in {MONTH_NAMES[month]}
          </Text>
          {currentMonthEvents.length === 0 ? (
            <Text style={styles.noEvents}>No special events this month</Text>
          ) : (
            currentMonthEvents.map((event, i) => (
              <View key={i} style={styles.eventCard}>
                <View style={[styles.eventColorBar, { backgroundColor: event.color }]} />
                <View style={styles.eventInfo}>
                  <Text style={styles.eventDate}>{event.date.slice(5).replace('-', '/')}</Text>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventTitleTA}>{event.titleTA}</Text>
                </View>
                <View style={[styles.typeBadge, { backgroundColor: event.color + '20' }]}>
                  <Text style={[styles.typeText, { color: event.color }]}>
                    {event.type === 'holyday' ? 'Holy Day' : 'Feast'}
                  </Text>
                </View>
              </View>
            ))
          )}
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
  backIcon: { color: Colors.neutral.white, fontSize: 22 },
  headerTitle: { color: Colors.neutral.white, fontSize: 18, fontWeight: '700' },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screen,
    paddingVertical: Spacing.md,
  },
  navBtn: { padding: Spacing.sm },
  navArrow: { fontSize: 24, color: Colors.primary.navy, fontWeight: '300' },
  monthTitle: { fontSize: 18, fontWeight: '700', color: Colors.primary.navy },
  calendarCard: {
    backgroundColor: Colors.neutral.white,
    marginHorizontal: Spacing.screen,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    ...Shadow.sm,
    marginBottom: Spacing.md,
  },
  dayRow: { flexDirection: 'row', marginBottom: 8 },
  dayHeader: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    color: Colors.neutral.gray400,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: { width: `${100 / 7}%`, alignItems: 'center', paddingVertical: 4 },
  dayCircle: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  todayCircle: { backgroundColor: Colors.accent.gold },
  dayNum: { fontSize: 14, color: Colors.neutral.gray700 },
  todayNum: { color: Colors.neutral.white, fontWeight: '700' },
  eventDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: Colors.semantic.error, marginTop: 1 },
  legend: {
    flexDirection: 'row',
    gap: Spacing.lg,
    paddingHorizontal: Spacing.screen,
    marginBottom: Spacing.lg,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 12, color: Colors.neutral.gray500 },
  section: { paddingHorizontal: Spacing.screen },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.primary.navy, marginBottom: Spacing.sm },
  noEvents: { color: Colors.neutral.gray400, fontSize: 14, textAlign: 'center', padding: Spacing.xl },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.white,
    borderRadius: Radius.lg,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  eventColorBar: { width: 4, alignSelf: 'stretch' },
  eventInfo: { flex: 1, padding: Spacing.md },
  eventDate: { fontSize: 12, color: Colors.neutral.gray400, marginBottom: 2 },
  eventTitle: { fontSize: 14, fontWeight: '600', color: Colors.neutral.gray800 },
  eventTitleTA: { fontSize: 12, color: Colors.neutral.gray400, marginTop: 2 },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 4, margin: Spacing.md, borderRadius: Radius.full },
  typeText: { fontSize: 11, fontWeight: '700' },
});
