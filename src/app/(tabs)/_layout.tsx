import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { ComponentProps } from 'react';

import { useAppState } from '../../context/AppStore';
import { useTheme } from '../../hooks/useTheme';

type IconName = ComponentProps<typeof Ionicons>['name'];

const tabIcon = (name: IconName) =>
  function TabIcon({ color, size, focused }: { color: string; size: number; focused: boolean }) {
    return <Ionicons name={focused ? name : (`${name}-outline` as IconName)} size={size} color={color} />;
  };

export default function TabLayout() {
  const { colors } = useTheme();
  const savedCount = useAppState().saved.length;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '800', fontSize: 20 },
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Dashboard', tabBarIcon: tabIcon('home') }} />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: tabIcon('bookmark'),
          tabBarBadge: savedCount > 0 ? savedCount : undefined,
          tabBarBadgeStyle: { backgroundColor: colors.primary, color: colors.onPrimary },
        }}
      />
      <Tabs.Screen name="learn" options={{ title: 'Learn', headerShown: false, tabBarIcon: tabIcon('book') }} />
      <Tabs.Screen name="quiz" options={{ title: 'Quiz', headerShown: false, tabBarIcon: tabIcon('help-circle') }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: tabIcon('settings') }} />
    </Tabs>
  );
}
