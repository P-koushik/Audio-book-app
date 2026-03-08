import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

import { colors } from '../../theme/colors';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
};

export function PrimaryButton({ label, onPress, style }: PrimaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null, style]}
    >
      <Text style={styles.icon}>→</Text>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    minHeight: 52,
    flexDirection: 'row',
    gap: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 4,
  },
  buttonPressed: {
    backgroundColor: colors.primaryPressed,
    transform: [{ scale: 0.99 }],
  },
  icon: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  label: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.2,
  },
});
