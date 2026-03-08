import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '../../../components/ui/PrimaryButton';
import { useAuth } from '../../auth/hooks/useAuth';
import { colors } from '../../../theme/colors';

export function ProfileScreen() {
  const { signOut, user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user?.name ?? 'Profile'}</Text>
      <Text style={styles.subtitle}>{user?.email ?? 'No email available.'}</Text>
      <PrimaryButton label="Logout" onPress={handleSignOut} style={styles.button} />
      {loading ? <ActivityIndicator color={colors.textPrimary} size="small" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 15,
    marginBottom: 24,
  },
  button: {
    width: '100%',
    maxWidth: 280,
  },
});
