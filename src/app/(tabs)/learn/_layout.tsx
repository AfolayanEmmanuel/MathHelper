import { Stack } from 'expo-router';

import { useTheme } from '../../../hooks/useTheme';

export default function LearnLayout() {
  const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '800' },
        headerBackButtonDisplayMode: 'minimal',
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Learn', headerTitleStyle: { fontWeight: '800', fontSize: 20 } }} />
      <Stack.Screen name="[courseId]/index" options={{ title: '' }} />
      <Stack.Screen name="[courseId]/[lessonId]" options={{ title: '' }} />
    </Stack>
  );
}
