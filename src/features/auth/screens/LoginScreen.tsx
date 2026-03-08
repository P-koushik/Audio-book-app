import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FormInput } from '../../../components/ui/FormInput';
import { PrimaryButton } from '../../../components/ui/PrimaryButton';
import { SecondaryButton } from '../../../components/ui/SecondaryButton';
import { colors } from '../../../theme/colors';

type LoginScreenProps = {
  errorMessage?: string;
  onLogin: (email: string, password: string) => Promise<void>;
  onGoogleLogin: () => Promise<void>;
  onGoToSignup: () => void;
};

export function LoginScreen({
  errorMessage,
  onLogin,
  onGoogleLogin,
  onGoToSignup,
}: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setError('');
    await onLogin(email.trim(), password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>AUDIOBOOK</Text>
      </View>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to continue listening</Text>

      <FormInput
        autoCapitalize="none"
        keyboardType="email-address"
        label="Email"
        onChangeText={setEmail}
        placeholder="you@example.com"
        value={email}
      />
      <FormInput
        label="Password"
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
      />

      {error || errorMessage ? <Text style={styles.error}>{error || errorMessage}</Text> : null}

      <PrimaryButton label="Login" onPress={handleLogin} />
      <SecondaryButton
        label="Continue with Google"
        onPress={onGoogleLogin}
        style={styles.googleButton}
      />

      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.dividerLine} />
      </View>

      <Pressable onPress={onGoToSignup} style={styles.linkRow}>
        <Text style={styles.linkText}>Don&apos;t have an account? Sign Up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: '#1D2A52',
    borderWidth: 1,
    borderColor: '#32467f',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 14,
  },
  badgeText: {
    color: '#c8d3ff',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: colors.textSecondary,
    marginBottom: 26,
    fontSize: 15,
  },
  googleButton: {
    marginTop: 12,
    marginBottom: 12,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#31406d',
  },
  dividerText: {
    color: '#94a4d7',
    fontSize: 12,
    fontWeight: '600',
  },
  linkRow: {
    marginTop: 18,
    alignItems: 'center',
  },
  linkText: {
    color: '#95a9ff',
    fontWeight: '700',
  },
  error: {
    color: colors.danger,
    marginBottom: 12,
    fontSize: 13,
  },
});
