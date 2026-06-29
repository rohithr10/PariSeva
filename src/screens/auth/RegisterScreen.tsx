import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors } from '../../constants/colors';
import { Spacing, Radius } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import { authApi } from '../../api/auth.api';
import { getApiErrorMessage } from '../../api/client';
import type { AuthStackParamList } from '../../navigation/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

type Props = NativeStackScreenProps<AuthStackParamList, typeof Routes.Register>;

const STEPS = ['Family Info', 'Church Details', 'Password'];

export default function RegisterScreen({ navigation, route }: Props) {
  const church = route.params?.church;
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    familyName: '',
    address: '',
    city: '',
    pincode: '',
    password: '',
    confirmPassword: '',
  });

  const update = (key: keyof typeof form) => (val: string) =>
    setForm(prev => ({ ...prev, [key]: val }));

  const nextStep = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else handleRegister();
  };

  const handleRegister = async () => {
    if (!church?._id) {
      setSubmitError('Please select your church first.');
      return;
    }
    setLoading(true);
    setSubmitError('');
    try {
      await authApi.register({
        phone: form.phone,
        password: form.password,
        familyName: form.familyName,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email || undefined,
        churchId: church._id,
        address: { street: form.address, city: form.city, pincode: form.pincode },
      });
      // Account created (unverified). Verify via OTP to finish + log in.
      navigation.navigate(Routes.OTPVerification, { phone: form.phone, purpose: 'register' });
    } catch (err) {
      setSubmitError(getApiErrorMessage(err, 'Registration failed. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <TopSafeArea color={Colors.neutral.warmWhite} />
      <StatusBar barStyle="dark-content" backgroundColor={Colors.neutral.warmWhite} />

      {/* Step indicator */}
      <View style={styles.stepsRow}>
        <TouchableOpacity onPress={() => step > 0 ? setStep(s => s - 1) : navigation.goBack()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" style={styles.backText} />
        </TouchableOpacity>
        {STEPS.map((label, i) => (
          <React.Fragment key={i}>
            <View style={styles.stepItem}>
              <View style={[styles.stepCircle, i <= step && styles.stepCircleActive]}>
                <Text style={[styles.stepNum, i <= step && styles.stepNumActive]}>
                  {i < step ? <MaterialCommunityIcons name="check" size={12} /> : String(i + 1)}
                </Text>
              </View>
              <Text style={[styles.stepLabel, i === step && styles.stepLabelActive]}>
                {label}
              </Text>
            </View>
            {i < STEPS.length - 1 && <View style={[styles.stepLine, i < step && styles.stepLineActive]} />}
          </React.Fragment>
        ))}
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

          {step === 0 && (
            <View>
              <Text style={styles.stepTitle}>Family Head Information</Text>
              <View style={styles.row}>
                <Input label="First Name" value={form.firstName} onChangeText={update('firstName')}
                  placeholder="First" containerStyle={styles.half} />
                <Input label="Last Name" value={form.lastName} onChangeText={update('lastName')}
                  placeholder="Last" containerStyle={styles.half} />
              </View>
              <Input label="Mobile Number" value={form.phone} onChangeText={update('phone')}
                placeholder="10-digit number" keyboardType="phone-pad" autoCapitalize="none"
                leftIcon={<Text style={styles.prefix}>+91</Text>} />
              <Input label="Email Address" value={form.email} onChangeText={update('email')}
                placeholder="Optional" keyboardType="email-address" autoCapitalize="none"
                hint="Used for receipts and notifications" />
            </View>
          )}

          {step === 1 && (
            <View>
              <Text style={styles.stepTitle}>Family & Church Details</Text>
              <Input label="Family Name" value={form.familyName} onChangeText={update('familyName')}
                placeholder="e.g. Thomas Family" />
              <Input label="Address" value={form.address} onChangeText={update('address')}
                placeholder="Street address" />
              <View style={styles.row}>
                <Input label="City" value={form.city} onChangeText={update('city')}
                  placeholder="City" containerStyle={styles.half} />
                <Input label="Pincode" value={form.pincode} onChangeText={update('pincode')}
                  placeholder="Pincode" keyboardType="numeric" maxLength={6}
                  containerStyle={styles.half} />
              </View>
              {church && (
                <View style={styles.churchSelected}>
                  <Text style={styles.churchSelectedLabel}>Selected Church</Text>
                  <Text style={styles.churchSelectedName}><MaterialCommunityIcons name="church" size={13} /> {church.name}</Text>
                </View>
              )}
            </View>
          )}

          {step === 2 && (
            <View>
              <Text style={styles.stepTitle}>Create Password</Text>
              <Input label="New Password" value={form.password} onChangeText={update('password')}
                placeholder="At least 8 characters" secureTextEntry autoCapitalize="none" />
              <Input label="Confirm Password" value={form.confirmPassword}
                onChangeText={update('confirmPassword')} placeholder="Re-enter password"
                secureTextEntry autoCapitalize="none"
                error={form.confirmPassword && form.password !== form.confirmPassword ? "Passwords don't match" : undefined} />
              <Text style={styles.termsText}>
                By creating an account you agree to our{' '}
                <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </View>
          )}

          {submitError ? <Text style={styles.submitError}>{submitError}</Text> : null}

          <Button
            title={step < STEPS.length - 1 ? 'Next' : 'Create Account'}
            onPress={nextStep}
            loading={loading}
            fullWidth
            size="lg"
            style={styles.ctaBtn}
          />

          {step === 0 && (
            <View style={styles.loginRow}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate(Routes.Login, { church })}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral.warmWhite },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.screen,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.neutral.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.gray200,
  },
  backBtn: { marginRight: Spacing.md },
  backText: { fontSize: 22, color: Colors.primary.navy },
  stepItem: { alignItems: 'center' },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.neutral.gray200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  stepCircleActive: { backgroundColor: Colors.accent.gold },
  stepNum: { fontSize: 12, fontWeight: '700', color: Colors.neutral.gray400 },
  stepNumActive: { color: Colors.neutral.white },
  stepLabel: { fontSize: 10, color: Colors.neutral.gray400 },
  stepLabelActive: { color: Colors.accent.goldDark, fontWeight: '600' },
  stepLine: { flex: 1, height: 2, backgroundColor: Colors.neutral.gray200, marginHorizontal: 4, marginBottom: 12 },
  stepLineActive: { backgroundColor: Colors.accent.gold },
  scroll: { padding: Spacing.screen, paddingTop: Spacing.lg },
  stepTitle: { fontSize: 20, fontWeight: '700', color: Colors.primary.navy, marginBottom: Spacing.xl },
  row: { flexDirection: 'row', gap: Spacing.sm },
  half: { flex: 1 },
  prefix: { fontSize: 14, fontWeight: '600', color: Colors.neutral.gray600 },
  churchSelected: {
    backgroundColor: Colors.accent.goldPale,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.accent.gold + '50',
  },
  churchSelectedLabel: { fontSize: 11, color: Colors.neutral.gray500, marginBottom: 4 },
  churchSelectedName: { fontSize: 14, fontWeight: '600', color: Colors.primary.navy },
  termsText: { fontSize: 13, color: Colors.neutral.gray500, lineHeight: 20, marginBottom: Spacing.lg },
  termsLink: { color: Colors.sky.blue },
  submitError: {
    color: Colors.semantic.error,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  ctaBtn: { marginTop: Spacing.lg },
  loginRow: { flexDirection: 'row', justifyContent: 'center', marginTop: Spacing.lg },
  loginText: { color: Colors.neutral.gray500, fontSize: 14 },
  loginLink: { color: Colors.accent.gold, fontWeight: '600', fontSize: 14 },
});
