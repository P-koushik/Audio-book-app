import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Link, router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const borderColor = useThemeColor({}, 'icon');
  const placeholderTextColor = useThemeColor({}, 'icon');
  const textColor = useThemeColor({}, 'text');
  const tint = useThemeColor({}, 'tint');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Sign up</ThemedText>
        <ThemedText style={styles.subtitle}>Create your account</ThemedText>

        <View style={styles.form}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Full name"
            placeholderTextColor={placeholderTextColor}
            style={[styles.input, { borderColor, color: textColor }]}
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={placeholderTextColor}
            autoCapitalize="none"
            keyboardType="email-address"
            style={[styles.input, { borderColor, color: textColor }]}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor={placeholderTextColor}
            secureTextEntry
            style={[styles.input, { borderColor, color: textColor }]}
          />

          <Pressable
            style={[styles.primaryButton, { backgroundColor: tint }]}
            onPress={() => router.replace('/home')}>
            <ThemedText style={styles.primaryButtonText}>Create account</ThemedText>
          </Pressable>

          <View style={styles.row}>
            <ThemedText>Already have an account? </ThemedText>
            <Link href="/login">
              <ThemedText type="link">Login</ThemedText>
            </Link>
          </View>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  subtitle: { marginTop: 8, opacity: 0.7 },
  form: { marginTop: 24, gap: 12 },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  primaryButton: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  primaryButtonText: { color: '#fff', fontWeight: '700' },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
});
