import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function ProfileScreen() {
  const icon = useThemeColor({}, 'icon');
  const tint = useThemeColor({}, 'tint');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton} accessibilityRole="button">
            <Ionicons name="chevron-back" size={24} color={icon} />
          </Pressable>
          <ThemedText type="defaultSemiBold" style={styles.headerTitle}>
            Profile
          </ThemedText>
          <View style={styles.headerRightSpacer} />
        </View>

        <View style={[styles.avatar, { backgroundColor: tint }]} />
        <ThemedText type="title" style={styles.name}>
          Your Name
        </ThemedText>
        <ThemedText style={styles.meta}>you@example.com</ThemedText>

        <ThemedView style={[styles.card, { borderColor: icon }]}>
          <Row label="Plan" value="Free" />
          <Row label="Uploads" value="2" />
        </ThemedView>

        <Pressable
          style={[styles.logoutButton, { borderColor: icon }]}
          accessibilityRole="button"
          onPress={() => router.replace('/login')}>
          <Ionicons name="log-out-outline" size={18} color={icon} />
          <ThemedText type="defaultSemiBold">Logout</ThemedText>
        </Pressable>
      </ThemedView>
    </SafeAreaView>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <ThemedText style={styles.rowLabel}>{label}</ThemedText>
      <ThemedText type="defaultSemiBold">{value}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 10 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  backButton: { padding: 6, width: 40 },
  headerTitle: { fontSize: 18 },
  headerRightSpacer: { width: 40 },
  avatar: { width: 92, height: 92, borderRadius: 28, marginTop: 18 },
  name: { marginTop: 14 },
  meta: { marginTop: 6, opacity: 0.7 },
  card: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    gap: 12,
  },
  logoutButton: {
    marginTop: 14,
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowLabel: { opacity: 0.75 },
});
