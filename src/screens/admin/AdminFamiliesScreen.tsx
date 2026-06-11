import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  StatusBar, TouchableOpacity, TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

const FAMILIES = [
  { id: 'f1', name: 'Thomas Family', head: 'Thomas Raj', phone: '+91 98765 43210', area: 'Mylapore', members: 4, status: 'active' },
  { id: 'f2', name: 'Joseph Family', head: 'Joseph Anthony', phone: '+91 98765 11110', area: 'Triplicane', members: 5, status: 'active' },
  { id: 'f3', name: 'Maria Family', head: 'Maria Selvam', phone: '+91 98765 22220', area: 'Royapuram', members: 3, status: 'active' },
  { id: 'f4', name: 'Peter Family', head: 'Peter Raj', phone: '+91 98765 33330', area: 'Nungambakkam', members: 6, status: 'inactive' },
  { id: 'f5', name: 'Paul Family', head: 'Paul Xavier', phone: '+91 98765 44440', area: 'Kodambakkam', members: 2, status: 'active' },
];

export default function AdminFamiliesScreen() {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');

  const filtered = FAMILIES.filter(f =>
    !search || f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.head.toLowerCase().includes(search.toLowerCase()));

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <TopSafeArea color={Colors.primary.navy} />
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary.navyDark} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Families ({FAMILIES.length})</Text>
        <TouchableOpacity style={styles.exportBtn}>
          <Text style={styles.exportText}>Export</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <MaterialCommunityIcons name="magnify" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Search by name or head..."
          placeholderTextColor={Colors.neutral.gray400}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={f => f.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{item.name[0]}</Text>
            </View>
            <View style={styles.info}>
              <View style={styles.nameRow}>
                <Text style={styles.familyName}>{item.name}</Text>
                <View style={[styles.statusDot, item.status === 'active' ? styles.dotGreen : styles.dotGray]} />
              </View>
              <Text style={styles.head}>{item.head}</Text>
              <Text style={styles.meta}><MaterialCommunityIcons name="map-marker-outline" size={13} /> {item.area}  ·  <MaterialCommunityIcons name="account-group-outline" size={13} /> {item.members} members</Text>
              <Text style={styles.phone}><MaterialCommunityIcons name="phone-outline" size={13} /> {item.phone}</Text>
            </View>
          </TouchableOpacity>
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
  exportBtn: { borderWidth: 1, borderColor: Colors.neutral.white, borderRadius: Radius.full, paddingHorizontal: 12, paddingVertical: 5 },
  exportText: { color: Colors.neutral.white, fontSize: 12 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.white,
    margin: Spacing.screen,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    ...Shadow.sm,
  },
  searchIcon: { fontSize: 16, marginRight: Spacing.xs , color: Colors.neutral.gray400},
  searchInput: { flex: 1, paddingVertical: 10, fontSize: 14, color: Colors.neutral.gray800 },
  list: { paddingHorizontal: Spacing.screen, paddingBottom: 24 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary.navy,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  avatarText: { color: Colors.neutral.white, fontSize: 18, fontWeight: '700' },
  info: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 },
  familyName: { fontSize: 15, fontWeight: '700', color: Colors.primary.navy },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  dotGreen: { backgroundColor: Colors.semantic.success },
  dotGray: { backgroundColor: Colors.neutral.gray300 },
  head: { fontSize: 13, color: Colors.neutral.gray600 },
  meta: { fontSize: 12, color: Colors.neutral.gray400, marginTop: 2 },
  phone: { fontSize: 12, color: Colors.neutral.gray400, marginTop: 1 },
});
