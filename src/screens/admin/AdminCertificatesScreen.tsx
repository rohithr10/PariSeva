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

const CERTS = [
  { id: 'c1', family: 'Thomas Family', type: 'Baptism', member: 'Thomas Raj', requestedOn: 'Jun 1', purpose: 'Personal', status: 'pending' },
  { id: 'c2', family: 'Joseph Family', type: 'Confirmation', member: 'Mary Joseph', requestedOn: 'May 28', purpose: 'Marriage', status: 'pending' },
  { id: 'c3', family: 'Maria Family', type: 'Marriage', member: 'John & Sarah', requestedOn: 'May 20', purpose: 'Government', status: 'approved' },
  { id: 'c4', family: 'Peter Family', type: 'Death', member: 'Peter Sr.', requestedOn: 'May 15', purpose: 'Legal', status: 'rejected' },
];

const STATUS_MAP: Record<string, 'success' | 'warning' | 'error'> = {
  approved: 'success', pending: 'warning', rejected: 'error',
};

export default function AdminCertificatesScreen() {
  const navigation = useNavigation<any>();
  const [certs, setCerts] = useState(CERTS);

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    Alert.alert(
      action === 'approve' ? 'Approve Certificate?' : 'Reject Request?',
      `This will ${action} the certificate request.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: action === 'approve' ? 'Approve' : 'Reject',
          style: action === 'reject' ? 'destructive' : 'default',
          onPress: () => setCerts(prev =>
            prev.map(c => c.id === id ? { ...c, status: action === 'approve' ? 'approved' : 'rejected' } : c)),
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
        <Text style={styles.headerTitle}>
          Certificates · {certs.filter(c => c.status === 'pending').length} pending
        </Text>
        <View style={{ width: 32 }} />
      </View>

      <FlatList
        data={certs}
        keyExtractor={c => c.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardTop}>
              <View>
                <Text style={styles.certType}>{item.type} Certificate</Text>
                <Text style={styles.certMember}>{item.member}</Text>
                <Text style={styles.certFamily}>{item.family} · {item.requestedOn}</Text>
                <Text style={styles.purpose}>Purpose: {item.purpose}</Text>
              </View>
              <Badge label={item.status} variant={STATUS_MAP[item.status]} />
            </View>
            {item.status === 'pending' && (
              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.approveBtn}
                  onPress={() => handleAction(item.id, 'approve')}>
                  <Text style={styles.approveBtnText}><MaterialCommunityIcons name="check" size={13} /> Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.rejectBtn}
                  onPress={() => handleAction(item.id, 'reject')}>
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
  headerTitle: { flex: 1, color: Colors.neutral.white, fontSize: 16, fontWeight: '700' },
  list: { padding: Spacing.screen },
  card: {
    backgroundColor: Colors.neutral.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.sm },
  certType: { fontSize: 15, fontWeight: '700', color: Colors.primary.navy },
  certMember: { fontSize: 14, color: Colors.neutral.gray700, marginTop: 2 },
  certFamily: { fontSize: 12, color: Colors.neutral.gray400, marginTop: 2 },
  purpose: { fontSize: 12, color: Colors.neutral.gray400, marginTop: 2 },
  actionsRow: { flexDirection: 'row', gap: Spacing.sm },
  approveBtn: {
    flex: 1,
    backgroundColor: Colors.semantic.success + '20',
    borderRadius: Radius.md,
    padding: Spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.semantic.success,
  },
  approveBtnText: { color: Colors.semantic.success, fontWeight: '700', fontSize: 13 },
  rejectBtn: {
    flex: 1,
    backgroundColor: Colors.semantic.error + '15',
    borderRadius: Radius.md,
    padding: Spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.semantic.error,
  },
  rejectBtnText: { color: Colors.semantic.error, fontWeight: '700', fontSize: 13 },
});
