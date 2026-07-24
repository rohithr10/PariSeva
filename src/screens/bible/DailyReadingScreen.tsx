import React, { useMemo, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity,
  ActivityIndicator, Share,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { otherLanguage } from '../../constants/bible';
import { useDailyMeta, useReadingTexts } from '../../hooks/useDailyReadings';
import type { AppLanguage } from '../../i18n';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

export default function DailyReadingScreen() {
  const navigation = useNavigation<any>();
  const { i18n } = useTranslation();
  const lang = (i18n.language as AppLanguage) ?? 'en';
  const parallelLang = otherLanguage(lang);

  const today = useMemo(() => new Date(), []);
  const dateKey = today.toISOString().slice(0, 10);

  const [showParallel, setShowParallel] = useState(false);
  const [expandedIdx, setExpandedIdx] = useState(0);

  const meta = useDailyMeta(today);
  const primary = useReadingTexts(meta.data?.readings, lang, dateKey, !!meta.data);
  const parallel = useReadingTexts(
    meta.data?.readings, parallelLang, dateKey, !!meta.data && showParallel,
  );

  const dateLabel = today.toLocaleDateString(lang === 'ta' ? 'ta-IN' : 'en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
  const parallelLabel = parallelLang === 'ta' ? 'த' : 'A';

  const shareReadings = async () => {
    if (!meta.data) return;
    const lines = meta.data.readings.map(r => `${r.label}: ${r.reference}`).join('\n');
    await Share.share({
      message: `${meta.data.feastName ?? 'Daily Readings'}\n${dateLabel}\n\n${lines}\n\n— Shared via My Holy Nest`,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TopSafeArea color={Colors.primary.navy} />
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary.navyDark} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={8}>
          <MaterialCommunityIcons name="arrow-left" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daily Reading</Text>
        <TouchableOpacity onPress={() => setShowParallel(t => !t)} style={styles.langBtn} hitSlop={8}>
          <Text style={[styles.langBtnText, showParallel && styles.langBtnActive]}>{parallelLabel}</Text>
        </TouchableOpacity>
      </View>

      {meta.isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.accent.gold} />
          <Text style={styles.stateText}>Loading today's readings…</Text>
        </View>
      ) : meta.isError ? (
        <View style={styles.center}>
          <MaterialCommunityIcons name="calendar-alert" size={40} color={Colors.neutral.gray400} />
          <Text style={styles.stateText}>Readings aren't available right now.</Text>
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
            const parallelText = parallel.data?.[r.type];
            const expanded = i === expandedIdx;
            return (
              <TouchableOpacity
                key={r.type}
                style={[styles.readingCard, expanded && styles.readingCardExpanded]}
                onPress={() => setExpandedIdx(expanded ? -1 : i)}
                activeOpacity={0.9}>
                <View style={styles.readingHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.readingLabel}>{r.label}</Text>
                    <Text style={styles.readingRef}>{r.reference}</Text>
                  </View>
                  <MaterialCommunityIcons
                    name={expanded ? 'chevron-up' : 'chevron-down'}
                    style={styles.expandIcon}
                  />
                </View>

                {expanded && (
                  <View style={styles.readingBody}>
                    {primary.isLoading ? (
                      <ActivityIndicator color={Colors.accent.gold} style={{ marginTop: Spacing.md }} />
                    ) : primaryText?.available ? (
                      <Text style={styles.readingText}>{primaryText.text}</Text>
                    ) : (
                      <Text style={styles.unavailable}>
                        This passage isn't in the free {lang === 'ta' ? 'Tamil' : 'English'} translation
                        {' '}(deuterocanonical). Reference above.
                      </Text>
                    )}

                    {showParallel && (
                      parallel.isLoading ? (
                        <Text style={styles.parallelText}>…</Text>
                      ) : parallelText?.available ? (
                        <Text style={styles.parallelText}>{parallelText.text}</Text>
                      ) : null
                    )}
                  </View>
                )}
              </TouchableOpacity>
            );
          })}

          {/* Thought for the day (feast quote) */}
          {!!meta.data?.feastQuote && (
            <View style={styles.reflectionCard}>
              <Text style={styles.reflectionTitle}>Thought for the Day</Text>
              <Text style={styles.reflectionText}>"{meta.data.feastQuote}"</Text>
            </View>
          )}

          {/* Actions */}
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionBtn} onPress={shareReadings}>
              <MaterialCommunityIcons name="share-variant-outline" style={styles.actionIcon} />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
            {!!meta.data?.usccbLink && (
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => setShowParallel(t => !t)}>
                <MaterialCommunityIcons name="translate" style={styles.actionIcon} />
                <Text style={styles.actionText}>
                  {parallelLang === 'ta' ? 'தமிழ்' : 'English'}
                </Text>
              </TouchableOpacity>
            )}
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
  langBtn: { padding: 4, minWidth: 28, alignItems: 'center' },
  langBtnText: { fontSize: 18, fontWeight: '700', color: Colors.neutral.white, opacity: 0.6 },
  langBtnActive: { color: Colors.accent.gold, opacity: 1 },

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
  parallelText: {
    fontSize: 14,
    lineHeight: 25,
    color: Colors.neutral.gray500,
    fontStyle: 'italic',
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.gray100,
  },
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
