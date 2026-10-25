import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { problemKey, useAppActions, useAppState } from '../context/AppStore';
import { useTheme } from '../hooks/useTheme';
import type { ScanResult, SolvedProblem } from '../lib/scanTypes';
import { radius, spacing } from '../theme';
import { Button } from './ui';

const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });

function SaveButton({ problem }: { problem: SolvedProblem }) {
  const { saved } = useAppState();
  const { saveProblem } = useAppActions();
  const isSaved = saved.some((p) => problemKey(p) === problemKey(problem));
  return (
    <Button
      label={isSaved ? 'Saved to your library' : 'Save problem'}
      icon={isSaved ? 'bookmark' : 'bookmark-outline'}
      variant="secondary"
      disabled={isSaved}
      onPress={() => saveProblem(problem)}
    />
  );
}

type ProblemCardProps = {
  problem: SolvedProblem;
  index?: number;
  total?: number;
  /** Show a Save button (scan results). */
  showSave?: boolean;
  /** Hide the step-by-step breakdown (collapsed list items). */
  collapsed?: boolean;
};

export const ProblemCard = memo(function ProblemCard({ problem, index = 0, total = 1, showSave, collapsed }: ProblemCardProps) {
  const { colors } = useTheme();
  return (
    <View style={[s.problem, { borderColor: colors.border, backgroundColor: colors.background }]}>
      <View style={s.headerRow}>
        <Text style={[s.label, { color: colors.textMuted }]}>{total > 1 ? `QUESTION ${index + 1} OF ${total}` : 'QUESTION'}</Text>
        {!!problem.topic && (
          <View style={[s.topic, { backgroundColor: colors.primarySoft }]}>
            <Text style={[s.topicText, { color: colors.primary }]}>{problem.topic}</Text>
          </View>
        )}
      </View>
      <Text style={[s.question, { color: colors.text }]} selectable>
        {problem.question}
      </Text>

      <View style={[s.answer, { backgroundColor: colors.successSoft }]}>
        <Ionicons name="checkmark-circle" size={22} color={colors.success} />
        <View style={{ flex: 1 }}>
          <Text style={[s.label, { color: colors.success }]}>ANSWER</Text>
          <Text style={[s.answerText, { color: colors.success }]} selectable>
            {problem.answer}
          </Text>
        </View>
      </View>

      {!collapsed && (
        <>
          <Text style={[s.label, { color: colors.textMuted }]}>HOW WE GOT THERE</Text>
          <View style={{ gap: spacing.md }}>
            {(problem.steps ?? []).map((step, i) => (
              <View key={i} style={s.step}>
                <View style={s.rail}>
                  <View style={[s.badge, { backgroundColor: colors.primary }]}>
                    <Text style={[s.badgeText, { color: colors.onPrimary }]}>{i + 1}</Text>
                  </View>
                  {i < (problem.steps?.length ?? 0) - 1 && <View style={[s.line, { backgroundColor: colors.border }]} />}
                </View>
                <View style={{ flex: 1, gap: 6, paddingBottom: spacing.xs }}>
                  <Text style={[s.stepTitle, { color: colors.text }]}>{step.title}</Text>
                  <Text style={[s.body, { color: colors.textMuted }]} selectable>
                    {step.explanation}
                  </Text>
                  {!!step.math && (
                    <View style={[s.math, { backgroundColor: colors.surfaceAlt }]}>
                      <Text style={[s.mathText, { color: colors.text }]} selectable>
                        {step.math}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>

          {!!problem.check && (
            <View style={[s.callout, { backgroundColor: colors.primarySoft }]}>
              <Ionicons name="shield-checkmark-outline" size={18} color={colors.primary} />
              <View style={{ flex: 1 }}>
                <Text style={[s.label, { color: colors.primary }]}>CHECK</Text>
                <Text style={[s.body, { color: colors.text }]} selectable>
                  {problem.check}
                </Text>
              </View>
            </View>
          )}

          {(problem.keyConcepts?.length ?? 0) > 0 && (
            <View style={s.concepts}>
              {problem.keyConcepts.map((c) => (
                <View key={c} style={[s.concept, { borderColor: colors.border }]}>
                  <Text style={{ color: colors.textMuted, fontSize: 12, fontWeight: '600' }}>{c}</Text>
                </View>
              ))}
            </View>
          )}
        </>
      )}
      {showSave && <SaveButton problem={problem} />}
    </View>
  );
});

export function ScanResults({ result }: { result: ScanResult | null }) {
  const { colors } = useTheme();
  const problems = result?.problems ?? [];
  const notes = result?.notes || (problems.length === 0 ? 'No math questions were found in this photo.' : '');
  return (
    <View style={{ gap: spacing.md }}>
      {problems.length > 0 && (
        <Text style={[s.summary, { color: colors.text }]}>
          Found {problems.length} {problems.length === 1 ? 'question' : 'questions'}
        </Text>
      )}
      {problems.map((p, i) => (
        <ProblemCard key={i} problem={p} index={i} total={problems.length} showSave />
      ))}
      {!!notes && (
        <View style={[s.callout, { backgroundColor: colors.surfaceAlt }]}>
          <Ionicons name="information-circle-outline" size={18} color={colors.textMuted} />
          <Text style={[s.body, { color: colors.textMuted, flex: 1 }]}>{notes}</Text>
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  summary: { fontSize: 16, fontWeight: '800' },
  problem: { borderWidth: 1, borderRadius: radius.md, padding: spacing.lg, gap: spacing.md },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm },
  label: { fontSize: 11, fontWeight: '800', letterSpacing: 0.8 },
  topic: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: radius.pill, flexShrink: 1 },
  topicText: { fontSize: 11, fontWeight: '700' },
  question: { fontSize: 17, fontWeight: '700', lineHeight: 24 },
  answer: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md, borderRadius: radius.md },
  answerText: { fontSize: 22, fontWeight: '800', marginTop: 2 },
  step: { flexDirection: 'row', gap: spacing.md },
  rail: { alignItems: 'center', width: 26 },
  badge: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  badgeText: { fontSize: 12, fontWeight: '800' },
  line: { flex: 1, width: 2, marginTop: 4 },
  stepTitle: { fontSize: 15, fontWeight: '700' },
  body: { fontSize: 14, lineHeight: 21 },
  math: { paddingHorizontal: spacing.md, paddingVertical: 10, borderRadius: radius.sm },
  mathText: { fontFamily: MONO, fontSize: 15, lineHeight: 22 },
  callout: { flexDirection: 'row', gap: spacing.sm, padding: spacing.md, borderRadius: radius.md },
  concepts: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  concept: { borderWidth: 1, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 4 },
});
