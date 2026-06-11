import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

const CONTACTS = [
  { icon: 'phone-outline', label: 'Parish Phone', value: '+91 44 2534 1234', action: () => Linking.openURL('tel:+914425341234') },
  { icon: 'email-outline', label: 'Email', value: 'office@stmarysbasilica.com', action: () => Linking.openURL('mailto:office@stmarysbasilica.com') },
  { icon: 'map-marker-outline', label: 'Address', value: 'Sannidhi Street, George Town, Chennai — 600 001', action: null },
  { icon: 'clock-outline', label: 'Office Hours', value: 'Mon–Sat: 9:00 AM – 5:00 PM', action: null },
];

const PRIESTS = [
  { name: 'Fr. Thomas Raj', role: 'Parish Priest', initial: 'T' },
  { name: 'Fr. Anthony Samy', role: 'Assistant Priest', initial: 'A' },
  { name: 'Fr. Joseph Xavier', role: 'Deacon', initial: 'J' },
];

export default function ContactScreen() {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <TopSafeArea color={Colors.primary.navy} />
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary.navyDark} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><MaterialCommunityIcons name="arrow-left" style={styles.backIcon} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Church</Text>
        <View style={{ width: 32 }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.churchBanner}>
          <MaterialCommunityIcons name="church" style={styles.churchIcon} />
          <Text style={styles.churchName}>St. Mary's Basilica</Text>
          <Text style={styles.churchTA}>செயின்ட் மேரீஸ் பசிலிகா</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Details</Text>
          <View style={styles.card}>
            {CONTACTS.map((c, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.contactRow, i < CONTACTS.length - 1 && styles.rowBorder]}
                onPress={c.action ?? undefined}
                disabled={!c.action}>
                <MaterialCommunityIcons name={c.icon} style={styles.contactIcon} />
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>{c.label}</Text>
                  <Text style={[styles.contactValue, c.action && styles.contactValueLink]}>{c.value}</Text>
                </View>
                {c.action && <MaterialCommunityIcons name="chevron-right" style={styles.rowArrow} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Parish Clergy</Text>
          {PRIESTS.map((p, i) => (
            <View key={i} style={styles.priestCard}>
              <View style={styles.priestAvatar}><Text style={styles.priestAvatarText}>{p.initial}</Text></View>
              <View>
                <Text style={styles.priestName}>{p.name}</Text>
                <Text style={styles.priestRole}>{p.role}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral.warmWhite },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primary.navy, paddingHorizontal: Spacing.screen, paddingVertical: 14 },
  backIcon: { color: Colors.neutral.white, fontSize: 22, marginRight: Spacing.md },
  headerTitle: { flex: 1, color: Colors.neutral.white, fontSize: 18, fontWeight: '700' },
  churchBanner: { backgroundColor: Colors.primary.navyLight, padding: Spacing.xl, alignItems: 'center' },
  churchIcon: { fontSize: 48, marginBottom: Spacing.sm , color: Colors.accent.gold},
  churchName: { color: Colors.neutral.white, fontSize: 20, fontWeight: '700' },
  churchTA: { color: Colors.accent.gold, fontSize: 15, marginTop: 4 },
  section: { padding: Spacing.screen },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.primary.navy, marginBottom: Spacing.sm },
  card: { backgroundColor: Colors.neutral.white, borderRadius: Radius.lg, overflow: 'hidden', ...Shadow.sm },
  contactRow: { flexDirection: 'row', alignItems: 'center', padding: Spacing.md },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.neutral.gray100 },
  contactIcon: { fontSize: 22, marginRight: Spacing.md , color: Colors.primary.navy},
  contactInfo: { flex: 1 },
  contactLabel: { fontSize: 11, color: Colors.neutral.gray400, marginBottom: 2 },
  contactValue: { fontSize: 14, color: Colors.neutral.gray800 },
  contactValueLink: { color: Colors.sky.blue },
  rowArrow: { fontSize: 22, color: Colors.neutral.gray300 },
  priestCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.neutral.white, borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.sm, ...Shadow.sm },
  priestAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.primary.navy, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  priestAvatarText: { color: Colors.neutral.white, fontWeight: '700', fontSize: 18 },
  priestName: { fontSize: 15, fontWeight: '600', color: Colors.primary.navy },
  priestRole: { fontSize: 13, color: Colors.neutral.gray400, marginTop: 2 },
});
