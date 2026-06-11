import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  StatusBar, TouchableOpacity, Share,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import type { BibleStackParamList } from '../../navigation/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

type Props = NativeStackScreenProps<BibleStackParamList, typeof Routes.BibleReader>;

const MOCK_VERSES = [
  { verse: 1, text: 'In the beginning God created the heaven and the earth.', textTA: 'ஆரம்பத்தில் தேவன் வானத்தையும் பூமியையும் சிருஷ்டித்தார்.' },
  { verse: 2, text: 'And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.', textTA: 'பூமியானது வடிவற்று வெறுமையாய் இருந்தது; ஆழத்தின்மேல் இருள் மண்டிக்கிடந்தது; தேவ ஆவியானவர் ஜலங்களின்மேல் அசைவாடினார்.' },
  { verse: 3, text: 'And God said, Let there be light: and there was light.', textTA: 'தேவன்: வெளிச்சம் உண்டாகக்கடவது என்றார்; வெளிச்சம் உண்டாயிற்று.' },
  { verse: 4, text: 'And God saw the light, that it was good: and God divided the light from the darkness.', textTA: 'வெளிச்சம் நல்லது என்று தேவன் கண்டார்; வெளிச்சத்தையும் இருளையும் தேவன் பிரித்தார்.' },
  { verse: 5, text: 'And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.', textTA: 'தேவன் வெளிச்சத்துக்கு பகல் என்று பேரிட்டார்; இருளுக்கு இரவு என்று பேரிட்டார்; சாயங்காலமும் விடியற்காலமும் முதலாம் நாளாயிற்று.' },
  { verse: 6, text: 'And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters.', textTA: 'தேவன்: ஜலங்களின் நடுவே ஒரு ஆகாயவிரிவு உண்டாகக்கடவது, அது ஜலங்களை ஜலங்களினின்று பிரிக்கக்கடவது என்றார்.' },
  { verse: 7, text: 'And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so.', textTA: 'தேவன் ஆகாயவிரிவை உண்டாக்கி, ஆகாயவிரிவுக்குக் கீழிருக்கிற ஜலங்களை ஆகாயவிரிவுக்கு மேலிருக்கிற ஜலங்களினின்று பிரித்தார்; அப்படியே ஆயிற்று.' },
];

const FONT_SIZES = [14, 16, 18, 20, 22];

