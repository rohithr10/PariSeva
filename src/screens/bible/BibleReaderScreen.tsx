import React, { useMemo, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  StatusBar, TouchableOpacity, Share, ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../constants/colors';
import { Spacing, Radius } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { otherLanguage } from '../../constants/bible';
import { useBibleChapter } from '../../hooks/useBible';
import type { AppLanguage } from '../../i18n';
import type { BibleStackParamList } from '../../navigation/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

type Props = NativeStackScreenProps<BibleStackParamList, typeof Routes.BibleReader>;

const FONT_SIZES = [14, 16, 18, 20, 22];

export default function BibleReaderScreen({ navigation, route }: Props) {
  const { book, bookId, chapter, numberOfChapters } = route.params;
  const { i18n } = useTranslation();
  const lang = (i18n.language as AppLanguage) ?? 'en';
  const parallelLang = otherLanguage(lang);

  const [fontSizeIdx, setFontSizeIdx] = useState(1);
  const fontSize = FONT_SIZES[fontSizeIdx];
  const [showParallel, setShowParallel] = useState(false);
  const [bookmarked, setBookmarked] = useState<number[]>([]);
  const [nightMode, setNightMode] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(chapter);

  const primary = useBibleChapter(lang, bookId, currentChapter);
  const parallel = useBibleChapter(parallelLang, bookId, currentChapter, showParallel);

  const totalChapters = primary.data?.numberOfChapters ?? numberOfChapters ?? 1;
  const bookTitle = primary.data?.bookName ?? book;

  // Verse-number → parallel text, for interlinear rendering.
  const parallelMap = useMemo(() => {
    const m = new Map<number, string>();
    parallel.data?.verses.forEach(v => m.set(v.number, v.text));
    return m;
  }, [parallel.data]);

  const toggleBookmark = (verse: number) => {
    setBookmarked(prev =>
      prev.includes(verse) ? prev.filter(v => v !== verse) : [...prev, verse]);
  };

  const shareVerse = async (verseNum: number, text: string) => {
    await Share.share({
      message: `${bookTitle} ${currentChapter}:${verseNum}\n\n"${text}"\n\n— Shared via My Holy Nest`,
    });
  };

  const bg = nightMode ? Colors.primary.navyDark : Colors.neutral.white;
  const textColor = nightMode ? Colors.neutral.white : Colors.neutral.gray800;
  const verseNumColor = nightMode ? Colors.accent.gold : Colors.accent.goldDark;
  const parallelLabel = parallelLang === 'ta' ? 'த' : 'A';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: nightMode ? Colors.primary.navyDark : Colors.neutral.warmWhite }]} edges={['left', 'right']}>
      <TopSafeArea color={bg} />
      <StatusBar
        barStyle={nightMode ? 'light-content' : 'dark-content'}
        backgroundColor={nightMode ? Colors.primary.navyDark : Colors.neutral.white}
      />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: nightMode ? Colors.primary.navyDark : Colors.neutral.white }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={22} color={nightMode ? Colors.neutral.white : Colors.primary.navy} />
        </TouchableOpacity>
        <View style={styles.titleBtn}>
          <Text style={[styles.headerBook, { color: nightMode ? Colors.neutral.white : Colors.primary.navy }]} numberOfLines={1}>
            {bookTitle}
          </Text>
          <Text style={[styles.headerChapter, { color: nightMode ? Colors.sky.blueLight : Colors.neutral.gray500 }]}>
            Chapter {currentChapter} / {totalChapters}
          </Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => setShowParallel(t => !t)} style={styles.iconBtn}>
            <Text style={[styles.iconText, showParallel && styles.iconActive]}>{parallelLabel}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setNightMode(n => !n)} style={styles.iconBtn}>
            <MaterialCommunityIcons name={nightMode ? 'weather-sunny' : 'weather-night'} size={18} color={nightMode ? Colors.accent.goldLight : Colors.primary.navy} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Font Size Controls */}
      <View style={[styles.controls, { backgroundColor: bg }]}>
        <TouchableOpacity
          onPress={() => setFontSizeIdx(i => Math.max(0, i - 1))}
          style={styles.fontBtn}>
          <Text style={[styles.fontBtnText, { color: textColor }]}>A-</Text>
        </TouchableOpacity>
        <Text style={{ color: textColor, fontSize: 12 }}>{fontSize}px</Text>
        <TouchableOpacity
          onPress={() => setFontSizeIdx(i => Math.min(FONT_SIZES.length - 1, i + 1))}
          style={styles.fontBtn}>
          <Text style={[styles.fontBtnText, { color: textColor }]}>A+</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={() => setShowParallel(t => !t)} style={styles.parallelPill}>
          <MaterialCommunityIcons name="translate" size={14} color={showParallel ? Colors.neutral.white : Colors.accent.goldDark} />
          <Text style={[styles.parallelPillText, showParallel && { color: Colors.neutral.white }]}>
            {parallelLang === 'ta' ? 'தமிழ்' : 'English'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={[styles.scroll, { backgroundColor: bg }]}>
        <View style={styles.chapterHeader}>
          <Text style={[styles.chapterNum, { color: verseNumColor }]}>{currentChapter}</Text>
        </View>

        {primary.isLoading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={Colors.accent.gold} />
          </View>
        ) : primary.isError ? (
          <View style={styles.center}>
            <MaterialCommunityIcons name="wifi-off" size={40} color={Colors.neutral.gray400} />
            <Text style={[styles.stateText, { color: textColor }]}>Couldn't load this chapter.</Text>
            <TouchableOpacity style={styles.retryBtn} onPress={() => primary.refetch()}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          (primary.data?.verses ?? []).map(v => (
            <TouchableOpacity
              key={v.number}
              style={styles.verseRow}
              activeOpacity={0.6}
              onLongPress={() => shareVerse(v.number, v.text)}>
              <Text style={[styles.verseNum, { color: verseNumColor, fontSize: fontSize - 4 }]}>
                {v.number}
              </Text>
              <View style={styles.verseContent}>
                <Text style={[styles.verseText, { fontSize, color: textColor }]}>{v.text}</Text>
                {showParallel && (
                  <Text style={[styles.verseTextParallel, { fontSize: fontSize - 1, color: nightMode ? Colors.sky.blueLight : Colors.neutral.gray500 }]}>
                    {parallel.isLoading ? '…' : parallelMap.get(v.number) ?? ''}
                  </Text>
                )}
              </View>
              <TouchableOpacity onPress={() => toggleBookmark(v.number)} style={styles.bookmarkBtn}>
                <MaterialCommunityIcons name={bookmarked.includes(v.number) ? 'bookmark' : 'bookmark-outline'} size={18} color={bookmarked.includes(v.number) ? Colors.accent.gold : Colors.neutral.gray400} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}

        {/* Chapter Navigation */}
        {!primary.isLoading && !primary.isError && (
          <View style={styles.chapterNav}>
            <TouchableOpacity
              style={[styles.chapterNavBtn, currentChapter <= 1 && styles.chapterNavBtnDisabled]}
              onPress={() => currentChapter > 1 && setCurrentChapter(c => c - 1)}
              disabled={currentChapter <= 1}>
              <Text style={styles.chapterNavText}><MaterialCommunityIcons name="arrow-left" size={13} /> Ch {currentChapter - 1}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.chapterNavBtn, currentChapter >= totalChapters && styles.chapterNavBtnDisabled]}
              onPress={() => currentChapter < totalChapters && setCurrentChapter(c => c + 1)}
              disabled={currentChapter >= totalChapters}>
              <Text style={styles.chapterNavText}>Ch {currentChapter + 1} <MaterialCommunityIcons name="arrow-right" size={13} /></Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{ height: 48 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.screen,
    paddingVertical: 10,
    gap: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  titleBtn: { flex: 1 },
  headerBook: { fontSize: 17, fontWeight: '700' },
  headerChapter: { fontSize: 13, marginTop: 1 },
  headerActions: { flexDirection: 'row', gap: Spacing.xs },
  iconBtn: { padding: 8 },
  iconText: { fontSize: 18, fontWeight: '700', color: Colors.neutral.gray500 },
  iconActive: { color: Colors.accent.gold },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.screen,
    paddingVertical: 8,
    gap: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray100,
  },
  fontBtn: { padding: 4 },
  fontBtnText: { fontSize: 15, fontWeight: '600' },
  parallelPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 5,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.accent.gold,
    backgroundColor: Colors.transparent,
  },
  parallelPillText: { fontSize: 12, fontWeight: '600', color: Colors.accent.goldDark },
  scroll: { flex: 1, paddingHorizontal: Spacing.screen },
  center: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  stateText: { marginTop: Spacing.sm, fontSize: 14 },
  retryBtn: {
    marginTop: Spacing.md,
    backgroundColor: Colors.accent.gold,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
  },
  retryText: { color: Colors.neutral.white, fontWeight: '700' },
  chapterHeader: { alignItems: 'center', paddingVertical: Spacing.xl },
  chapterNum: { fontSize: 64, fontWeight: '700' },
  verseRow: { flexDirection: 'row', paddingVertical: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.neutral.gray100 },
  verseNum: { width: 32, fontWeight: '700', marginTop: 2 },
  verseContent: { flex: 1 },
  verseText: { lineHeight: 28 },
  verseTextParallel: { marginTop: 6, lineHeight: 26, fontStyle: 'italic' },
  bookmarkBtn: { padding: 4 },
  chapterNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xl,
    gap: Spacing.md,
  },
  chapterNavBtn: {
    flex: 1,
    backgroundColor: Colors.accent.goldPale,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.accent.gold + '40',
  },
  chapterNavBtnDisabled: { opacity: 0.4 },
  chapterNavText: { color: Colors.accent.goldDark, fontWeight: '600', fontSize: 14 },
});
