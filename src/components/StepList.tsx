import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../hooks/useTheme';

export const StepList = memo(function StepList({ steps }: { steps: string[] }) {
  const { colors } = useTheme();
  return (
    <View style={{ gap: 8 }}>
      {steps.map((step, i) => (
        <View key={i} style={s.row}>
          <View style={[s.badge, { backgroundColor: colors.primarySoft }]}>
            <Text style={[s.badgeText, { color: colors.primary }]}>{i + 1}</Text>
          </View>
          <Text style={[s.step, { color: colors.text }]}>{step}</Text>
        </View>
      ))}
    </View>
  );
});

const s = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  badge: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  badgeText: { fontSize: 12, fontWeight: '800' },
  step: { flex: 1, fontSize: 15, lineHeight: 22, fontVariant: ['tabular-nums'] },
});