export default function BibleReaderScreen({ navigation, route }: Props) {
  const { book, chapter } = route.params;
  const [fontSize, setFontSize] = useState(16);
  const [fontSizeIdx, setFontSizeIdx] = useState(1);
  const [showTA, setShowTA] = useState(false);
  const [bookmarked, setBookmarked] = useState<number[]>([]);
  const [nightMode, setNightMode] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(chapter);

  const toggleBookmark = (verse: number) => {
    setBookmarked(prev =>
      prev.includes(verse) ? prev.filter(v => v !== verse) : [...prev, verse]);
  };

  const shareVerse = async (v: typeof MOCK_VERSES[0]) => {
    await Share.share({
      message: `${book} ${currentChapter}:${v.verse}\n\n"${v.text}"\n\n— Shared via PariSeva`,
    });
  };

  const bg = nightMode ? Colors.primary.navyDark : Colors.neutral.white;
  const textColor = nightMode ? Colors.neutral.white : Colors.neutral.gray800;
  const verseNumColor = nightMode ? Colors.accent.gold : Colors.accent.goldDark;

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
        <TouchableOpacity style={styles.titleBtn}>
          <Text style={[styles.headerBook, { color: nightMode ? Colors.neutral.white : Colors.primary.navy }]}>
            {book}
          </Text>
          <Text style={[styles.headerChapter, { color: nightMode ? Colors.sky.blueLight : Colors.neutral.gray500 }]}>
            Chapter {currentChapter} <MaterialCommunityIcons name="chevron-down" size={14} />
          </Text>
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => setShowTA(t => !t)} style={styles.iconBtn}>
            <Text style={[styles.iconText, showTA && styles.iconActive]}>த</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setNightMode(n => !n)} style={styles.iconBtn}>
            <MaterialCommunityIcons name={nightMode ? 'weather-sunny' : 'weather-night'} size={18} color={nightMode ? Colors.accent.goldLight : Colors.primary.navy} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Font Size Controls */}
      <View style={[styles.controls, { backgroundColor: bg }]}>
        <TouchableOpacity
          onPress={() => { if (fontSizeIdx > 0) { setFontSizeIdx(i => i - 1); setFontSize(FONT_SIZES[fontSizeIdx - 1]); } }}
          style={styles.fontBtn}>
          <Text style={[styles.fontBtnText, { color: textColor }]}>A-</Text>
        </TouchableOpacity>
        <Text style={{ color: textColor, fontSize: 12 }}>{fontSize}px</Text>
        <TouchableOpacity
          onPress={() => { if (fontSizeIdx < FONT_SIZES.length - 1) { setFontSizeIdx(i => i + 1); setFontSize(FONT_SIZES[fontSizeIdx + 1]); } }}
          style={styles.fontBtn}>
          <Text style={[styles.fontBtnText, { color: textColor }]}>A+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.fontBtn}>
          <MaterialCommunityIcons name="magnify" size={18} color={textColor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.fontBtn}>
          <MaterialCommunityIcons name="share-variant-outline" size={18} color={textColor} />
        </TouchableOpacity>
      </View>

      <ScrollView style={[styles.scroll, { backgroundColor: bg }]}>
        <View style={styles.chapterHeader}>
          <Text style={[styles.chapterNum, { color: verseNumColor }]}>{currentChapter}</Text>
        </View>

        {MOCK_VERSES.map(v => (
          <TouchableOpacity
            key={v.verse}
            style={styles.verseRow}
            onLongPress={() => shareVerse(v)}>
            <Text style={[styles.verseNum, { color: verseNumColor, fontSize: fontSize - 4 }]}>
              {v.verse}
            </Text>
            <View style={styles.verseContent}>
              <Text style={[styles.verseText, { fontSize, color: textColor }]}>{v.text}</Text>
              {showTA && (
                <Text style={[styles.verseTextTA, { fontSize: fontSize - 1, color: nightMode ? Colors.sky.blueLight : Colors.neutral.gray500 }]}>
                  {v.textTA}
                </Text>
              )}
            </View>
            <TouchableOpacity onPress={() => toggleBookmark(v.verse)} style={styles.bookmarkBtn}>
              <MaterialCommunityIcons name={bookmarked.includes(v.verse) ? 'bookmark' : 'bookmark-outline'} size={18} color={bookmarked.includes(v.verse) ? Colors.accent.gold : Colors.neutral.gray400} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        {/* Chapter Navigation */}
        <View style={styles.chapterNav}>
          <TouchableOpacity
            style={[styles.chapterNavBtn, currentChapter <= 1 && styles.chapterNavBtnDisabled]}
            onPress={() => currentChapter > 1 && setCurrentChapter(c => c - 1)}
            disabled={currentChapter <= 1}>
            <Text style={styles.chapterNavText}><MaterialCommunityIcons name="arrow-left" size={13} /> Chapter {currentChapter - 1}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.chapterNavBtn}
            onPress={() => setCurrentChapter(c => c + 1)}>
            <Text style={styles.chapterNavText}>Chapter {currentChapter + 1} <MaterialCommunityIcons name="arrow-right" size={13} /></Text>
          </TouchableOpacity>
        </View>
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  backIcon: { fontSize: 22, marginRight: Spacing.md },
  titleBtn: { flex: 1 },
  headerBook: { fontSize: 17, fontWeight: '700' },
  headerChapter: { fontSize: 13, marginTop: 1 },
  headerActions: { flexDirection: 'row', gap: Spacing.xs },
  iconBtn: { padding: 8 },
  iconText: { fontSize: 18, color: Colors.neutral.gray500 },
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
  scroll: { flex: 1, paddingHorizontal: Spacing.screen },
  chapterHeader: { alignItems: 'center', paddingVertical: Spacing.xl },
  chapterNum: { fontSize: 64, fontWeight: '700' },
  verseRow: { flexDirection: 'row', paddingVertical: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.neutral.gray100 },
  verseNum: { width: 32, fontWeight: '700', marginTop: 2 },
  verseContent: { flex: 1 },
  verseText: { lineHeight: 28 },
  verseTextTA: { marginTop: 6, lineHeight: 26 },
  bookmarkBtn: { padding: 4 },
  bookmarkIcon: { fontSize: 16, opacity: 0.3 },
  bookmarkActive: { opacity: 1 },
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
