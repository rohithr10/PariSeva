import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import Button from '../../components/common/Button/Button';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setCredentials } from '../../store/slices/auth.slice';
import { authApi } from '../../api/auth.api';
import { getApiErrorMessage } from '../../api/client';
import type { AuthStackParamList } from '../../navigation/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSafeArea from '../../components/common/TopSafeArea/TopSafeArea';

type Props = NativeStackScreenProps<AuthStackParamList, typeof Routes.OTPVerification>;

const OTP_LENGTH = 6;

export default function OTPVerificationScreen({ navigation, route }: Props) {
  const { phone, purpose } = route.params;
  const dispatch = useAppDispatch();

  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef<TextInput[]>([]);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => setTimer(t => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, []);

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length < OTP_LENGTH) {
      setError('Please enter the complete 6-digit OTP');
      shake();
      return;
    }
    setLoading(true);
    setError('');
    try {
      // Registration uses verify-account; OTP login uses verify-otp.
      const res =
        purpose === 'register'
          ? await authApi.verifyAccount({ phone, otp: code })
          : await authApi.verifyOTP({ phone, otp: code });
      const { user, token, refreshToken } = res.data.data;
      dispatch(setCredentials({ user, token, refreshToken }));
      // RootNavigator switches to the authenticated stack automatically.
    } catch (err) {
      setError(getApiErrorMessage(err, 'Invalid OTP. Please try again.'));
      shake();
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setTimer(60);
    setOtp(new Array(OTP_LENGTH).fill(''));
    inputRefs.current[0]?.focus();
    try {
      await authApi.sendOTP(phone, purpose === 'register' ? 'verify' : 'login');
    } catch {
      /* timer already reset; surface nothing intrusive */
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <TopSafeArea color={Colors.neutral.warmWhite} />
      <StatusBar barStyle="dark-content" backgroundColor={Colors.neutral.warmWhite} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={styles.content}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <MaterialCommunityIcons name="arrow-left" style={styles.backText} />
          </TouchableOpacity>

          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="cellphone" style={styles.phoneIcon} />
          </View>

          <Text style={styles.title}>Verify Your Number</Text>
          <Text style={styles.subtitle}>
            Enter the 6-digit code sent to{'\n'}
            <Text style={styles.phone}>+91 {phone}</Text>
          </Text>

          {/* OTP Boxes */}
          <Animated.View style={[styles.otpRow, { transform: [{ translateX: shakeAnim }] }]}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => { if (ref) inputRefs.current[index] = ref; }}
                value={digit}
                onChangeText={val => handleOtpChange(val.slice(-1), index)}
                onKeyPress={e => handleKeyPress(e, index)}
                keyboardType="numeric"
                maxLength={1}
                style={[
                  styles.otpBox,
                  digit ? styles.otpBoxFilled : null,
                  error ? styles.otpBoxError : null,
                ]}
                selectTextOnFocus
                autoFocus={index === 0}
              />
            ))}
          </Animated.View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Timer / Resend */}
          {timer > 0 ? (
            <Text style={styles.timerText}>Resend OTP in 0:{String(timer).padStart(2, '0')}</Text>
          ) : (
            <TouchableOpacity onPress={resendOtp}>
              <Text style={styles.resendText}>Resend OTP</Text>
            </TouchableOpacity>
          )}

          <Button
            title="Verify"
            onPress={handleVerify}
            loading={loading}
            fullWidth
            size="lg"
            style={styles.verifyBtn}
          />

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.changeNumber}>Change Mobile Number</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.neutral.warmWhite },
  content: { flex: 1, padding: Spacing.screen, alignItems: 'center', justifyContent: 'center' },
  backBtn: { position: 'absolute', top: Spacing.lg, left: Spacing.screen },
  backText: { fontSize: 22, color: Colors.primary.navy },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: Colors.accent.goldPale,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  phoneIcon: { fontSize: 36 , color: Colors.accent.goldDark},
  title: { fontSize: 24, fontWeight: '700', color: Colors.primary.navy, marginBottom: Spacing.sm },
  subtitle: {
    fontSize: 15,
    color: Colors.neutral.gray500,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.xl,
  },
  phone: { color: Colors.primary.navy, fontWeight: '600' },
  otpRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.lg },
  otpBox: {
    width: 48,
    height: 56,
    borderWidth: 1.5,
    borderColor: Colors.neutral.gray300,
    borderRadius: Radius.md,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: Colors.primary.navy,
    backgroundColor: Colors.neutral.white,
    ...Shadow.sm,
  },
  otpBoxFilled: {
    borderColor: Colors.accent.gold,
    backgroundColor: Colors.accent.goldPale,
  },
  otpBoxError: { borderColor: Colors.semantic.error },
  errorText: {
    color: Colors.semantic.error,
    fontSize: 13,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  timerText: { color: Colors.neutral.gray400, fontSize: 14, marginBottom: Spacing.xl },
  resendText: { color: Colors.sky.blue, fontSize: 14, fontWeight: '600', marginBottom: Spacing.xl },
  verifyBtn: { marginBottom: Spacing.lg },
  changeNumber: { color: Colors.neutral.gray400, fontSize: 13, textDecorationLine: 'underline' },
});
