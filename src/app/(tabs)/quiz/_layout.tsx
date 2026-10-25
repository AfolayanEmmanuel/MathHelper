import { Stack } from 'expo-router';

import { useTheme } from '../../../hooks/useTheme';

export default function QuizLayout() {
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
      <Stack.Screen name="index" options={{ title: 'Quiz', headerTitleStyle: { fontWeight: '800', fontSize: 20 } }} />
      <Stack.Screen name="[quizId]" options={{ title: '' }} />
    </Stack>
  );
}
