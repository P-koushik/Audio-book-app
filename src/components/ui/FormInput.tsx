import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import { colors } from '../../theme/colors';

type FormInputProps = TextInputProps & {
  label: string;
};

export function FormInput({ label, ...props }: FormInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput placeholderTextColor={colors.textSecondary} style={styles.input} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: '#d0d7f3',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#31406d',
    borderRadius: 14,
    color: colors.textPrimary,
    paddingHorizontal: 14,
    paddingVertical: 13,
    backgroundColor: '#1A2545',
    fontSize: 16,
  },
});
