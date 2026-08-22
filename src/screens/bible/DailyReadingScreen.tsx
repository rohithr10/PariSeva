import React, { useMemo, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity,
  ActivityIndicator, Share,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { useDailyMeta, useReadingTexts } from '../../hooks/useDailyReadings';
import { useBibleTheme } from '../../hooks/useBibleTheme';
import { BibleControls } from '../../components/common/BibleControls/BibleControls';
import type { AppLanguage } from '../../i18n';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

export default function DailyReadingScreen() {
  const navigation = useNavigation<any>();
  const { i18n } = useTranslation();
  const lang = (i18n.language as AppLanguage) ?? 'en';
  const { theme } = useBibleTheme();

  const today = useMemo(() => new Date(), []);
  const dateKey = today.toISOString().slice(0, 10);

  const [expandedIdx, setExpandedIdx] = useState(0);

  const meta = useDailyMeta(today);
  // Readings are fetched in the app language only. Switching language with the
  // header toggle re-fetches them, rather than showing English and Tamil together.
  const primary = useReadingTexts(meta.data?.readings, lang, dateKey, !!meta.data);

  const dateLabel = today.toLocaleDateString(lang === 'ta' ? 'ta-IN' : 'en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
  const shareReadings = async () => {
    if (!meta.data) return;
    const lines = meta.data.readings.map(r => `${r.label}: ${r.reference}`).join('\n');
    await Share.share({
      message: `${meta.data.feastName ?? 'Daily Readings'}\n${dateLabel}\n\n${lines}\n\n— Shared via My Holy Nest`,
    });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.bg }]}
      edges={['left', 'right']}>
      <TopSafeArea color={theme.headerBg} />
      <StatusBar barStyle="light-content" backgroundColor={theme.headerBg} />

      <View style={[styles.header, { backgroundColor: theme.headerBg }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={8}>
          <MaterialCommunityIcons name="arrow-left" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daily Reading</Text>
        <BibleControls variant="onDark" />
      </View>

      {meta.isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.accent.gold} />
          <Text style={[styles.stateText, { color: theme.textMuted }]}>
            Loading today's readings…
          </Text>
        </View>
      ) : meta.isError ? (
        <View style={styles.center}>
          <MaterialCommunityIcons name="calendar-alert" size={40} color={Colors.neutral.gray400} />
          <Text style={[styles.stateText, { color: theme.textMuted }]}>
            Readings aren't available right now.
          </Text>
          <TouchableOpacity style={styles.retryBtn} onPress={() => meta.refetch()}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Day Banner */}
          <View style={styles.dayBanner}>
            <Text style={styles.date}>{dateLabel}</Text>
            <Text style={styles.feast}>
              {meta.data?.feastName ?? meta.data?.season ?? 'Daily Readings'}
            </Text>
            {!!meta.data?.season && meta.data?.feastName && (
              <Text style={styles.feastTA}>{meta.data.season}</Text>
            )}
          </View>

          {/* Readings */}
          {meta.data?.readings.map((r, i) => {
            const primaryText = primary.data?.[r.type];
            const expanded = i === expandedIdx;
            return (
              <TouchableOpacity
                key={r.type}
                style={[
                  styles.readingCard,
                  { backgroundColor: theme.surface },
                  expanded && styles.readingCardExpanded,
                ]}
                onPress={() => setExpandedIdx(expanded ? -1 : i)}
                activeOpacity={0.9}>
                <View style={styles.readingHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.readingLabel}>{r.label}</Text>
                    <Text
                      style={[
                        styles.readingRef,
                        { color: theme.dark ? theme.text : Colors.primary.navy },
                      ]}>
                      {r.reference}
                    </Text>
                  </View>
                  <MaterialCommunityIcons
                    name={expanded ? 'chevron-up' : 'chevron-down'}
                    style={[styles.expandIcon, { color: theme.textMuted }]}
                  />
                </View>

                {expanded && (
                  <View style={styles.readingBody}>
                    {primary.isLoading ? (
                      <ActivityIndicator color={Colors.accent.gold} style={{ marginTop: Spacing.md }} />
                    ) : primaryText?.available ? (
                      <Text
                        style={[
                          styles.readingText,
                          { color: theme.dark ? theme.text : Colors.neutral.gray700 },
                        ]}>
                        {primaryText.text}
                      </Text>
                    ) : (
                      <Text style={[styles.unavailable, { color: theme.textMuted }]}>
                        This passage isn't in the free {lang === 'ta' ? 'Tamil' : 'English'} translation
                        {' '}(deuterocanonical). Reference above.
                      </Text>
                    )}
                  </View>
                )}
              </TouchableOpacity>
            );
          })}

          {/* Thought for the day (feast quote) */}
          {!!meta.data?.feastQuote && (
            <View
              style={[
                styles.reflectionCard,
                theme.dark && { backgroundColor: theme.surface },
              ]}>
              <Text
                style={[
                  styles.reflectionTitle,
                  theme.dark && { color: theme.text },
                ]}>
                Thought for the Day
              </Text>
              <Text
                style={[
                  styles.reflectionText,
                  theme.dark && { color: theme.textMuted },
                ]}>
                "{meta.data.feastQuote}"
              </Text>
            </View>
          )}

          {/* Actions */}
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionBtn} onPress={shareReadings}>
              <MaterialCommunityIcons
                name="share-variant-outline"
                style={[styles.actionIcon, { color: theme.accent }]}
              />
              <Text style={[styles.actionText, { color: theme.textMuted }]}>Share</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 32 }} />
        </ScrollView>
      )}
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

  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  stateText: { marginTop: Spacing.md, color: Colors.neutral.gray500, fontSize: 14, textAlign: 'center' },
  retryBtn: {
    marginTop: Spacing.md,
    backgroundColor: Colors.accent.gold,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
  },
  retryText: { color: Colors.neutral.white, fontWeight: '700' },

  dayBanner: {
    backgroundColor: Colors.primary.navyLight,
    padding: Spacing.xl,
    alignItems: 'center',
  },
  date: { color: Colors.sky.blueLight, fontSize: 13, marginBottom: 6 },
  feast: { color: Colors.neutral.white, fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 4 },
  feastTA: { color: Colors.accent.gold, fontSize: 15, textAlign: 'center' },

  readingCard: {
    backgroundColor: Colors.neutral.white,
    marginHorizontal: Spacing.screen,
    marginTop: Spacing.sm,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    ...Shadow.sm,
  },
  readingCardExpanded: { borderLeftWidth: 3, borderLeftColor: Colors.accent.gold },
  readingHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  readingLabel: { fontSize: 13, fontWeight: '700', color: Colors.accent.goldDark, marginBottom: 2 },
  readingRef: { fontSize: 14, fontWeight: '600', color: Colors.primary.navy },
  expandIcon: { fontSize: 18, color: Colors.neutral.gray400, marginLeft: Spacing.sm },
  readingBody: { marginTop: Spacing.md },
  readingText: { fontSize: 15, lineHeight: 26, color: Colors.neutral.gray700 },
  unavailable: {
    fontSize: 13,
    lineHeight: 20,
    color: Colors.neutral.gray400,
    fontStyle: 'italic',
    marginTop: Spacing.xs,
  },

  reflectionCard: {
    backgroundColor: Colors.accent.goldPale,
    margin: Spacing.screen,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: Colors.accent.gold,
  },
  reflectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.primary.navy, marginBottom: Spacing.sm },
  reflectionText: { fontSize: 14, lineHeight: 24, color: Colors.neutral.gray700, fontStyle: 'italic' },

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.screen,
    marginBottom: Spacing.md,
  },
  actionBtn: { alignItems: 'center', padding: Spacing.md },
  actionIcon: { fontSize: 24, marginBottom: 4, color: Colors.primary.navy },
  actionText: { fontSize: 12, color: Colors.neutral.gray500, fontWeight: '500' },
});
