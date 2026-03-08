import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FormInput } from '../../../components/ui/FormInput';
import { PrimaryButton } from '../../../components/ui/PrimaryButton';
import { SecondaryButton } from '../../../components/ui/SecondaryButton';
import { colors } from '../../../theme/colors';

type SignupScreenProps = {
  onSignup: (email: string, password: string) => Promise<void>;
  onGoogleLogin: () => Promise<void>;
  onGoToLogin: () => void;
};

export function SignupScreen({
  onSignup,
  onGoogleLogin,
  onGoToLogin,
}: SignupScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Please complete all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    await onSignup(email.trim(), password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>JOIN US</Text>
      </View>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join and start your audiobook journey</Text>

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
        placeholder="Create a password"
        secureTextEntry
        value={password}
      />
      <FormInput
        label="Confirm Password"
        onChangeText={setConfirmPassword}
        placeholder="Re-enter your password"
        secureTextEntry
        value={confirmPassword}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <PrimaryButton label="Sign Up" onPress={handleSignup} />
      <SecondaryButton
        label="Sign up with Google"
        onPress={onGoogleLogin}
        style={styles.googleButton}
      />

      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.dividerLine} />
      </View>

      <Pressable onPress={onGoToLogin} style={styles.linkRow}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
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
