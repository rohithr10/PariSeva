import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  StatusBar, TouchableOpacity, TextInput, Alert, Modal,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import Button from '../../components/common/Button/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

const ANNOUNCEMENTS = [
  { id: 'a1', title: 'Sunday Mass Change', content: 'Sunday 9:30 AM Mass moved to 10:00 AM this week.', priority: 'high', date: 'Jun 5' },
  { id: 'a2', title: 'Youth Annual Sports Day', content: 'Youth Annual Sports Day on June 22. Register before June 18.', priority: 'normal', date: 'Jun 3' },
  { id: 'a3', title: 'Parish Meeting', content: 'Monthly parish council meeting on June 10 at 7 PM.', priority: 'normal', date: 'Jun 1' },
];

export default function AdminAnnouncementsScreen() {
  const navigation = useNavigation<any>();
  const [announcements, setAnnouncements] = useState(ANNOUNCEMENTS);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<'high' | 'normal'>('normal');
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!title || !content) return;
    setLoading(true);
    await new Promise<void>(r => setTimeout(r, 800));
    setLoading(false);
    const newAnn = { id: `a${Date.now()}`, title, content, priority, date: 'Just now' };
    setAnnouncements(prev => [newAnn, ...prev]);
    setShowModal(false);
    setTitle(''); setContent(''); setPriority('normal');
  };

  const deleteAnn = (id: string) => {
    Alert.alert('Delete', 'Delete this announcement?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setAnnouncements(p => p.filter(a => a.id !== id)) },
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
        <Text style={styles.headerTitle}>Announcements</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setShowModal(true)}>
          <Text style={styles.addBtnText}>+ Post</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={announcements}
        keyExtractor={a => a.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={[styles.card, item.priority === 'high' && styles.cardHigh]}>
            <View style={styles.cardTop}>
              <View style={styles.cardLeft}>
                <Text style={styles.annTitle}>{item.title}</Text>
                <Text style={styles.annContent} numberOfLines={2}>{item.content}</Text>
                <Text style={styles.annDate}>{item.date}</Text>
              </View>
              <TouchableOpacity onPress={() => deleteAnn(item.id)}>
                <MaterialCommunityIcons name="trash-can-outline" style={styles.deleteIcon} />
              </TouchableOpacity>
            </View>
            {item.priority === 'high' && (
              <View style={styles.highPriorityBadge}>
                <Text style={styles.highPriorityText}><MaterialCommunityIcons name="alert-outline" size={13} /> High Priority</Text>
              </View>
            )}
          </View>
        )}
      />

      {/* Post Modal */}
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Post Announcement</Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Title..."
                placeholderTextColor={Colors.neutral.gray400}
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                value={content}
                onChangeText={setContent}
                placeholder="Content..."
                placeholderTextColor={Colors.neutral.gray400}
                multiline
              />
              <View style={styles.priorityRow}>
                <Text style={styles.priorityLabel}>Priority:</Text>
                {(['normal', 'high'] as const).map(p => (
                  <TouchableOpacity
                    key={p}
                    style={[styles.priorityPill, priority === p && styles.priorityPillActive]}
                    onPress={() => setPriority(p)}>
                    <Text style={[styles.priorityText, priority === p && styles.priorityTextActive]}>
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.modalActions}>
                <Button title="Cancel" variant="ghost" onPress={() => setShowModal(false)} style={{ flex: 1 }} />
                <Button title="Post" onPress={handlePost} loading={loading} style={{ flex: 1 }} />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
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
    backgroundColor: Colors.neutral.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
  },
  cardHigh: { borderLeftWidth: 3, borderLeftColor: Colors.accent.gold },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between' },
  cardLeft: { flex: 1, marginRight: Spacing.sm },
  annTitle: { fontSize: 15, fontWeight: '700', color: Colors.primary.navy, marginBottom: 4 },
  annContent: { fontSize: 13, color: Colors.neutral.gray500, lineHeight: 20 },
  annDate: { fontSize: 11, color: Colors.neutral.gray400, marginTop: 4 },
  deleteIcon: { fontSize: 18 , color: Colors.semantic.error},
  highPriorityBadge: {
    marginTop: Spacing.sm,
    backgroundColor: Colors.accent.goldPale,
    borderRadius: Radius.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  highPriorityText: { fontSize: 11, color: Colors.accent.goldDark, fontWeight: '700' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.neutral.white,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    padding: Spacing.lg,
  },
  modalTitle: { fontSize: 18, fontWeight: '700', color: Colors.primary.navy, marginBottom: Spacing.lg },
  input: {
    backgroundColor: Colors.neutral.warmWhite,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
    padding: Spacing.md,
    fontSize: 14,
    color: Colors.neutral.gray800,
    marginBottom: Spacing.md,
  },
  textArea: { height: 80, textAlignVertical: 'top' },
  priorityRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.lg },
  priorityLabel: { fontSize: 14, fontWeight: '600', color: Colors.primary.navy },
  priorityPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.neutral.gray200,
  },
  priorityPillActive: { backgroundColor: Colors.accent.gold, borderColor: Colors.accent.gold },
  priorityText: { fontSize: 13, color: Colors.neutral.gray500 },
  priorityTextActive: { color: Colors.neutral.white, fontWeight: '700' },
  modalActions: { flexDirection: 'row', gap: Spacing.sm },
});
