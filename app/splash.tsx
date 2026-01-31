import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function SplashScreen() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/login');
    }, 1200);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <View style={styles.logoWrap}>
          <Image source={require('@/assets/images/icon.png')} style={styles.logo} />
        </View>
        <ThemedText type="title" style={styles.title}>
          Audiobook
        </ThemedText>
        <ThemedText style={styles.subtitle}>Upload and manage your PDF audiobooks</ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoWrap: {
    width: 88,
    height: 88,
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: 16,
  },
  logo: { width: '100%', height: '100%', resizeMode: 'cover' },
  title: { textAlign: 'center' },
  subtitle: { textAlign: 'center', opacity: 0.7, marginTop: 8 },
});
