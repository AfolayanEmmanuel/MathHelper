import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { getLevel } from '../data/learn';
import { difficultyLabel, Difficulty, Quiz, quizMinutes } from '../data/quizzes';
import { useTheme } from '../hooks/useTheme';
import type { Palette } from '../theme';
import { radius, spacing } from '../theme';

export const difficultyColor = (d: Difficulty, colors: Palette) =>
  d === 'easy' ? colors.success : d === 'medium' ? colors.warning : colors.danger;

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const { colors } = useTheme();
  const color = difficultyColor(difficulty, colors);
  return (
    <View style={[s.badge, { backgroundColor: color + '22' }]}>
      <Text style={[s.badgeText, { color }]}>{difficultyLabel(difficulty)}</Text>
    </View>
  );
}

export const QuizCard = memo(function QuizCard({ quiz, best }: { quiz: Quiz; best?: number }) {
  const { colors } = useTheme();
  const accent = getLevel(quiz.level).accent;
  return (
    <Pressable
      onPress={() => router.push({ pathname: '/quiz/[quizId]', params: { quizId: quiz.id } })}
      style={({ pressed }) => [s.card, { backgroundColor: colors.surface, borderColor: colors.border, opacity: pressed ? 0.85 : 1 }]}
      accessibilityRole="button"
      accessibilityLabel={`${quiz.title}, ${difficultyLabel(quiz.difficulty)}, ${quiz.questionCount} questions`}
    >
      <View style={[s.icon, { backgroundColor: accent + '22' }]}>
        <Ionicons name={quiz.icon} size={22} color={accent} />
      </View>
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={[s.title, { color: colors.text }]}>{quiz.title}</Text>
        <Text style={[s.desc, { color: colors.textMuted }]} numberOfLines={2}>
          {quiz.description}
        </Text>
        <View style={s.meta}>
          <DifficultyBadge difficulty={quiz.difficulty} />
          <Text style={[s.metaText, { color: colors.textMuted }]}>
            {quiz.questionCount} Qs · ~{quizMinutes(quiz)} min
          </Text>
          {best !== undefined && (
            <View style={s.best}>
              <Ionicons name="trophy" size={12} color={colors.primary} />
              <Text style={[s.metaText, { color: colors.primary }]}>{best}%</Text>
            </View>
          )}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </Pressable>
  );
});

const s = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
  },
  icon: { width: 46, height: 46, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: '700' },
  desc: { fontSize: 13, lineHeight: 18 },
  meta: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: spacing.sm, marginTop: 2 },
  metaText: { fontSize: 12, fontWeight: '600' },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: radius.pill },
  badgeText: { fontSize: 11, fontWeight: '800' },
  best: { flexDirection: 'row', alignItems: 'center', gap: 3 },
});
