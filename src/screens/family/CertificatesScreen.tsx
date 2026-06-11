import React from 'react';
import {
  View, Text, StyleSheet, FlatList,
  StatusBar, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import Badge from '../../components/common/Badge/Badge';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

const CERTS = [
  { id: 'cert1', type: 'Baptism', typeTA: 'ஞானஸ்நானம்', member: 'Thomas Raj', requestedOn: 'May 20, 2026', status: 'approved', icon: 'water-outline' },
  { id: 'cert2', type: 'Confirmation', typeTA: 'திருதைலம்', member: 'Mary Raj', requestedOn: 'May 25, 2026', status: 'pending', icon: 'bird' },
  { id: 'cert3', type: 'Marriage', typeTA: 'திருமணம்', member: 'Thomas & Mary Raj', requestedOn: 'Apr 10, 2026', status: 'approved', icon: 'ring' },
  { id: 'cert4', type: 'Death', typeTA: 'மரண சான்று', member: 'Anthony Raj', requestedOn: 'Jan 5, 2026', status: 'rejected', icon: 'candle' },
];

const STATUS_MAP: Record<string, 'success' | 'warning' | 'error'> = {
  approved: 'success',
  pending: 'warning',
  rejected: 'error',
};

export default function CertificatesScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TopSafeArea color={Colors.primary.navy} />
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary.navyDark} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Certificates</Text>
        <TouchableOpacity
          style={styles.requestBtn}
          onPress={() => navigation.navigate(Routes.CertificateRequest)}>
          <Text style={styles.requestBtnText}>+ Request</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={CERTS}
        keyExtractor={c => c.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name={item.icon} style={styles.icon} />
            </View>
            <View style={styles.info}>
              <Text style={styles.certType}>{item.type}</Text>
              <Text style={styles.certTypeTA}>{item.typeTA}</Text>
              <Text style={styles.member}>{item.member}</Text>
              <Text style={styles.date}>Requested: {item.requestedOn}</Text>
            </View>
            <View style={styles.statusCol}>
              <Badge label={item.status} variant={STATUS_MAP[item.status]} size="sm" />
              {item.status === 'approved' && (
                <TouchableOpacity style={styles.downloadBtn}>
                  <Text style={styles.downloadText}><MaterialCommunityIcons name="arrow-down" size={13} /> PDF</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral.warmWhite },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary.navy,
    paddingHorizontal: Spacing.screen,
    paddingVertical: 14,
  },
  backIcon: { color: Colors.neutral.white, fontSize: 22, marginRight: Spacing.md },
  headerTitle: { flex: 1, color: Colors.neutral.white, fontSize: 18, fontWeight: '700' },
  requestBtn: {
    backgroundColor: Colors.accent.gold,
    borderRadius: Radius.full,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  requestBtnText: { color: Colors.neutral.white, fontWeight: '700', fontSize: 13 },
  list: { padding: Spacing.screen },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.accent.goldPale,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  icon: { fontSize: 22 , color: Colors.primary.navy},
  info: { flex: 1 },
  certType: { fontSize: 15, fontWeight: '700', color: Colors.primary.navy },
  certTypeTA: { fontSize: 12, color: Colors.neutral.gray400 },
  member: { fontSize: 13, color: Colors.neutral.gray600, marginTop: 2 },
  date: { fontSize: 11, color: Colors.neutral.gray400, marginTop: 2 },
  statusCol: { alignItems: 'flex-end', gap: Spacing.xs },
  downloadBtn: { marginTop: 4 },
  downloadText: { fontSize: 12, color: Colors.sky.blue, fontWeight: '600' },
});
