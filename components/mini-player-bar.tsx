import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export function MiniPlayerBar({
  title,
  subtitle,
  initialProgress = 0.25,
}: {
  title: string;
  subtitle?: string;
  initialProgress?: number;
}) {
  const insets = useSafeAreaInsets();
  const tint = useThemeColor({}, 'tint');
  const icon = useThemeColor({}, 'icon');

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress] = useState(() => Math.max(0, Math.min(1, initialProgress)));
  const remaining = 1 - progress;

  return (
    <ThemedView style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      <View style={[styles.progressTrack, { backgroundColor: icon, opacity: 0.2 }]}>
        <View style={[styles.progressFill, { flexGrow: progress, backgroundColor: tint }]} />
        <View style={[styles.progressFill, { flexGrow: remaining, backgroundColor: 'transparent' }]} />
      </View>

      <View style={styles.row}>
        <View style={[styles.artwork, { backgroundColor: tint }]} />

        <View style={styles.meta}>
          <ThemedText numberOfLines={1} type="defaultSemiBold">
            {title}
          </ThemedText>
          {subtitle ? (
            <ThemedText numberOfLines={1} style={styles.subtitle}>
              {subtitle}
            </ThemedText>
          ) : null}
        </View>

        <View style={styles.controls}>
          <Pressable
            style={styles.controlButton}
            accessibilityRole="button"
            onPress={() => setIsPlaying((p) => !p)}>
            <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color={icon} />
          </Pressable>
          <Pressable style={styles.controlButton} accessibilityRole="button">
            <Ionicons name="play-skip-forward" size={22} color={icon} />
          </Pressable>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  progressTrack: {
    height: 3,
    borderRadius: 999,
    overflow: 'hidden',
    marginBottom: 10,
    flexDirection: 'row',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    flexBasis: 0,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  artwork: { width: 44, height: 44, borderRadius: 12, marginRight: 10 },
  meta: { flex: 1 },
  subtitle: { opacity: 0.7, marginTop: 2, fontSize: 12 },
  controls: { flexDirection: 'row', alignItems: 'center' },
  controlButton: { paddingHorizontal: 8, paddingVertical: 8 },
});
