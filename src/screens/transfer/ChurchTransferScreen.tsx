import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  StatusBar, TouchableOpacity, KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

const REASONS = ['Relocation', 'Work Transfer', 'Marriage', 'Family Preference', 'Distance', 'Other'];

export default function ChurchTransferScreen() {
  const navigation = useNavigation<any>();
  const [toChurch, setToChurch] = useState('');
  const [reason, setReason] = useState('');
  const [remarks, setRemarks] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!toChurch || !reason) {
      Alert.alert('Missing Fields', 'Please fill all required fields.');
      return;
    }
    setLoading(true);
    await new Promise<void>(r => setTimeout(r, 1200));
    setLoading(false);
    Alert.alert(
      'Transfer Request Submitted',
      'Your request has been submitted to the parish office. You will receive a notification once it is processed (5–7 working days).',
      [{ text: 'OK', onPress: () => navigation.goBack() }],
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TopSafeArea color={Colors.neutral.white} />
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Church Transfer</Text>
        <View style={{ width: 32 }} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}><MaterialCommunityIcons name="information-outline" size={14} /> Transfer Information</Text>
            <Text style={styles.infoText}>
              A church transfer allows your family to move their membership to another parish. This requires approval from both parishes.
            </Text>
          </View>

          <View style={styles.fromCard}>
            <Text style={styles.fromLabel}>FROM (Current Parish)</Text>
            <Text style={styles.fromChurch}><MaterialCommunityIcons name="church" size={13} /> St. Mary's Basilica, Chennai</Text>
          </View>

          <Input
            label="To Church / Parish *"
            value={toChurch}
            onChangeText={setToChurch}
            placeholder="e.g. Santhome Cathedral, Mylapore"
          />

          <Text style={styles.label}>Reason for Transfer *</Text>
          <View style={styles.pillRow}>
            {REASONS.map(r => (
              <TouchableOpacity
                key={r}
                style={[styles.pill, reason === r && styles.pillActive]}
                onPress={() => setReason(r)}>
                <Text style={[styles.pillText, reason === r && styles.pillTextActive]}>{r}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Input
            label="Additional Details"
            value={remarks}
            onChangeText={setRemarks}
            placeholder="Any additional information..."
            multiline
          />

          <View style={styles.noteCard}>
            <Text style={styles.noteText}>
              All sacrament records will be transferred to the new parish. This process takes 5–7 working days.
            </Text>
          </View>

          <Button title="Submit Transfer Request" onPress={handleSubmit} loading={loading} fullWidth size="lg" style={styles.btn} />
          <View style={{ height: 32 }} />
        </ScrollView>
      </KeyboardAvoidingView>
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
    backgroundColor: Colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  backIcon: { color: Colors.primary.navy, fontSize: 22 },
  headerTitle: { color: Colors.primary.navy, fontSize: 18, fontWeight: '700' },
  scroll: { padding: Spacing.screen },
  infoCard: {
    backgroundColor: Colors.sky.bluePale,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  infoTitle: { fontSize: 14, fontWeight: '700', color: Colors.primary.navy, marginBottom: 6 },
  infoText: { fontSize: 13, color: Colors.neutral.gray600, lineHeight: 20 },
  fromCard: {
    backgroundColor: Colors.neutral.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    ...Shadow.sm,
  },
  fromLabel: { fontSize: 11, color: Colors.neutral.gray400, letterSpacing: 0.5, marginBottom: 4 },
  fromChurch: { fontSize: 15, fontWeight: '700', color: Colors.primary.navy },
  label: { fontSize: 14, fontWeight: '600', color: Colors.primary.navy, marginBottom: Spacing.sm, marginTop: Spacing.sm },
  pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs, marginBottom: Spacing.md },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.full,
    backgroundColor: Colors.neutral.white,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  pillActive: { backgroundColor: Colors.accent.gold, borderColor: Colors.accent.gold },
  pillText: { fontSize: 13, color: Colors.neutral.gray500 },
  pillTextActive: { color: Colors.neutral.white, fontWeight: '700' },
  noteCard: {
    backgroundColor: Colors.accent.goldPale,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.accent.gold,
  },
  noteText: { fontSize: 13, color: Colors.neutral.gray600, lineHeight: 20 },
  btn: { marginTop: Spacing.sm },
});
