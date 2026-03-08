import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppTabRoute, ROUTES } from '../../../app/routes';
import { colors } from '../../../theme/colors';
import { AddScreen } from './AddScreen';
import { ProfileScreen } from './ProfileScreen';
import { SearchScreen } from './SearchScreen';

type TabKey = AppTabRoute;

type TabConfig = {
  key: TabKey;
  label: string;
  icon: string;
};

const TABS: TabConfig[] = [
  { key: ROUTES.PROFILE, label: 'Profile', icon: '👤' },
  { key: ROUTES.SEARCH, label: 'Search', icon: '🔍' },
  { key: ROUTES.ADD, label: 'Add', icon: '➕' },
];

export function AppTabsScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>(ROUTES.PROFILE);

  const content = useMemo(() => {
    switch (activeTab) {
      case ROUTES.SEARCH:
        return <SearchScreen />;
      case ROUTES.ADD:
        return <AddScreen />;
      case ROUTES.PROFILE:
      default:
        return <ProfileScreen />;
    }
  }, [activeTab]);

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>{content}</View>

        <View style={styles.tabBar}>
          {TABS.map(tab => {
            const active = tab.key === activeTab;
            return (
              <Pressable
                accessibilityRole="button"
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                style={styles.tabButton}
              >
                <Text style={styles.tabIcon}>{tab.icon}</Text>
                <Text style={[styles.tabLabel, active ? styles.tabLabelActive : null]}>
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
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
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 120,
  },
  tabBar: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 28,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2f3a63',
    backgroundColor: '#121d3dcc',
    borderRadius: 18,
    paddingVertical: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.24,
    shadowRadius: 16,
    elevation: 10,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    minWidth: 72,
  },
  tabIcon: {
    fontSize: 20,
  },
  tabLabel: {
    fontSize: 13,
    color: colors.tabInactive,
    fontWeight: '700',
  },
  tabLabelActive: {
    color: colors.textPrimary,
  },
});
