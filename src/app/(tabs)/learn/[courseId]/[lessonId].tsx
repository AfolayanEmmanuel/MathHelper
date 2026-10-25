import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { ComponentProps, memo, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { StepList } from '../../../../components/StepList';
import { Button, Card, EmptyState, Screen, styles as ui } from '../../../../components/ui';
import { getLesson, getLevel, PracticeProblem, WorkedExample } from '../../../../data/learn';
import { useTheme } from '../../../../hooks/useTheme';
import { radius, spacing } from '../../../../theme';

const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });

function Heading({ icon, children }: { icon: ComponentProps<typeof Ionicons>['name']; children: string }) {
  const { colors } = useTheme();
  return (
    <View style={s.heading}>
      <Ionicons name={icon} size={18} color={colors.primary} />
      <Text style={[s.headingText, { color: colors.text }]}>{children}</Text>
    </View>
  );
}

const ExampleCard = memo(function ExampleCard({ example, index }: { example: WorkedExample; index: number }) {
  const { colors } = useTheme();
  return (
    <Card>
      <Text style={[s.label, { color: colors.textMuted }]}>EXAMPLE {index + 1}</Text>
      <Text style={[s.problem, { color: colors.text }]} selectable>
        {example.problem}
      </Text>
      <StepList steps={example.steps} />
      <View style={[s.answer, { backgroundColor: colors.successSoft }]}>
        <Ionicons name="checkmark-circle" size={18} color={colors.success} />
        <Text style={[s.answerText, { color: colors.success }]} selectable>
          {example.answer}
        </Text>
      </View>
    </Card>
  );
});

