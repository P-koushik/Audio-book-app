import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useMemo, useState } from 'react';
import {
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  type GestureResponderEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { router } from 'expo-router';

type UploadRow = {
  id: string;
  fileName: string;
  uploadedAt: string;
  status: 'Ready' | 'Uploaded';
};

function formatDateTime(date: Date) {
  try {
    return date.toLocaleString();
  } catch {
    return date.toISOString();
  }
}

export default function HomeScreen() {
  const tint = useThemeColor({}, 'tint');
  const icon = useThemeColor({}, 'icon');
  const text = useThemeColor({}, 'text');
  const background = useThemeColor({}, 'background');

  const [rows, setRows] = useState<UploadRow[]>(() => [
    { id: '1', fileName: 'Sample.pdf', uploadedAt: formatDateTime(new Date()), status: 'Uploaded' },
    { id: '2', fileName: 'Chapter-1.pdf', uploadedAt: formatDateTime(new Date()), status: 'Ready' },
  ]);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [busy, setBusy] = useState(false);

  const tableColumns = useMemo(
    () => [
      { key: 'fileName', label: 'File', flex: 2 as const },
      { key: 'uploadedAt', label: 'Uploaded', flex: 2 as const },
      { key: 'status', label: 'Status', flex: 1 as const },
    ],
    []
  );

  async function onPickPdf(_event?: GestureResponderEvent) {
    if (busy) return;

    try {
      setBusy(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: Platform.select({ web: 'application/pdf', default: 'application/pdf' }),
        multiple: false,
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const asset = result.assets?.[0];
      const fileName = asset?.name ?? 'document.pdf';

      setRows((prev) => [
        {
          id: String(Date.now()),
          fileName,
          uploadedAt: formatDateTime(new Date()),
          status: 'Ready',
        },
        ...prev,
      ]);

      setUploadModalVisible(false);
    } finally {
      setBusy(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={require('@/assets/images/icon.png')} style={styles.logo} />
            <ThemedText type="defaultSemiBold" style={styles.headerTitle}>
              Audiobook
            </ThemedText>
          </View>
          <Pressable
            style={styles.profileButton}
            accessibilityRole="button"
            onPress={() => router.push('/profile')}>
            <Ionicons name="person-circle-outline" size={32} color={icon} />
          </Pressable>
        </View>

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Uploads
        </ThemedText>

        <ThemedView style={[styles.table, { borderColor: icon }]}>
          <View style={[styles.tableRow, styles.tableHeaderRow, { borderBottomColor: icon }]}>
            {tableColumns.map((col) => (
              <View key={col.key} style={[styles.cell, { flex: col.flex }]}>
                <ThemedText type="defaultSemiBold" style={styles.cellText}>
                  {col.label}
                </ThemedText>
              </View>
            ))}
          </View>

          <ScrollView style={styles.tableBody} contentContainerStyle={styles.tableBodyContent}>
            {rows.map((row) => (
              <Pressable
                key={row.id}
                style={[styles.tableRow, { borderBottomColor: icon }]}
                accessibilityRole="button"
                onPress={() =>
                  router.push({
                    pathname: '/details/[id]',
                    params: {
                      id: row.id,
                      fileName: row.fileName,
                      uploadedAt: row.uploadedAt,
                      status: row.status,
                    },
                  })
                }>
                <View style={[styles.cell, { flex: 2 }]}>
                  <ThemedText numberOfLines={1} style={styles.cellText}>
                    {row.fileName}
                  </ThemedText>
                </View>
                <View style={[styles.cell, { flex: 2 }]}>
                  <ThemedText numberOfLines={1} style={styles.cellText}>
                    {row.uploadedAt}
                  </ThemedText>
                </View>
                <View style={[styles.cell, { flex: 1 }]}>
                  <ThemedText numberOfLines={1} style={[styles.cellText, { color: text }]}>
                    {row.status}
                  </ThemedText>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </ThemedView>

        <Pressable
          style={[styles.fab, { backgroundColor: tint }]}
          onPress={() => setUploadModalVisible(true)}
          accessibilityRole="button">
          <Ionicons name="add" size={28} color="#fff" />
        </Pressable>

        <Modal
          transparent
          visible={uploadModalVisible}
          animationType="fade"
          onRequestClose={() => setUploadModalVisible(false)}>
          <View style={styles.modalBackdrop}>
            <View style={[styles.modalCard, { backgroundColor: background, borderColor: icon }]}>
              <ThemedText type="subtitle">Upload PDF</ThemedText>
              <ThemedText style={styles.modalHint}>Select a PDF file to add to your uploads.</ThemedText>

              <Pressable
                style={[styles.modalButton, { backgroundColor: tint }]}
                onPress={onPickPdf}
                disabled={busy}>
                <ThemedText style={styles.modalButtonText}>{busy ? 'Opening…' : 'Choose PDF'}</ThemedText>
              </Pressable>

              <Pressable
                style={[styles.modalButtonSecondary, { borderColor: icon }]}
                onPress={() => setUploadModalVisible(false)}
                disabled={busy}>
                <ThemedText>Cancel</ThemedText>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ThemedView>
    </SafeAreaView>
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
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: { width: 28, height: 28, borderRadius: 10, resizeMode: 'cover' },
  headerTitle: { fontSize: 18 },
  profileButton: { padding: 4 },
  sectionTitle: { marginTop: 8, marginBottom: 10 },
  table: {
    borderWidth: 1,
    borderRadius: 14,
    overflow: 'hidden',
    flex: 1,
  },
  tableHeaderRow: { opacity: 0.95 },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  cell: { justifyContent: 'center', paddingRight: 8 },
  cellText: { fontSize: 14 },
  tableBody: { flex: 1 },
  tableBodyContent: { paddingBottom: 96 },
  fab: {
    position: 'absolute',
    right: 18,
    bottom: 18,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  modalHint: { opacity: 0.7, marginTop: 6, marginBottom: 14 },
  modalButton: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: { color: '#fff', fontWeight: '700' },
  modalButtonSecondary: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginTop: 10,
  },
});
