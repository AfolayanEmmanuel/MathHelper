import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { PhotoWidget } from '../../components/PhotoWidget';
import { QuizCard } from '../../components/QuizCard';
import { Card, Screen, SectionTitle, styles as ui } from '../../components/ui';
import { useAppState, useQuizSummary } from '../../context/AppStore';
import { getCourse, getLevel } from '../../data/learn';
import { getQuiz } from '../../data/quizzes';
import { useTheme } from '../../hooks/useTheme';
import { radius, spacing } from '../../theme';

const FEATURED_COURSES = ['fractions', 'algebra-1', 'calculus-1'].map((id) => getCourse(id)).filter((c) => c !== undefined);
const FEATURED_QUIZZES = ['mental-math-easy', 'percents-quiz', 'quadratics-quiz'].map((id) => getQuiz(id)).filter((q) => q !== undefined);

function StatTile({ label, value, icon }: { label: string; value: string; icon: ComponentProps<typeof Ionicons>['name'] }) {
  const { colors } = useTheme();
  return (
    <View style={[s.stat, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Ionicons name={icon} size={16} color={colors.primary} />
      <Text style={[s.statValue, { color: colors.text }]}>{value}</Text>
      <Text style={[s.statLabel, { color: colors.textMuted }]}>{label}</Text>
    </View>
  );
}

function SeeAll({ href }: { href: '/learn' | '/quiz' }) {
  const { colors } = useTheme();
  return (
    <Pressable onPress={() => router.navigate(href)} hitSlop={8} accessibilityRole="button">
      <Text style={{ color: colors.primary, fontWeight: '700' }}>See all</Text>
    </Pressable>
  );
}

export default function DashboardScreen() {
  const { colors } = useTheme();
  const { saved, quizHistory } = useAppState();
  const summary = useQuizSummary();
  const last = quizHistory[0];

  return (
    <Screen>
      <View>
        <Text style={[s.hello, { color: colors.text }]}>Let&apos;s solve some math ✏️</Text>
        <Text style={[ui.muted, { color: colors.textMuted }]}>
          Scan your homework for step-by-step solutions, then practice with quizzes and lessons.
        </Text>
      </View>

      <View style={s.statsRow}>
        <StatTile icon="trophy-outline" label="Quizzes taken" value={String(summary.taken)} />
        <StatTile icon="analytics-outline" label="Avg. score" value={summary.taken ? `${summary.average}%` : '—'} />
        <StatTile icon="bookmark-outline" label="Saved" value={String(saved.length)} />
      </View>

      <PhotoWidget />

      {last && (
        <Pressable onPress={() => router.push({ pathname: '/quiz/[quizId]', params: { quizId: last.quizId } })} accessibilityRole="button">
          <Card style={s.lastRow}>
            <View style={[s.lastIcon, { backgroundColor: colors.primarySoft }]}>
              <Ionicons name="refresh" size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[s.lastLabel, { color: colors.textMuted }]}>LAST QUIZ · {last.percent}%</Text>
              <Text style={[s.rowTitle, { color: colors.text }]} numberOfLines={1}>
                {last.quizTitle}
              </Text>
              <Text style={[ui.muted, { color: colors.textMuted }]}>Tap to try it again</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </Card>
        </Pressable>
      )}

      <View style={{ gap: spacing.sm }}>
        <SectionTitle action={<SeeAll href="/quiz" />}>Quick quizzes</SectionTitle>
        {FEATURED_QUIZZES.map((q) => (
          <QuizCard key={q.id} quiz={q} best={summary.bestByQuiz.get(q.id)} />
        ))}
      </View>

      <View style={{ gap: spacing.sm }}>
        <SectionTitle action={<SeeAll href="/learn" />}>Keep learning</SectionTitle>
        {FEATURED_COURSES.map((c) => {
          const accent = getLevel(c.level).accent;
          return (
            <Pressable
              key={c.id}
              onPress={() => router.push({ pathname: '/learn/[courseId]', params: { courseId: c.id } })}
              accessibilityRole="button"
            >
              <Card style={s.courseRow}>
                <View style={[s.courseIcon, { backgroundColor: accent + '22' }]}>
                  <Ionicons name={c.icon} size={22} color={accent} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[s.rowTitle, { color: colors.text }]}>{c.title}</Text>
                  <Text style={[ui.muted, { color: colors.textMuted }]} numberOfLines={1}>
                    {c.lessons.length} lessons · {getLevel(c.level).title}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
              </Card>
            </Pressable>
          );
        })}
      </View>
    </Screen>
  );
}

const s = StyleSheet.create({
  hello: { fontSize: 24, fontWeight: '800', marginBottom: 4 },
  statsRow: { flexDirection: 'row', gap: spacing.sm },
  stat: { flex: 1, borderRadius: radius.md, borderWidth: StyleSheet.hairlineWidth, padding: spacing.md, alignItems: 'center', gap: 2 },
  statValue: { fontSize: 20, fontWeight: '800' },
  statLabel: { fontSize: 11, fontWeight: '600', textAlign: 'center' },
  lastRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md },
  lastIcon: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  lastLabel: { fontSize: 11, fontWeight: '800', letterSpacing: 0.6 },
  courseRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md },
  courseIcon: { width: 42, height: 42, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  rowTitle: { fontSize: 16, fontWeight: '700' },
});
