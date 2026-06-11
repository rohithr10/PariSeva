import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  StatusBar, TouchableOpacity, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import Badge from '../../components/common/Badge/Badge';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

const TRANSFERS = [
  { id: 't1', family: 'John Peter Family', fromChurch: 'St. Mary\'s Basilica', toChurch: 'Santhome Cathedral', requestedOn: 'Jun 1', reason: 'Relocation to Mylapore', status: 'pending' },
  { id: 't2', family: 'Raj Family', fromChurch: 'St. Mary\'s Basilica', toChurch: 'Our Lady of Lourdes', requestedOn: 'May 25', reason: 'Near new home', status: 'approved' },
  { id: 't3', family: 'Anthony Family', fromChurch: 'Holy Cross', toChurch: 'St. Mary\'s Basilica', requestedOn: 'May 20', reason: 'Preferred parish', status: 'pending' },
];

const STATUS_MAP: Record<string, 'success' | 'warning' | 'error'> = {
  approved: 'success', pending: 'warning', rejected: 'error',
};

export default function AdminTransfersScreen() {
  const navigation = useNavigation<any>();
  const [transfers, setTransfers] = useState(TRANSFERS);

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    Alert.alert(
      action === 'approve' ? 'Approve Transfer?' : 'Reject Transfer?',
      'This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: action === 'approve' ? 'Approve' : 'Reject',
          style: action === 'reject' ? 'destructive' : 'default',
          onPress: () => setTransfers(prev =>
            prev.map(t => t.id === id ? { ...t, status: action === 'approve' ? 'approved' : 'rejected' } : t)),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <TopSafeArea color={Colors.primary.navy} />
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary.navyDark} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transfer Requests</Text>
        <View style={{ width: 32 }} />
      </View>

      <FlatList
        data={transfers}
        keyExtractor={t => t.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardTop}>
              <Text style={styles.family}>{item.family}</Text>
              <Badge label={item.status} variant={STATUS_MAP[item.status]} size="sm" />
            </View>
            <View style={styles.transferRoute}>
              <Text style={styles.church}>{item.fromChurch}</Text>
              <MaterialCommunityIcons name="arrow-right" style={styles.arrow} />
              <Text style={styles.church}>{item.toChurch}</Text>
            </View>
            <Text style={styles.reason}>Reason: {item.reason}</Text>
            <Text style={styles.date}>Requested: {item.requestedOn}</Text>
            {item.status === 'pending' && (
              <View style={styles.actionsRow}>
                <TouchableOpacity style={styles.approveBtn} onPress={() => handleAction(item.id, 'approve')}>
                  <Text style={styles.approveBtnText}><MaterialCommunityIcons name="check" size={13} /> Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rejectBtn} onPress={() => handleAction(item.id, 'reject')}>
                  <Text style={styles.rejectBtnText}><MaterialCommunityIcons name="close" size={13} /> Reject</Text>
                </TouchableOpacity>
              </View>
            )}
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
  list: { padding: Spacing.screen },
  card: {
    backgroundColor: Colors.neutral.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm },
  family: { fontSize: 15, fontWeight: '700', color: Colors.primary.navy },
  transferRoute: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, marginBottom: Spacing.xs },
  church: { fontSize: 13, color: Colors.neutral.gray600, flex: 1 },
  arrow: { color: Colors.accent.gold, fontSize: 18, fontWeight: '700' },
  reason: { fontSize: 12, color: Colors.neutral.gray500, marginBottom: 2 },
  date: { fontSize: 11, color: Colors.neutral.gray400, marginBottom: Spacing.sm },
  actionsRow: { flexDirection: 'row', gap: Spacing.sm },
  approveBtn: {
    flex: 1, backgroundColor: Colors.semantic.success + '20', borderRadius: Radius.md,
    padding: Spacing.sm, alignItems: 'center', borderWidth: 1, borderColor: Colors.semantic.success,
  },
  approveBtnText: { color: Colors.semantic.success, fontWeight: '700', fontSize: 13 },
  rejectBtn: {
    flex: 1, backgroundColor: Colors.semantic.error + '15', borderRadius: Radius.md,
    padding: Spacing.sm, alignItems: 'center', borderWidth: 1, borderColor: Colors.semantic.error,
  },
  rejectBtnText: { color: Colors.semantic.error, fontWeight: '700', fontSize: 13 },
});
