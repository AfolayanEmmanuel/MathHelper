import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { ComponentProps, ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button, Card, Chip, Screen, styles as ui } from '../../components/ui';
import { ThemePreference, useAppActions, useAppState, useQuizSummary } from '../../context/AppStore';
import { LEARN_STATS } from '../../data/learn';
import { QUIZ_STATS } from '../../data/quizzes';
import { useTheme } from '../../hooks/useTheme';
import { confirmAction } from '../../lib/confirm';
import { radius, spacing } from '../../theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

const THEMES: { value: ThemePreference; label: string }[] = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

function Row({ icon, title, subtitle, children }: { icon: IconName; title: string; subtitle?: string; children?: ReactNode }) {
  const { colors } = useTheme();
  return (
    <View style={{ gap: spacing.md }}>
      <View style={s.row}>
        <View style={[s.icon, { backgroundColor: colors.primarySoft }]}>
          <Ionicons name={icon} size={18} color={colors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[s.title, { color: colors.text }]}>{title}</Text>
          {subtitle && <Text style={[ui.muted, { color: colors.textMuted }]}>{subtitle}</Text>}
        </View>
      </View>
      {children}
    </View>
  );
}

export default function SettingsScreen() {
  const { colors } = useTheme();
  const { theme, saved } = useAppState();
  const summary = useQuizSummary();
  const { setTheme, clearSaved, clearQuizHistory, resetAll } = useAppActions();

  return (
    <Screen>
      <Text style={[s.group, { color: colors.textMuted }]}>APPEARANCE</Text>
      <Card>
        <Row icon="color-palette-outline" title="Theme" subtitle="Match your device, or choose light or dark">
          <View style={s.chips}>
            {THEMES.map((t) => (
              <Chip key={t.value} label={t.label} selected={theme === t.value} onPress={() => setTheme(t.value)} />
            ))}
          </View>
        </Row>
      </Card>

      <Text style={[s.group, { color: colors.textMuted }]}>YOUR PROGRESS</Text>
      <Card style={{ gap: spacing.md }}>
        <View style={s.statsRow}>
          {[
            { label: 'Saved', value: String(saved.length) },
            { label: 'Quizzes', value: String(summary.taken) },
            { label: 'Average', value: summary.taken ? `${summary.average}%` : '—' },
          ].map((st) => (
            <View key={st.label} style={[s.stat, { backgroundColor: colors.surfaceAlt }]}>
              <Text style={[s.statValue, { color: colors.primary }]}>{st.value}</Text>
              <Text style={[s.statLabel, { color: colors.textMuted }]}>{st.label}</Text>
            </View>
          ))}
        </View>
        <Text style={[ui.muted, { color: colors.textMuted }]}>Your data is stored only on this device.</Text>
        <Button
          label="Clear saved problems"
          icon="bookmark-outline"
          variant="danger"
          disabled={saved.length === 0}
          onPress={() => confirmAction('Clear saved problems?', `All ${saved.length} saved problems will be deleted.`, 'Clear', clearSaved)}
        />
        <Button
          label="Clear quiz history"
          icon="stats-chart-outline"
          variant="danger"
          disabled={summary.taken === 0}
          onPress={() => confirmAction('Clear quiz history?', 'All quiz scores and best results will be deleted.', 'Clear', clearQuizHistory)}
        />
        <Button
          label="Reset everything"
          icon="trash-outline"
          variant="danger"
          onPress={() => confirmAction('Reset everything?', 'Saved problems, quiz history and your theme choice will be reset.', 'Reset', resetAll)}
        />
      </Card>

      <Text style={[s.group, { color: colors.textMuted }]}>ABOUT</Text>
      <Card style={{ gap: spacing.lg }}>
        <Row
          icon="information-circle-outline"
          title="Math Helper"
          subtitle={`Version ${Constants.expoConfig?.version ?? '1.0.0'} · Expo SDK 54`}
        />
        <Row
          icon="library-outline"
          title="Content library"
          subtitle={`${LEARN_STATS.courses} courses · ${LEARN_STATS.lessons} lessons · ${QUIZ_STATS.quizzes} quizzes`}
        />
        <Row icon="sparkles-outline" title="Homework scanning" subtitle="Photos are solved by Google Gemini via the app’s server. Always double-check AI answers." />
      </Card>
    </Screen>
  );
}

const s = StyleSheet.create({
  group: { fontSize: 12, fontWeight: '800', letterSpacing: 0.8, marginBottom: -spacing.sm, marginLeft: spacing.xs },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  icon: { width: 34, height: 34, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: '700' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  statsRow: { flexDirection: 'row', gap: spacing.sm },
  stat: { flex: 1, alignItems: 'center', paddingVertical: spacing.md, borderRadius: radius.md },
  statValue: { fontSize: 20, fontWeight: '800' },
  statLabel: { fontSize: 11, fontWeight: '700', marginTop: 2 },
});
