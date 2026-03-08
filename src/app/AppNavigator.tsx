import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { AppTabsScreen } from '../features/app/screens/AppTabsScreen';
import { useAuth } from '../features/auth/hooks/useAuth';
import { AuthScreen } from '../features/auth/screens/AuthScreen';
import { colors } from '../theme/colors';

export function AppNavigator() {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={colors.textPrimary} size="large" />
      </View>
    );
  }

  if (user) {
    return <AppTabsScreen />;
  }

  return <AuthScreen />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});
