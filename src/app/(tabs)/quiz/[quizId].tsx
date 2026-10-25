import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { memo, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { DifficultyBadge, difficultyColor } from '../../../components/QuizCard';
import { Button, Card, EmptyState, Screen, styles as ui } from '../../../components/ui';
import { useAppActions, useQuizSummary } from '../../../context/AppStore';
import { buildQuizRun, getQuiz, PlayQuestion, Quiz } from '../../../data/quizzes';
import { useTheme } from '../../../hooks/useTheme';
import { radius, spacing } from '../../../theme';

const LETTERS = ['A', 'B', 'C', 'D'];

type Run = { questions: PlayQuestion[]; answers: (number | null)[]; index: number; startedAt: number };
type Result = { correct: number; total: number; durationSec: number };

const formatDuration = (sec: number) => (sec < 60 ? `${sec}s` : `${Math.floor(sec / 60)}m ${sec % 60}s`);

function scoreMessage(percent: number) {
  if (percent === 100) return { title: 'Perfect score! 🏆', body: 'You nailed every question.' };
  if (percent >= 80) return { title: 'Excellent work! 🎉', body: 'You clearly understand this topic.' };
  if (percent >= 60) return { title: 'Good job! 👍', body: 'Review the explanations below to fill the gaps.' };
  if (percent >= 40) return { title: 'Getting there 💪', body: 'Read through the explanations, then try again.' };
  return { title: 'Keep practicing 📚', body: 'Review the lesson and explanations, then have another go.' };
}

// ---------- Playing ----------

function QuestionView({ run, onSelect, onNext, onPrev, onQuit }: {
  run: Run;
  onSelect: (i: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onQuit: () => void;
}) {
  const { colors } = useTheme();
  const q = run.questions[run.index];
  const selected = run.answers[run.index];
  const isLast = run.index === run.questions.length - 1;
  const answeredCount = run.answers.filter((a) => a !== null).length;

  return (
    <Screen key={run.index}>
      <View style={{ gap: spacing.sm }}>
        <View style={s.rowBetween}>
          <Text style={[s.counter, { color: colors.textMuted }]}>
            Question {run.index + 1} of {run.questions.length}
          </Text>
          <Text style={[s.counter, { color: colors.textMuted }]}>{answeredCount} answered</Text>
        </View>
        <View style={s.dots}>
          {run.questions.map((_, i) => (
            <View
              key={i}
              style={[
                s.dot,
                {
                  backgroundColor:
                    i === run.index ? colors.primary : run.answers[i] !== null ? colors.primary + '66' : colors.surfaceAlt,
                },
              ]}
            />
          ))}
        </View>
      </View>

      <Card style={{ paddingVertical: spacing.xl }}>
        <Text style={[s.prompt, { color: colors.text }]} accessibilityRole="header">
          {q.prompt}
        </Text>
      </Card>

      <View style={{ gap: spacing.sm }} accessibilityRole="radiogroup">
        {q.options.map((opt, i) => {
          const isSel = selected === i;
          return (
            <Pressable
              key={`${run.index}-${i}`}
              onPress={() => onSelect(i)}
              style={({ pressed }) => [
                s.option,
                {
                  backgroundColor: isSel ? colors.primarySoft : colors.surface,
                  borderColor: isSel ? colors.primary : colors.border,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
              accessibilityRole="radio"
              accessibilityState={{ checked: isSel }}
              accessibilityLabel={`Option ${LETTERS[i]}: ${opt}`}
            >
              <View style={[s.letter, { backgroundColor: isSel ? colors.primary : colors.surfaceAlt }]}>
                <Text style={[s.letterText, { color: isSel ? colors.onPrimary : colors.textMuted }]}>{LETTERS[i]}</Text>
              </View>
              <Text style={[s.optionText, { color: colors.text }]}>{opt}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={s.navRow}>
        <Button label="Back" icon="arrow-back" variant="secondary" onPress={onPrev} disabled={run.index === 0} style={{ flex: 1 }} />
        <Button
          label={isLast ? 'Finish quiz' : 'Next'}
          icon={isLast ? 'checkmark-done' : 'arrow-forward'}
          onPress={onNext}
          disabled={selected === null}
          style={{ flex: 2 }}
        />
      </View>
      <Pressable onPress={onQuit} style={{ alignSelf: 'center', padding: spacing.sm }} accessibilityRole="button">
        <Text style={{ color: colors.textMuted, fontWeight: '600' }}>Quit quiz</Text>
      </Pressable>
    </Screen>
  );
}

// ---------- Results ----------

const ReviewItem = memo(function ReviewItem({ q, answer, index }: { q: PlayQuestion; answer: number | null; index: number }) {
  const { colors } = useTheme();
  const isCorrect = answer === q.correctIndex;
  const status = isCorrect ? colors.success : colors.danger;
  return (
    <View style={[s.review, { backgroundColor: colors.surface, borderColor: colors.border, borderLeftColor: status }]}>
      <View style={s.rowBetween}>
        <Text style={[s.reviewNum, { color: colors.textMuted }]}>QUESTION {index + 1}</Text>
        <View style={[s.statusPill, { backgroundColor: (isCorrect ? colors.successSoft : colors.dangerSoft) }]}>
          <Ionicons name={isCorrect ? 'checkmark-circle' : 'close-circle'} size={14} color={status} />
          <Text style={{ color: status, fontWeight: '800', fontSize: 12 }}>{isCorrect ? 'Correct' : answer === null ? 'Skipped' : 'Incorrect'}</Text>
        </View>
      </View>
      <Text style={[s.reviewPrompt, { color: colors.text }]} selectable>
        {q.prompt}
      </Text>

      {!isCorrect && answer !== null && (
        <View style={s.answerLine}>
          <Ionicons name="close" size={16} color={colors.danger} />
          <Text style={[s.answerLabel, { color: colors.textMuted }]}>Your answer:</Text>
          <Text style={[s.answerValue, { color: colors.danger, textDecorationLine: 'line-through' }]}>{q.options[answer]}</Text>
        </View>
      )}
      <View style={s.answerLine}>
        <Ionicons name="checkmark" size={16} color={colors.success} />
        <Text style={[s.answerLabel, { color: colors.textMuted }]}>{isCorrect ? 'Your answer:' : 'Correct answer:'}</Text>
        <Text style={[s.answerValue, { color: colors.success }]} selectable>
          {q.options[q.correctIndex]}
        </Text>
      </View>

      <View style={[s.explain, { backgroundColor: colors.surfaceAlt }]}>
        <Ionicons name="bulb-outline" size={16} color={colors.primary} style={{ marginTop: 2 }} />
        <Text style={[s.explainText, { color: colors.text }]} selectable>
          {q.explanation}
        </Text>
      </View>
    </View>
  );
});

function ResultsView({ quiz, run, result, onRetry }: { quiz: Quiz; run: Run; result: Result; onRetry: () => void }) {
  const { colors } = useTheme();
  const summary = useQuizSummary();
  const percent = Math.round((result.correct / result.total) * 100);
  const msg = scoreMessage(percent);
  const ringColor = percent >= 80 ? colors.success : percent >= 50 ? colors.warning : colors.danger;
  const best = summary.bestByQuiz.get(quiz.id) ?? percent;
  const attempts = summary.attemptsByQuiz.get(quiz.id) ?? 1;

  return (
    <Screen key="results">
      <Card style={{ alignItems: 'center', paddingVertical: spacing.xl, gap: spacing.sm }}>
        <View style={[s.ring, { borderColor: ringColor }]}>
          <Text style={[s.ringPercent, { color: ringColor }]}>{percent}%</Text>
          <Text style={{ color: colors.textMuted, fontWeight: '700' }}>
            {result.correct}/{result.total}
          </Text>
        </View>
        <Text style={[s.resultTitle, { color: colors.text }]}>{msg.title}</Text>
        <Text style={[ui.muted, { color: colors.textMuted, textAlign: 'center' }]}>{msg.body}</Text>
        <View style={s.resultStats}>
          {[
            { icon: 'time-outline' as const, label: formatDuration(result.durationSec) },
            { icon: 'trophy-outline' as const, label: `Best ${best}%` },
            { icon: 'repeat-outline' as const, label: `Attempt ${attempts}` },
          ].map((st) => (
            <View key={st.label} style={[s.resultPill, { backgroundColor: colors.surfaceAlt }]}>
              <Ionicons name={st.icon} size={14} color={colors.textMuted} />
              <Text style={{ color: colors.text, fontWeight: '700', fontSize: 12 }}>{st.label}</Text>
            </View>
          ))}
        </View>
      </Card>

      <View style={{ gap: spacing.sm }}>
        <Button label="Try again" icon="refresh" onPress={onRetry} />
        {quiz.courseId && (
          <Button
            label="Review the lesson"
            icon="book-outline"
            variant="secondary"
            onPress={() => router.push({ pathname: '/learn/[courseId]', params: { courseId: quiz.courseId! } })}
          />
        )}
      </View>

      <View style={s.reviewHeader}>
        <Ionicons name="list-outline" size={18} color={colors.primary} />
        <Text style={[s.reviewHeaderText, { color: colors.text }]}>Answers & explanations</Text>
      </View>
      {run.questions.map((q, i) => (
        <ReviewItem key={i} q={q} answer={run.answers[i]} index={i} />
      ))}

      <Button label="Back to all quizzes" icon="grid-outline" variant="secondary" onPress={() => router.back()} />
    </Screen>
  );
}

// ---------- Screen ----------

export default function QuizPlayScreen() {
  const { colors } = useTheme();
  const { quizId } = useLocalSearchParams<{ quizId: string }>();
  const quiz = getQuiz(quizId);
  const { recordAttempt } = useAppActions();

  const [run, setRun] = useState<Run | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  // Build the shuffled run on the client only (random order would differ between server and client renders).
  const start = useCallback(() => {
    if (!quiz) return;
    const questions = buildQuizRun(quiz);
    setRun({ questions, answers: questions.map(() => null), index: 0, startedAt: Date.now() });
    setResult(null);
  }, [quiz]);

  useEffect(start, [start]);

  if (!quiz) {
    return (
      <Screen>
        <EmptyState icon="alert-circle-outline" title="Quiz not found" message="This quiz doesn’t exist. Go back to browse all quizzes." />
      </Screen>
    );
  }

  const header = (
    <Stack.Screen
      options={{
        title: quiz.title,
        headerRight: () => <DifficultyBadge difficulty={quiz.difficulty} />,
      }}
    />
  );

  if (!run) {
    return (
      <View style={[s.loading, { backgroundColor: colors.background }]}>
        {header}
        <ActivityIndicator color={difficultyColor(quiz.difficulty, colors)} />
      </View>
    );
  }

  if (result) {
    return (
      <>
        {header}
        <ResultsView quiz={quiz} run={run} result={result} onRetry={start} />
      </>
    );
  }

  const finish = () => {
    const correct = run.answers.filter((a, i) => a === run.questions[i].correctIndex).length;
    const durationSec = Math.max(1, Math.round((Date.now() - run.startedAt) / 1000));
    recordAttempt({
      quizId: quiz.id,
      quizTitle: quiz.title,
      difficulty: quiz.difficulty,
      correct,
      total: run.questions.length,
      durationSec,
    });
    setResult({ correct, total: run.questions.length, durationSec });
  };

  return (
    <>
      {header}
      <QuestionView
        run={run}
        onSelect={(i) => setRun({ ...run, answers: run.answers.map((a, k) => (k === run.index ? i : a)) })}
        onPrev={() => setRun({ ...run, index: Math.max(0, run.index - 1) })}
        onNext={() => (run.index === run.questions.length - 1 ? finish() : setRun({ ...run, index: run.index + 1 }))}
        onQuit={() => router.back()}
      />
    </>
  );
}

const s = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  counter: { fontSize: 13, fontWeight: '700' },
  dots: { flexDirection: 'row', gap: 4 },
  dot: { flex: 1, height: 6, borderRadius: radius.pill },
  prompt: { fontSize: 22, fontWeight: '800', lineHeight: 30, textAlign: 'center' },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 2,
    minHeight: 56,
  },
  letter: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  letterText: { fontSize: 14, fontWeight: '800' },
  optionText: { flex: 1, fontSize: 17, fontWeight: '600' },
  navRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  ring: { width: 132, height: 132, borderRadius: 66, borderWidth: 8, alignItems: 'center', justifyContent: 'center' },
  ringPercent: { fontSize: 34, fontWeight: '900' },
  resultTitle: { fontSize: 22, fontWeight: '800', marginTop: spacing.sm },
  resultStats: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: spacing.sm, marginTop: spacing.sm },
  resultPill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 6, borderRadius: radius.pill },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.sm },
  reviewHeaderText: { fontSize: 18, fontWeight: '800' },
  review: { borderRadius: radius.md, borderWidth: StyleSheet.hairlineWidth, borderLeftWidth: 4, padding: spacing.lg, gap: spacing.sm },
  reviewNum: { fontSize: 11, fontWeight: '800', letterSpacing: 0.8 },
  statusPill: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: radius.pill },
  reviewPrompt: { fontSize: 16, fontWeight: '700', lineHeight: 23 },
  answerLine: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 6 },
  answerLabel: { fontSize: 13, fontWeight: '600' },
  answerValue: { fontSize: 15, fontWeight: '800' },
  explain: { flexDirection: 'row', gap: spacing.sm, padding: spacing.md, borderRadius: radius.sm, marginTop: 2 },
  explainText: { flex: 1, fontSize: 14, lineHeight: 21 },
});