const PracticeItem = memo(function PracticeItem({ problem, index }: { problem: PracticeProblem; index: number }) {
  const { colors } = useTheme();
  const [revealed, setRevealed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  return (
    <View style={[s.practice, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={s.practiceTop}>
        <Text style={[s.practiceNum, { color: colors.primary }]}>{index + 1}.</Text>
        <Text style={[s.practiceQ, { color: colors.text }]} selectable>
          {problem.question}
        </Text>
      </View>
      {showHint && problem.hint && (
        <Text style={[ui.muted, { color: colors.textMuted, fontStyle: 'italic' }]}>Hint: {problem.hint}</Text>
      )}
      {revealed && (
        <View style={[s.answer, { backgroundColor: colors.successSoft }]}>
          <Text style={[s.answerText, { color: colors.success }]} selectable>
            {problem.answer}
          </Text>
        </View>
      )}
      <View style={s.practiceActions}>
        {problem.hint && !revealed && (
          <Pressable onPress={() => setShowHint((v) => !v)} hitSlop={6} accessibilityRole="button">
            <Text style={[s.link, { color: colors.textMuted }]}>{showHint ? 'Hide hint' : 'Show hint'}</Text>
          </Pressable>
        )}
        <Pressable onPress={() => setRevealed((v) => !v)} hitSlop={6} accessibilityRole="button">
          <Text style={[s.link, { color: colors.primary }]}>{revealed ? 'Hide answer' : 'Reveal answer'}</Text>
        </Pressable>
      </View>
    </View>
  );
});

export default function LessonScreen() {
  const { colors } = useTheme();
  const { courseId, lessonId } = useLocalSearchParams<{ courseId: string; lessonId: string }>();
  const found = getLesson(courseId, lessonId);

  if (!found) {
    return (
      <Screen>
        <EmptyState icon="alert-circle-outline" title="Lesson not found" message="This lesson doesn’t exist. Go back to the course." />
      </Screen>
    );
  }

  const { course, lesson, index, prev, next } = found;
  const accent = getLevel(course.level).accent;
  const goTo = (id: string) => router.replace({ pathname: '/learn/[courseId]/[lessonId]', params: { courseId: course.id, lessonId: id } });

  return (
    // key resets scroll position and practice state when moving between lessons
    <Screen key={lesson.id}>
      <Stack.Screen options={{ title: course.title }} />

      <View style={{ gap: spacing.sm }}>
        <Text style={[s.label, { color: accent }]}>
          LESSON {index + 1} OF {course.lessons.length} · {lesson.minutes} MIN
        </Text>
        <Text style={[s.title, { color: colors.text }]}>{lesson.title}</Text>
        <View style={[s.progressTrack, { backgroundColor: colors.surfaceAlt }]}>
          <View style={[s.progressFill, { backgroundColor: accent, width: `${((index + 1) / course.lessons.length) * 100}%` }]} />
        </View>
      </View>

      <Card style={{ borderLeftWidth: 4, borderLeftColor: accent }}>
        <Text style={[s.summary, { color: colors.text }]}>{lesson.summary}</Text>
      </Card>

      <Heading icon="bulb-outline">Key ideas</Heading>
      <Card>
        {lesson.keyPoints.map((point) => (
          <View key={point} style={s.bullet}>
            <View style={[s.dot, { backgroundColor: accent }]} />
            <Text style={[s.body, { color: colors.text }]}>{point}</Text>
          </View>
        ))}
      </Card>

      {!!lesson.formulas?.length && (
        <>
          <Heading icon="calculator-outline">Formulas</Heading>
          <Card style={{ gap: spacing.sm }}>
            {lesson.formulas.map((f, i) => (
              <View key={`${f.label}-${i}`} style={[s.formula, { backgroundColor: colors.surfaceAlt }]}>
                <Text style={[s.formulaLabel, { color: colors.textMuted }]}>{f.label}</Text>
                <Text style={[s.formulaValue, { color: colors.text }]} selectable>
                  {f.value}
                </Text>
              </View>
            ))}
          </Card>
        </>
      )}

      <Heading icon="school-outline">Worked examples</Heading>
      {lesson.examples.map((ex, i) => (
        <ExampleCard key={i} example={ex} index={i} />
      ))}

      {!!lesson.mistakes?.length && (
        <>
          <Heading icon="warning-outline">Common mistakes</Heading>
          <View style={[s.mistakes, { backgroundColor: colors.dangerSoft }]}>
            {lesson.mistakes.map((m) => (
              <View key={m} style={s.bullet}>
                <Ionicons name="close-circle" size={16} color={colors.danger} style={{ marginTop: 2 }} />
                <Text style={[s.body, { color: colors.text }]}>{m}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      <Heading icon="create-outline">Practice</Heading>
      <Text style={[ui.muted, { color: colors.textMuted, marginTop: -spacing.sm }]}>
        Try each problem first, then reveal the answer to check your work.
      </Text>
      {lesson.practice.map((p, i) => (
        <PracticeItem key={i} problem={p} index={i} />
      ))}

      <View style={s.nav}>
        {prev ? (
          <Button label="Previous" icon="arrow-back" variant="secondary" onPress={() => goTo(prev.id)} style={{ flex: 1 }} />
        ) : (
          <View style={{ flex: 1 }} />
        )}
        {next ? (
          <Button label="Next lesson" icon="arrow-forward" onPress={() => goTo(next.id)} style={{ flex: 1 }} />
        ) : (
          <Button label="Finish course" icon="checkmark-done" onPress={() => router.back()} style={{ flex: 1 }} />
        )}
      </View>
    </Screen>
  );
}

const s = StyleSheet.create({
  label: { fontSize: 11, fontWeight: '800', letterSpacing: 0.8 },
  title: { fontSize: 26, fontWeight: '800' },
  progressTrack: { height: 6, borderRadius: radius.pill, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: radius.pill },
  summary: { fontSize: 16, lineHeight: 24 },
  heading: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.sm },
  headingText: { fontSize: 18, fontWeight: '800' },
  bullet: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' },
  dot: { width: 6, height: 6, borderRadius: 3, marginTop: 8 },
  body: { flex: 1, fontSize: 15, lineHeight: 22 },
  formula: { padding: spacing.md, borderRadius: radius.sm, gap: 4 },
  formulaLabel: { fontSize: 12, fontWeight: '700' },
  formulaValue: { fontFamily: MONO, fontSize: 15, lineHeight: 22 },
  problem: { fontSize: 16, fontWeight: '700', lineHeight: 23 },
  answer: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, padding: spacing.md, borderRadius: radius.md },
  answerText: { flex: 1, fontSize: 15, fontWeight: '800' },
  mistakes: { padding: spacing.lg, borderRadius: radius.lg, gap: spacing.md },
  practice: { padding: spacing.lg, borderRadius: radius.md, borderWidth: StyleSheet.hairlineWidth, gap: spacing.md },
  practiceTop: { flexDirection: 'row', gap: spacing.sm },
  practiceNum: { fontSize: 15, fontWeight: '800' },
  practiceQ: { flex: 1, fontSize: 15, fontWeight: '600', lineHeight: 22 },
  practiceActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: spacing.lg },
  link: { fontSize: 14, fontWeight: '700' },
  nav: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
});
