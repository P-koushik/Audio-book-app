import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../../theme/colors';

export function AddScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>File Upload Screen</Text>
      <Text style={styles.subtitle}>Upload audiobook files from this tab.</Text>
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
  },
});
