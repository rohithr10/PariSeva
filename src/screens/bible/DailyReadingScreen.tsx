import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

const READING = {
  date: 'Friday, June 5, 2026',
  liturgicalDay: 'Sacred Heart of Jesus',
  liturgicalDayTA: 'இயேசுவின் திரு இதயம்',
  readings: [
    {
      label: 'First Reading',
      labelTA: 'முதல் வாசகம்',
      reference: 'Isaiah 61:1–3a, 6a, 8b–9',
      text: 'The spirit of the Lord GOD is upon me, because the LORD has anointed me; He has sent me to bring glad tidings to the lowly, to heal the brokenhearted, to proclaim liberty to the captives and release to the prisoners, to announce a year of favor from the LORD and a day of vindication by our God, to comfort all who mourn; to place on those who mourn in Zion a diadem instead of ashes, to give them oil of gladness in place of mourning.',
    },
    {
      label: 'Responsorial Psalm',
      labelTA: 'பதிலுரைப் பாடல்',
      reference: 'Psalm 23:1–3a, 3b–4, 5, 6',
      text: 'R. The Lord is my shepherd; there is nothing I shall want.\n\nThe LORD is my shepherd; I shall not want. In verdant pastures he gives me repose; beside restful waters he leads me; he refreshes my soul.',
    },
    {
      label: 'Second Reading',
      labelTA: 'இரண்டாம் வாசகம்',
      reference: 'Ephesians 3:8–12, 14–19',
      text: 'Brothers and sisters: To me, the very least of all the holy ones, this grace was given, to preach to the Gentiles the inscrutable riches of Christ, and to bring to light for all what is the plan of the mystery hidden from ages past in God who created all things, so that the manifold wisdom of God might now be made known through the church to the principalities and authorities in the heavens.',
    },
    {
      label: 'Gospel',
      labelTA: 'நற்செய்தி',
      reference: 'John 19:31–37',
      text: 'Since it was preparation day, in order that the bodies might not remain on the cross on the sabbath, for the sabbath day of that week was a solemn one, the Jews asked Pilate that their legs be broken and they be taken down. So the soldiers came and broke the legs of the first and then of the other one who was crucified with Jesus. But when they came to Jesus and saw that he was already dead, they did not break his legs, but one soldier thrust his lance into his side, and immediately blood and water flowed out.',
    },
  ],
};

export default function DailyReadingScreen() {
  const navigation = useNavigation<any>();
  const [showTA, setShowTA] = useState(false);
  const [expandedIdx, setExpandedIdx] = useState(0);

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TopSafeArea color={Colors.primary.navy} />
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary.navyDark} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daily Reading</Text>
        <TouchableOpacity onPress={() => setShowTA(t => !t)} style={styles.langBtn}>
          <Text style={[styles.langBtnText, showTA && styles.langBtnActive]}>த</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Day Banner */}
        <View style={styles.dayBanner}>
          <Text style={styles.date}>{READING.date}</Text>
          <Text style={styles.feast}>{READING.liturgicalDay}</Text>
          <Text style={styles.feastTA}>{READING.liturgicalDayTA}</Text>
        </View>

        {/* Readings */}
        {READING.readings.map((r, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.readingCard, i === expandedIdx && styles.readingCardExpanded]}
            onPress={() => setExpandedIdx(i === expandedIdx ? -1 : i)}
            activeOpacity={0.9}>
            <View style={styles.readingHeader}>
              <View>
                <Text style={styles.readingLabel}>{r.label}</Text>
                {showTA && <Text style={styles.readingLabelTA}>{r.labelTA}</Text>}
                <Text style={styles.readingRef}>{r.reference}</Text>
              </View>
              <MaterialCommunityIcons name={i === expandedIdx ? 'chevron-up' : 'chevron-down'} style={styles.expandIcon} />
            </View>
            {i === expandedIdx && (
              <Text style={styles.readingText}>{r.text}</Text>
            )}
          </TouchableOpacity>
        ))}

        {/* Reflection */}
        <View style={styles.reflectionCard}>
          <Text style={styles.reflectionTitle}>Reflection</Text>
          <Text style={styles.reflectionText}>
            The Sacred Heart of Jesus calls us to a deeper understanding of God's love. Today's readings invite us to reflect on the pierced heart of Jesus as the source of our salvation and the model for Christian love. Let us open our hearts to receive His mercy and share it with others.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionBtn}>
            <MaterialCommunityIcons name="arrow-up" style={styles.actionIcon} />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <MaterialCommunityIcons name="volume-high" style={styles.actionIcon} />
            <Text style={styles.actionText}>Listen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <MaterialCommunityIcons name="bookmark-outline" style={styles.actionIcon} />
            <Text style={styles.actionText}>Bookmark</Text>
          </TouchableOpacity>
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
  langBtn: { padding: 4 },
  langBtnText: { fontSize: 18, color: Colors.neutral.white, opacity: 0.6 },
  langBtnActive: { color: Colors.accent.gold, opacity: 1 },

  dayBanner: {
    backgroundColor: Colors.primary.navyLight,
    padding: Spacing.xl,
    alignItems: 'center',
  },
  date: { color: Colors.sky.blueLight, fontSize: 13, marginBottom: 6 },
  feast: { color: Colors.neutral.white, fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 4 },
  feastTA: { color: Colors.accent.gold, fontSize: 16, textAlign: 'center' },

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
  readingLabelTA: { fontSize: 12, color: Colors.neutral.gray400, marginBottom: 2 },
  readingRef: { fontSize: 14, fontWeight: '600', color: Colors.primary.navy },
  expandIcon: { fontSize: 12, color: Colors.neutral.gray400 },
  readingText: {
    fontSize: 15,
    lineHeight: 26,
    color: Colors.neutral.gray700,
    marginTop: Spacing.md,
    fontStyle: 'italic',
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
  reflectionText: { fontSize: 14, lineHeight: 24, color: Colors.neutral.gray700 },

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.screen,
    marginBottom: Spacing.md,
  },
  actionBtn: { alignItems: 'center', padding: Spacing.md },
  actionIcon: { fontSize: 24, marginBottom: 4 , color: Colors.primary.navy},
  actionText: { fontSize: 12, color: Colors.neutral.gray500, fontWeight: '500' },
});
