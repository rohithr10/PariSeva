import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  StatusBar, TouchableOpacity, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Spacing, Radius } from '../../constants/spacing';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

const RELATIONS = ['Spouse', 'Son', 'Daughter', 'Father', 'Mother', 'Sibling', 'Other'];
const GENDERS = ['Male', 'Female'];

export default function AddMemberScreen() {
  const navigation = useNavigation<any>();
  const [form, setForm] = useState({
    firstName: '', lastName: '', relation: '', dob: '',
    gender: '', phone: '', occupation: '',
  });
  const [loading, setLoading] = useState(false);
  const update = (key: keyof typeof form) => (val: string) => setForm(p => ({ ...p, [key]: val }));

  const handleSave = async () => {
    setLoading(true);
    await new Promise<void>(r => setTimeout(r, 1000));
    setLoading(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TopSafeArea color={Colors.neutral.white} />
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Member</Text>
        <View style={{ width: 32 }} />
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.row}>
            <Input label="First Name" value={form.firstName} onChangeText={update('firstName')}
              placeholder="First" containerStyle={styles.half} />
            <Input label="Last Name" value={form.lastName} onChangeText={update('lastName')}
              placeholder="Last" containerStyle={styles.half} />
          </View>

          <Text style={styles.label}>Relationship</Text>
          <View style={styles.pillRow}>
            {RELATIONS.map(r => (
              <TouchableOpacity
                key={r}
                style={[styles.pill, form.relation === r && styles.pillActive]}
                onPress={() => update('relation')(r)}>
                <Text style={[styles.pillText, form.relation === r && styles.pillTextActive]}>{r}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Gender</Text>
          <View style={styles.pillRow}>
            {GENDERS.map(g => (
              <TouchableOpacity
                key={g}
                style={[styles.pill, form.gender === g && styles.pillActive]}
                onPress={() => update('gender')(g)}>
                <Text style={[styles.pillText, form.gender === g && styles.pillTextActive]}>{g}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Input label="Date of Birth" value={form.dob} onChangeText={update('dob')}
            placeholder="DD/MM/YYYY" keyboardType="numeric" />
          <Input label="Mobile (Optional)" value={form.phone} onChangeText={update('phone')}
            placeholder="10-digit mobile" keyboardType="phone-pad"
            leftIcon={<Text style={styles.prefix}>+91</Text>} />
          <Input label="Occupation" value={form.occupation} onChangeText={update('occupation')}
            placeholder="e.g. Student, Engineer..." />

          <Button title="Save Member" onPress={handleSave} loading={loading} fullWidth size="lg" style={styles.saveBtn} />
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
  row: { flexDirection: 'row', gap: Spacing.sm },
  half: { flex: 1 },
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
  prefix: { fontSize: 14, fontWeight: '600', color: Colors.neutral.gray600 },
  saveBtn: { marginTop: Spacing.lg },
});
