import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  StatusBar, TouchableOpacity, Share,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { useAppSelector } from '../../hooks/useAppDispatch';
import { selectUser, selectChurch } from '../../store/slices/auth.slice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

export default function FamilyCardScreen() {
  const navigation = useNavigation<any>();
  const user = useAppSelector(selectUser);
  const church = useAppSelector(selectChurch);

  const family = {
    id: 'FAM-2024-0142',
    name: `${user?.profile.lastName ?? 'Thomas'} Family`,
    headName: `${user?.profile.firstName ?? 'Thomas'} ${user?.profile.lastName ?? 'Raj'}`,
    address: '14, Velankanni Nagar, Mylapore',
    city: 'Chennai — 600 004',
    phone: user?.phone ?? '+91 98765 43210',
    memberCount: 4,
    since: '1998',
    status: 'Active',
  };

  const shareCard = async () => {
    await Share.share({
      message: `PariSeva Family ID: ${family.id}\n${family.name}\n${church?.name ?? 'St. Mary\'s Basilica'}\n\nDownload PariSeva for more.`,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TopSafeArea color={Colors.neutral.white} />
      <StatusBar barStyle="dark-content" backgroundColor={Colors.neutral.warmWhite} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Family Card</Text>
        <TouchableOpacity onPress={shareCard}>
          <MaterialCommunityIcons name="arrow-up" style={styles.shareIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Physical-style Card */}
        <View style={styles.card}>
          {/* Card Header */}
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.churchNameCard}>{church?.name ?? 'St. Mary\'s Basilica'}</Text>
              <Text style={styles.churchTA}>{church?.nameTA ?? 'செயின்ட் மேரீஸ் பசிலிகா'}</Text>
              <Text style={styles.diocese}>Archdiocese of Madras-Mylapore</Text>
            </View>
            <MaterialCommunityIcons name="cross" style={styles.crossIcon} />
          </View>

          <View style={styles.cardDivider} />

          {/* Family Info */}
          <View style={styles.cardBody}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{family.name[0]}</Text>
            </View>
            <View style={styles.familyInfo}>
              <Text style={styles.familyName}>{family.name}</Text>
              <Text style={styles.headName}>Head: {family.headName}</Text>
              <Text style={styles.members}><MaterialCommunityIcons name="account-group-outline" size={13} /> {family.memberCount} Members</Text>
            </View>
          </View>

          {/* Card Details */}
          <View style={styles.cardDetails}>
            <View style={styles.detailRow}>
              <MaterialCommunityIcons name="map-marker-outline" style={styles.detailIcon} />
              <Text style={styles.detailText}>{family.address}, {family.city}</Text>
            </View>
            <View style={styles.detailRow}>
              <MaterialCommunityIcons name="phone-outline" style={styles.detailIcon} />
              <Text style={styles.detailText}>{family.phone}</Text>
            </View>
            <View style={styles.detailRow}>
              <MaterialCommunityIcons name="calendar-outline" style={styles.detailIcon} />
              <Text style={styles.detailText}>Member since {family.since}</Text>
            </View>
          </View>

          <View style={styles.cardDivider} />

          {/* Card Footer */}
          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.cardIdLabel}>FAMILY ID</Text>
              <Text style={styles.cardId}>{family.id}</Text>
            </View>
            <View style={[styles.statusBadge, family.status === 'Active' ? styles.statusActive : styles.statusInactive]}>
              <Text style={styles.statusText}>{family.status}</Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate(Routes.Members)}>
            <MaterialCommunityIcons name="account-group-outline" style={styles.actionIcon} />
            <Text style={styles.actionLabel}>Members</Text>
            <Text style={styles.actionCount}>{family.memberCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate(Routes.Certificates)}>
            <MaterialCommunityIcons name="certificate-outline" style={styles.actionIcon} />
            <Text style={styles.actionLabel}>Certificates</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate(Routes.ChurchTransfer)}>
            <MaterialCommunityIcons name="swap-horizontal" style={styles.actionIcon} />
            <Text style={styles.actionLabel}>Transfer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={shareCard}>
            <MaterialCommunityIcons name="arrow-up" style={styles.actionIcon} />
            <Text style={styles.actionLabel}>Share</Text>
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
    paddingHorizontal: Spacing.screen,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
    backgroundColor: Colors.neutral.white,
  },
  backIcon: { color: Colors.primary.navy, fontSize: 22 },
  headerTitle: { color: Colors.primary.navy, fontSize: 18, fontWeight: '700' },
  shareIcon: { fontSize: 20, color: Colors.primary.navy },
  scroll: { padding: Spacing.screen },

  card: {
    backgroundColor: Colors.primary.navy,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadow.gold,
    borderWidth: 1,
    borderColor: Colors.accent.gold + '30',
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.md },
  churchNameCard: { color: Colors.neutral.white, fontSize: 16, fontWeight: '700' },
  churchTA: { color: Colors.accent.gold, fontSize: 14, marginTop: 2 },
  diocese: { color: Colors.sky.blueLight, fontSize: 11, marginTop: 4 },
  crossIcon: { color: Colors.accent.gold, fontSize: 32 },
  cardDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.15)', marginVertical: Spacing.md },
  cardBody: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginBottom: Spacing.md },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: Colors.neutral.white, fontSize: 22, fontWeight: '700' },
  familyInfo: { flex: 1 },
  familyName: { color: Colors.neutral.white, fontSize: 18, fontWeight: '700' },
  headName: { color: Colors.sky.blueLight, fontSize: 13, marginTop: 2 },
  members: { color: Colors.sky.blueLight, fontSize: 13, marginTop: 4 },
  cardDetails: { gap: Spacing.xs, marginBottom: Spacing.sm },
  detailRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.xs },
  detailIcon: { fontSize: 14, marginTop: 1 , color: Colors.primary.navy},
  detailText: { color: 'rgba(255,255,255,0.7)', fontSize: 13, flex: 1 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardIdLabel: { color: Colors.sky.blueLight, fontSize: 10, letterSpacing: 1.5, marginBottom: 2 },
  cardId: { color: Colors.accent.gold, fontSize: 16, fontWeight: '700', letterSpacing: 1 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: Radius.full },
  statusActive: { backgroundColor: Colors.semantic.success + '30', borderWidth: 1, borderColor: Colors.semantic.success },
  statusInactive: { backgroundColor: Colors.semantic.error + '30', borderWidth: 1, borderColor: Colors.semantic.error },
  statusText: { color: Colors.semantic.success, fontWeight: '700', fontSize: 12 },

  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  actionCard: {
    width: '47%',
    backgroundColor: Colors.neutral.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    ...Shadow.sm,
  },
  actionIcon: { fontSize: 28, marginBottom: 8 , color: Colors.primary.navy},
  actionLabel: { fontSize: 14, fontWeight: '600', color: Colors.primary.navy },
  actionCount: { fontSize: 12, color: Colors.neutral.gray400, marginTop: 4 },
});
