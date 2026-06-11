import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import type { AuthStackParamList } from '../../navigation/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

type Props = NativeStackScreenProps<AuthStackParamList, typeof Routes.ForgotPassword>;

export default function ForgotPasswordScreen({ navigation }: Props) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!phone || phone.length < 10) return;
    setLoading(true);
    await new Promise<void>(r => setTimeout(r, 800));
    navigation.navigate(Routes.OTPVerification, { phone, purpose: 'reset' });
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <TopSafeArea color={Colors.neutral.warmWhite} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={styles.content}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <MaterialCommunityIcons name="arrow-left" style={styles.backText} />
          </TouchableOpacity>
          <MaterialCommunityIcons name="lock-outline" style={styles.icon} />
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Enter your registered mobile number and we'll send you an OTP to reset your password.
          </Text>
          <Input
            label="Mobile Number"
            value={phone}
            onChangeText={setPhone}
            placeholder="10-digit mobile number"
            keyboardType="phone-pad"
            autoCapitalize="none"
            maxLength={10}
            leftIcon={<Text style={styles.prefix}>+91</Text>}
          />
          <Button title="Send OTP" onPress={handleSubmit} loading={loading} fullWidth size="lg" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral.warmWhite },
  content: { flex: 1, padding: Spacing.screen, paddingTop: Spacing.xxl },
  backBtn: { marginBottom: Spacing.xl },
  backText: { fontSize: 22, color: Colors.primary.navy },
  icon: { fontSize: 48, marginBottom: Spacing.lg, textAlign: 'center' , color: Colors.primary.navy},
  title: { fontSize: 26, fontWeight: '700', color: Colors.primary.navy, marginBottom: Spacing.sm, textAlign: 'center' },
  subtitle: { fontSize: 15, color: Colors.neutral.gray500, lineHeight: 24, textAlign: 'center', marginBottom: Spacing.xl },
  prefix: { fontSize: 14, fontWeight: '600', color: Colors.neutral.gray600 },
});
