import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthScreenRoute, ROUTES } from '../../../app/routes';
import { colors } from '../../../theme/colors';
import { login, loginWithGoogle, signup } from '../auth.api';
import { LoginScreen } from './LoginScreen';
import { SignupScreen } from './SignupScreen';

type AuthScreenProps = {
  onAuthenticated: () => void;
};

export function AuthScreen({ onAuthenticated }: AuthScreenProps) {
  const [currentRoute, setCurrentRoute] = useState<AuthScreenRoute>(ROUTES.LOGIN);
  const [loading, setLoading] = useState(false);

  const runWithLoading = async (action: () => Promise<void>) => {
    setLoading(true);
    try {
      await action();
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    await runWithLoading(async () => {
      const result = await login({ email, password });
      if (result.success) {
        onAuthenticated();
      }
    });
  };

  const handleSignup = async (email: string, password: string) => {
    await runWithLoading(async () => {
      const result = await signup({ email, password });
      if (result.success) {
        onAuthenticated();
      }
    });
  };

  const handleGoogleLogin = async () => {
    await runWithLoading(async () => {
      const result = await loginWithGoogle();
      if (result.success) {
        onAuthenticated();
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.card}>
        {currentRoute === ROUTES.LOGIN ? (
          <LoginScreen
            onGoToSignup={() => setCurrentRoute(ROUTES.SIGN_UP)}
            onGoogleLogin={handleGoogleLogin}
            onLogin={handleLogin}
          />
        ) : (
          <SignupScreen
            onGoToLogin={() => setCurrentRoute(ROUTES.LOGIN)}
            onGoogleLogin={handleGoogleLogin}
            onSignup={handleSignup}
          />
        )}
        </View>

        {loading ? (
          <View style={styles.overlay}>
            <ActivityIndicator color={colors.textPrimary} size="large" />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  card: {
    width: '100%',
    backgroundColor: '#131B34',
    borderWidth: 1,
    borderColor: '#28345d',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 22,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(11,16,32,0.65)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
