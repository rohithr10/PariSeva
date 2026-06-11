import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import type { AuthStackParamList } from '../../navigation/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    icon: 'church',
    title: 'Stay Connected with Your Parish',
    titleTA: 'உங்கள் பங்குடன் இணைந்திருங்கள்',
    body: 'Get mass timings, live streams and parish announcements instantly on your phone.',
    bg: Colors.primary.navy,
  },
  {
    id: '2',
    icon: 'book-open-page-variant-outline',
    title: 'Access Bible & Daily Readings',
    titleTA: 'பைபிள் & தினசரி வாசகங்கள்',
    body: 'Read Tamil and English Bible with daily liturgical readings — online or offline.',
    bg: Colors.primary.navyDark,
  },
  {
    id: '3',
    icon: 'hands-pray',
    title: 'Give. Serve. Grow in Faith.',
    titleTA: 'கொடு. சேவை செய். நம்பிக்கையில் வளர்.',
    body: 'Make offerings, subscribe, and track your generosity. All transparent.',
    bg: Colors.primary.navy,
  },
];

type Props = NativeStackScreenProps<AuthStackParamList, typeof Routes.Onboarding>;

export default function OnboardingScreen({ navigation }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const goNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: activeIndex + 1 });
    } else {
      navigation.replace(Routes.ChurchSelection);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <TouchableOpacity
        style={styles.skip}
        onPress={() => navigation.replace(Routes.ChurchSelection)}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onMomentumScrollEnd={e => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setActiveIndex(index);
        }}
        renderItem={({ item }) => (
          <View style={[styles.slide, { backgroundColor: item.bg }]}>
            <MaterialCommunityIcons name={item.icon} style={styles.slideIcon} />
            <Text style={styles.slideTitle}>{item.title}</Text>
            <Text style={styles.slideTitleTA}>{item.titleTA}</Text>
            <Text style={styles.slideBody}>{item.body}</Text>
          </View>
        )}
      />

      {/* Dots */}
      <View style={styles.dotsRow}>
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === activeIndex && styles.dotActive]}
          />
        ))}
      </View>

      {/* CTA */}
      <View style={styles.bottomArea}>
        {activeIndex < SLIDES.length - 1 ? (
          <TouchableOpacity style={styles.nextBtn} onPress={goNext}>
            <Text style={styles.nextText}>Next <MaterialCommunityIcons name="arrow-right" size={14} /></Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.startBtn} onPress={goNext}>
            <Text style={styles.startText}>Get Started</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.primary.navy },
  skip: { position: 'absolute', top: 50, right: 20, zIndex: 10 },
  skipText: { color: Colors.neutral.white, opacity: 0.7, fontSize: 14 },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: 80,
    paddingBottom: 160,
  },
  slideIcon: { fontSize: 80, marginBottom: Spacing.xl , color: Colors.neutral.white},
  slideTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.neutral.white,
    textAlign: 'center',
    marginBottom: Spacing.sm,
    lineHeight: 34,
  },
  slideTitleTA: {
    fontSize: 16,
    color: Colors.accent.goldLight,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  slideBody: {
    fontSize: 16,
    color: Colors.neutral.white,
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: 26,
  },
  dotsRow: {
    position: 'absolute',
    bottom: 110,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.neutral.white,
    opacity: 0.3,
    marginHorizontal: 4,
  },
  dotActive: {
    opacity: 1,
    width: 24,
    backgroundColor: Colors.accent.gold,
  },
  bottomArea: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    paddingHorizontal: Spacing.screen,
  },
  nextBtn: {
    alignSelf: 'flex-end',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  nextText: { color: Colors.neutral.white, fontSize: 16, fontWeight: '600' },
  startBtn: {
    backgroundColor: Colors.accent.gold,
    borderRadius: 14,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startText: { color: Colors.neutral.white, fontSize: 17, fontWeight: '700' },
});
