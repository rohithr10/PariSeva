import React, { useState } from 'react';
import {
  View, Text, StyleSheet, StatusBar,
  TouchableOpacity, ScrollView, Dimensions,
} from 'react-native';
import WebView from 'react-native-webview';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import type { MassStackParamList } from '../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const VIDEO_HEIGHT = (SCREEN_WIDTH * 9) / 16;

type Props = NativeStackScreenProps<MassStackParamList, typeof Routes.LiveMass>;

const COMMENTS = [
  { user: 'Mary T.', text: 'Praise the Lord!', time: '2m ago' },
  { user: 'Joseph R.', text: 'Beautiful homily, Father', time: '5m ago' },
  { user: 'Anna P.', text: 'Thank you Jesus', time: '7m ago' },
  { user: 'Peter S.', text: 'Watching from Dubai. God bless!', time: '10m ago' },
];

export default function LiveMassScreen({ navigation, route }: Props) {
  const { videoId, title } = route.params;
  const [isLiked, setIsLiked] = useState(false);

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TopSafeArea color={Colors.primary.navyDark} />
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary.navyDark} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.neutral.white} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
          <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
        </View>
        <TouchableOpacity style={styles.shareBtn}>
          <MaterialCommunityIcons name="share-variant-outline" size={20} color={Colors.neutral.white} />
        </TouchableOpacity>
      </View>

      {/* Video Player */}
      <View style={styles.playerContainer}>
        <WebView
          source={{ uri: embedUrl }}
          style={styles.webview}
          allowsFullscreenVideo
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled
        />
      </View>

      <ScrollView style={styles.bottom} showsVerticalScrollIndicator={false}>
        {/* Mass Info */}
        <View style={styles.infoCard}>
          <Text style={styles.massTitle}>{title}</Text>
          <Text style={styles.massSubtitle}>St. Mary's Basilica · Sunday Holy Mass</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="eye-outline" size={14} color={Colors.neutral.gray400} />
              <Text style={styles.statText}>432 watching</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="clock-outline" size={14} color={Colors.neutral.gray400} />
              <Text style={styles.statText}>Started 45 min ago</Text>
            </View>
          </View>
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[styles.actionBtn, isLiked && styles.actionBtnActive]}
              onPress={() => setIsLiked(l => !l)}>
              <MaterialCommunityIcons
                name="hands-pray"
                size={18}
                color={isLiked ? Colors.accent.goldDark : Colors.neutral.gray600}
              />
              <Text style={[styles.actionBtnText, isLiked && styles.actionBtnTextActive]}>
                {isLiked ? 'Praying' : 'Pray'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <MaterialCommunityIcons name="share-variant-outline" size={18} color={Colors.neutral.gray600} />
              <Text style={styles.actionBtnText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <MaterialCommunityIcons name="hand-heart-outline" size={18} color={Colors.neutral.gray600} />
              <Text style={styles.actionBtnText}>Donate</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Live Comments */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Live Prayers</Text>
          {COMMENTS.map((c, i) => (
            <View key={i} style={styles.commentRow}>
              <View style={styles.commentAvatar}>
                <Text style={styles.commentAvatarText}>{c.user[0]}</Text>
              </View>
              <View style={styles.commentBubble}>
                <Text style={styles.commentUser}>{c.user}</Text>
                <Text style={styles.commentText}>{c.text}</Text>
              </View>
              <Text style={styles.commentTime}>{c.time}</Text>
            </View>
          ))}
        </View>
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.primary.navyDark },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.screen,
    paddingVertical: 12,
    backgroundColor: Colors.primary.navyDark,
  },
  backBtn: { padding: 4 },
  headerCenter: { flex: 1, alignItems: 'center', paddingHorizontal: Spacing.sm },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.semantic.error,
    borderRadius: Radius.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 4,
    alignSelf: 'center',
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#fff', marginRight: 4 },
  liveText: { color: '#fff', fontWeight: '700', fontSize: 10, letterSpacing: 1 },
  headerTitle: { color: Colors.neutral.white, fontSize: 14, fontWeight: '600' },
  shareBtn: { padding: 4 },

  playerContainer: {
    width: SCREEN_WIDTH,
    height: VIDEO_HEIGHT,
    backgroundColor: '#000',
  },
  webview: { flex: 1 },

  bottom: { flex: 1, backgroundColor: Colors.neutral.warmWhite },

  infoCard: {
    padding: Spacing.screen,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  massTitle: { fontSize: 18, fontWeight: '700', color: Colors.primary.navy, marginBottom: 4 },
  massSubtitle: { fontSize: 13, color: Colors.neutral.gray500, marginBottom: Spacing.sm },
  statsRow: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.md },
  statText: { fontSize: 12, color: Colors.neutral.gray400 },
  statItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  actionsRow: { flexDirection: 'row', gap: Spacing.md },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: Radius.md,
    backgroundColor: Colors.neutral.gray100,
    gap: 4,
  },
  actionBtnActive: { backgroundColor: Colors.accent.goldPale, borderWidth: 1, borderColor: Colors.accent.gold },
  actionBtnText: { fontSize: 13, color: Colors.neutral.gray600, fontWeight: '500' },
  actionBtnTextActive: { color: Colors.accent.goldDark },

  section: { padding: Spacing.screen },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.primary.navy, marginBottom: Spacing.md },
  commentRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  commentAvatarText: { color: Colors.neutral.white, fontWeight: '700', fontSize: 14 },
  commentBubble: {
    flex: 1,
    backgroundColor: Colors.neutral.white,
    borderRadius: Radius.lg,
    padding: Spacing.sm,
    ...Shadow.sm,
  },
  commentUser: { fontSize: 12, fontWeight: '600', color: Colors.primary.navy },
  commentText: { fontSize: 13, color: Colors.neutral.gray700, marginTop: 2 },
  commentTime: { fontSize: 11, color: Colors.neutral.gray400, marginLeft: Spacing.sm },
});
