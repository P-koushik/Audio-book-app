import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MiniPlayerBar } from "@/components/mini-player-bar";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function FileDetailsScreen() {
  const params = useLocalSearchParams<{
    id?: string;
    fileName?: string;
    uploadedAt?: string;
    status?: string;
  }>();

  const icon = useThemeColor({}, "icon");
  const tint = useThemeColor({}, "tint");

  const fileName =
    typeof params.fileName === "string"
      ? params.fileName
      : `File ${params.id ?? ""}`.trim();
  const uploadedAt =
    typeof params.uploadedAt === "string" ? params.uploadedAt : "—";
  const status = typeof params.status === "string" ? params.status : "—";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.headerButton}
            accessibilityRole="button"
          >
            <Ionicons name="chevron-back" size={24} color={icon} />
          </Pressable>
          <ThemedText
            type="defaultSemiBold"
            style={styles.headerTitle}
            numberOfLines={1}
          >
            Details
          </ThemedText>
          <Pressable style={styles.headerButton} accessibilityRole="button">
            <Ionicons name="ellipsis-horizontal" size={22} color={icon} />
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <ThemedText type="title" style={styles.title} numberOfLines={2}>
            {fileName}
          </ThemedText>

          <View style={[styles.card, { borderColor: tint }]}>
            <InfoRow label="File Name" value={fileName} />
            <InfoRow label="Uploaded At" value={uploadedAt} />
            <InfoRow label="Status" value={status} />
          </View>
        </ScrollView>

        <MiniPlayerBar
          title={fileName}
          subtitle="Audiobook"
          initialProgress={0.18}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <ThemedText style={styles.infoLabel}>{label}</ThemedText>
      <ThemedText
        type="defaultSemiBold"
        style={styles.infoValue}
        numberOfLines={1}
      >
        {value}
      </ThemedText>
    </View>
  );
}

const PLAYER_HEIGHT_ESTIMATE = 92;

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  headerButton: { padding: 8, width: 44, alignItems: "center" },
  headerTitle: { fontSize: 18, flex: 1, textAlign: "center" },
  content: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: PLAYER_HEIGHT_ESTIMATE + 24,
  },
  title: { fontSize: 28, lineHeight: 32 },
  card: {
    marginTop: 18,
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    gap: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoLabel: { opacity: 0.75 },
  infoValue: { maxWidth: "60%" },
  primaryButton: {
    marginTop: 16,
    height: 50,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  primaryButtonText: { color: "#fff", fontWeight: "700" },
});
