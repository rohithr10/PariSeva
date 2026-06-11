import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

export default function BibleNotesScreen() {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TopSafeArea color={Colors.neutral.white} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><MaterialCommunityIcons name="arrow-left" style={styles.back} /></TouchableOpacity>
        <Text style={styles.title}>Bible Notes</Text>
        <View style={{ width: 32 }} />
      </View>
      <View style={styles.empty}>
        <MaterialCommunityIcons name="note-edit-outline" style={styles.icon} />
        <Text style={styles.emptyTitle}>No Notes Yet</Text>
        <Text style={styles.emptyText}>Your Bible notes will appear here.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral.warmWhite },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.screen, paddingVertical: 14, backgroundColor: Colors.neutral.white, borderBottomWidth: 1, borderBottomColor: Colors.neutral.gray200 },
  back: { fontSize: 22, color: Colors.primary.navy },
  title: { fontSize: 18, fontWeight: '700', color: Colors.primary.navy },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 64, marginBottom: 16 , color: Colors.primary.navy},
  emptyTitle: { fontSize: 20, fontWeight: '700', color: Colors.primary.navy, marginBottom: 8 },
  emptyText: { fontSize: 14, color: Colors.neutral.gray500 },
});
