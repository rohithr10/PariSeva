import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import { authApi } from '../../api/auth.api';
import { getApiErrorMessage } from '../../api/client';
import type { AuthStackParamList } from '../../navigation/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

type Props = NativeStackScreenProps<AuthStackParamList, typeof Routes.ForgotPassword>;

export default function ForgotPasswordScreen({ navigation }: Props) {
  const [step, setStep] = useState<'phone' | 'reset'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const sendOtp = async () => {
    if (!phone || phone.length < 10) {
      setError('Enter a valid 10-digit mobile number');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await authApi.forgotPassword(phone);
      setInfo('OTP sent to your number');
      setStep('reset');
    } catch (err) {
      setError(getApiErrorMessage(err, 'Could not send OTP'));
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    if (otp.length < 4) {
      setError('Enter the OTP you received');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await authApi.resetPassword({ phone, otp, newPassword });
      navigation.navigate(Routes.Login, {});
    } catch (err) {
      setError(getApiErrorMessage(err, 'Could not reset password'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <TopSafeArea color={Colors.neutral.warmWhite} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={styles.content}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <MaterialCommunityIcons name="arrow-left" style={styles.backText} />
          </TouchableOpacity>
          <MaterialCommunityIcons name="lock-reset" style={styles.icon} />
          <Text style={styles.title}>Reset Password</Text>

          {step === 'phone' ? (
            <>
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
              {error ? <Text style={styles.error}>{error}</Text> : null}
              <Button title="Send OTP" onPress={sendOtp} loading={loading} fullWidth size="lg" />
            </>
          ) : (
            <>
              <Text style={styles.subtitle}>
                Enter the OTP sent to +91 {phone} and choose a new password.
              </Text>
              {info ? <Text style={styles.info}>{info}</Text> : null}
              <Input
                label="OTP"
                value={otp}
                onChangeText={setOtp}
                placeholder="6-digit code"
                keyboardType="number-pad"
                maxLength={6}
              />
              <Input
                label="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="At least 6 characters"
                secureTextEntry
                autoCapitalize="none"
              />
              {error ? <Text style={styles.error}>{error}</Text> : null}
              <Button title="Reset Password" onPress={resetPassword} loading={loading} fullWidth size="lg" />
              <TouchableOpacity onPress={sendOtp} style={styles.resend}>
                <Text style={styles.resendText}>Resend OTP</Text>
              </TouchableOpacity>
            </>
          )}
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
  icon: { fontSize: 48, marginBottom: Spacing.lg, textAlign: 'center', color: Colors.primary.navy },
  title: { fontSize: 26, fontWeight: '700', color: Colors.primary.navy, marginBottom: Spacing.sm, textAlign: 'center' },
  subtitle: { fontSize: 15, color: Colors.neutral.gray500, lineHeight: 24, textAlign: 'center', marginBottom: Spacing.xl },
  prefix: { fontSize: 14, fontWeight: '600', color: Colors.neutral.gray600 },
  error: { color: Colors.semantic.error, fontSize: 13, marginBottom: Spacing.md, textAlign: 'center' },
  info: { color: Colors.semantic.success, fontSize: 13, marginBottom: Spacing.md, textAlign: 'center' },
  resend: { alignItems: 'center', marginTop: Spacing.lg },
  resendText: { color: Colors.sky.blue, fontSize: 14, fontWeight: '600' },
});
