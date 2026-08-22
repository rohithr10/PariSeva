import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  StatusBar, TouchableOpacity, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

const TIMINGS = [
  { id: '1', title: 'Tamil Mass', day: 'Sunday', time: '06:00 AM', language: 'Tamil', venue: 'Main Church', isActive: true },
  { id: '2', title: 'English Mass', day: 'Sunday', time: '07:30 AM', language: 'English', venue: 'Main Church', isActive: true },
  { id: '3', title: 'Morning Mass', day: 'Weekdays', time: '06:30 AM', language: 'Bilingual', venue: 'Chapel', isActive: true },
  { id: '4', title: 'Evening Mass', day: 'Weekdays', time: '06:30 PM', language: 'Bilingual', venue: 'Main Church', isActive: false },
];

export default function AdminMassScreen() {
  const navigation = useNavigation<any>();
  const [timings, setTimings] = useState(TIMINGS);

  const toggleActive = (id: string) => {
    setTimings(prev => prev.map(t => t.id === id ? { ...t, isActive: !t.isActive } : t));
  };

  const deleteEntry = (id: string) => {
    Alert.alert('Delete Mass Timing', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setTimings(prev => prev.filter(t => t.id !== id)) },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <TopSafeArea color={Colors.primary.navy} />
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary.navyDark} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mass Schedule</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.addBtnText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={timings}
        keyExtractor={t => t.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={[styles.card, !item.isActive && styles.cardInactive]}>
            <View style={styles.cardLeft}>
              <Text style={styles.massTitle}>{item.title}</Text>
              <Text style={styles.massMeta}>{item.day} · {item.time}</Text>
              <Text style={styles.massVenue}><MaterialCommunityIcons name="map-marker-outline" size={13} /> {item.venue}  ·  <MaterialCommunityIcons name="account-voice" size={13} /> {item.language}</Text>
            </View>
            <View style={styles.cardActions}>
              <TouchableOpacity
                style={[styles.toggleBtn, item.isActive ? styles.toggleOn : styles.toggleOff]}
                onPress={() => toggleActive(item.id)}>
                <Text style={styles.toggleText}>{item.isActive ? 'Active' : 'Off'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteEntry(item.id)} style={styles.deleteBtn}>
                <MaterialCommunityIcons name="trash-can-outline" style={styles.deleteIcon} />
              </TouchableOpacity>
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
  addBtn: { backgroundColor: Colors.accent.gold, borderRadius: Radius.full, paddingHorizontal: 14, paddingVertical: 6 },
  addBtnText: { color: Colors.neutral.white, fontWeight: '700', fontSize: 13 },
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
  cardInactive: { opacity: 0.6 },
  cardLeft: { flex: 1 },
  massTitle: { fontSize: 15, fontWeight: '700', color: Colors.primary.navy },
  massMeta: { fontSize: 13, color: Colors.neutral.gray500, marginTop: 2 },
  massVenue: { fontSize: 12, color: Colors.neutral.gray400, marginTop: 2 },
  cardActions: { alignItems: 'flex-end', gap: Spacing.xs },
  toggleBtn: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: Radius.full },
  toggleOn: { backgroundColor: Colors.semantic.success + '20', borderWidth: 1, borderColor: Colors.semantic.success },
  toggleOff: { backgroundColor: Colors.neutral.gray100, borderWidth: 1, borderColor: Colors.neutral.gray300 },
  toggleText: { fontSize: 11, fontWeight: '700', color: Colors.semantic.success },
  deleteBtn: { padding: 4 },
  deleteIcon: { fontSize: 18 , color: Colors.semantic.error},
});
