import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  StatusBar, TouchableOpacity, Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { selectUser, updateLanguage } from '../../store/slices/auth.slice';
import { setAppLanguage, type AppLanguage } from '../../i18n';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

export default function SettingsScreen() {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { t, i18n } = useTranslation();

  const [notifMass, setNotifMass] = useState(true);
  const [notifDonations, setNotifDonations] = useState(true);
  const [notifAnnouncements, setNotifAnnouncements] = useState(true);
  const [notifCertificates, setNotifCertificates] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const currentLang = (i18n.language as AppLanguage) ?? 'en';

  const toggleLang = (lang: AppLanguage) => {
    dispatch(updateLanguage(lang));
    setAppLanguage(lang);
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <TopSafeArea color={Colors.neutral.white} />
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('profile.settings')}</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Language */}
        <Text style={styles.sectionTitle}>{t('profile.language')}</Text>
        <View style={styles.card}>
          <View style={styles.langRow}>
            <TouchableOpacity
              style={[styles.langBtn, currentLang === 'en' && styles.langBtnActive]}
              onPress={() => toggleLang('en')}>
              <Text style={[styles.langBtnText, currentLang === 'en' && styles.langBtnTextActive]}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.langBtn, currentLang === 'ta' && styles.langBtnActive]}
              onPress={() => toggleLang('ta')}>
              <Text style={[styles.langBtnText, currentLang === 'ta' && styles.langBtnTextActive]}>தமிழ்</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notifications */}
        <Text style={styles.sectionTitle}>{t('profile.notifications')}</Text>
        <View style={styles.card}>
          {[
            { label: t('profile.notification_mass'), value: notifMass, setter: setNotifMass },
            { label: t('profile.notification_donations'), value: notifDonations, setter: setNotifDonations },
            { label: t('profile.notification_announcements'), value: notifAnnouncements, setter: setNotifAnnouncements },
            { label: t('profile.notification_certificates'), value: notifCertificates, setter: setNotifCertificates },
          ].map((item, i, arr) => (
            <View key={i} style={[styles.switchRow, i < arr.length - 1 && styles.switchRowBorder]}>
              <Text style={styles.switchLabel}>{item.label}</Text>
              <Switch
                value={item.value}
                onValueChange={item.setter}
                trackColor={{ false: Colors.neutral.gray200, true: Colors.accent.gold }}
                thumbColor={Colors.neutral.white}
              />
            </View>
          ))}
        </View>

        {/* Display */}
        <Text style={styles.sectionTitle}>{t('profile.display')}</Text>
        <View style={styles.card}>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>{t('profile.dark_mode')}</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: Colors.neutral.gray200, true: Colors.accent.gold }}
              thumbColor={Colors.neutral.white}
            />
          </View>
        </View>

        {/* Account */}
        <Text style={styles.sectionTitle}>{t('profile.account')}</Text>
        <View style={styles.card}>
          {[
            { icon: 'lock-outline', label: t('profile.change_password') },
            { icon: 'phone-outline', label: t('profile.update_mobile') },
            { icon: 'email-outline', label: t('profile.update_email') },
            { icon: 'trash-can-outline', label: t('profile.delete_account'), danger: true },
          ].map((item, i, arr) => (
            <TouchableOpacity
              key={i}
              style={[styles.menuRow, i < arr.length - 1 && styles.menuRowBorder]}>
              <MaterialCommunityIcons name={item.icon} style={styles.menuIcon} />
              <Text style={[styles.menuLabel, item.danger && styles.menuLabelDanger]}>{item.label}</Text>
              <MaterialCommunityIcons name="chevron-right" style={styles.menuArrow} />
            </TouchableOpacity>
          ))}
        </View>

        {/* About */}
        <Text style={styles.sectionTitle}>{t('profile.about_section')}</Text>
        <View style={styles.card}>
          {[
            { label: t('profile.app_version'), value: '1.0.0' },
            { label: t('profile.privacy_policy'), value: '›' },
            { label: t('profile.terms'), value: '›' },
            { label: t('profile.contact_support'), value: '›' },
          ].map((item, i, arr) => (
            <View key={i} style={[styles.aboutRow, i < arr.length - 1 && styles.switchRowBorder]}>
              <Text style={styles.aboutLabel}>{item.label}</Text>
              <Text style={styles.aboutValue}>{item.value}</Text>
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
  sectionTitle: { fontSize: 13, fontWeight: '700', color: Colors.neutral.gray400, letterSpacing: 0.5, marginBottom: Spacing.sm, marginTop: Spacing.md, textTransform: 'uppercase' },
  card: { backgroundColor: Colors.neutral.white, borderRadius: Radius.lg, marginBottom: Spacing.sm, overflow: 'hidden', ...Shadow.sm },
  langRow: { flexDirection: 'row', padding: Spacing.sm, gap: Spacing.sm },
  langBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: Radius.md,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.neutral.gray200,
  },
  langBtnActive: { backgroundColor: Colors.accent.gold, borderColor: Colors.accent.gold },
  langBtnText: { fontSize: 14, fontWeight: '600', color: Colors.neutral.gray500 },
  langBtnTextActive: { color: Colors.neutral.white },
  switchRow: { flexDirection: 'row', alignItems: 'center', padding: Spacing.md },
  switchRowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.neutral.gray100 },
  switchLabel: { flex: 1, fontSize: 15, color: Colors.neutral.gray800 },
  menuRow: { flexDirection: 'row', alignItems: 'center', padding: Spacing.md },
  menuRowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.neutral.gray100 },
  menuIcon: { fontSize: 20, marginRight: Spacing.md , color: Colors.primary.navy},
  menuLabel: { flex: 1, fontSize: 15, color: Colors.neutral.gray800 },
  menuLabelDanger: { color: Colors.semantic.error },
  menuArrow: { fontSize: 20, color: Colors.neutral.gray300 },
  aboutRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: Spacing.md },
  aboutLabel: { fontSize: 15, color: Colors.neutral.gray800 },
  aboutValue: { fontSize: 14, color: Colors.neutral.gray400 },
});
