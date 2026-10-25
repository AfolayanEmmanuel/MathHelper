import { Ionicons } from '@expo/vector-icons';
import { useCallback, useMemo, useState } from 'react';
import { ScrollView, SectionList, StyleSheet, Text, View } from 'react-native';

import { DifficultyBadge, QuizCard } from '../../../components/QuizCard';
import { Chip, EmptyState, styles as ui } from '../../../components/ui';
import { useAppState, useQuizSummary } from '../../../context/AppStore';
import { LEVELS, LevelId } from '../../../data/learn';
import { DIFFICULTIES, Difficulty, Quiz, QUIZ_STATS, QUIZZES } from '../../../data/quizzes';
import { useTheme } from '../../../hooks/useTheme';
import { radius, spacing } from '../../../theme';

type Section = { key: string; title: string; subtitle: string; icon: Quiz['icon']; accent: string; data: Quiz[] };

function relativeDay(ts: number) {
  const days = Math.floor((Date.now() - ts) / 86_400_000);
  return days <= 0 ? 'Today' : days === 1 ? 'Yesterday' : `${days} days ago`;
}

export default function QuizCatalog() {
  const { colors } = useTheme();
  const { quizHistory } = useAppState();
  const summary = useQuizSummary();
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all');
  const [level, setLevel] = useState<LevelId | 'all'>('all');

  const sections = useMemo<Section[]>(() => {
    const matches = (q: Quiz) => (difficulty === 'all' || q.difficulty === difficulty) && (level === 'all' || q.level === level);
    const sprints = QUIZZES.filter((q) => q.generate && matches(q));
    const out: Section[] = [];
    if (sprints.length)
      out.push({
        key: 'sprints',
        title: 'Mental Math Sprints',
        subtitle: 'New questions every attempt',
        icon: 'flash-outline',
        accent: colors.primary,
        data: sprints,
      });
    for (const lv of LEVELS) {
      const data = QUIZZES.filter((q) => !q.generate && q.level === lv.id && matches(q));
      if (data.length)
        out.push({ key: lv.id, title: lv.title, subtitle: lv.subtitle, icon: lv.icon, accent: lv.accent, data });
    }
    return out;
  }, [difficulty, level, colors.primary]);

  const renderItem = useCallback(
    ({ item }: { item: Quiz }) => <QuizCard quiz={item} best={summary.bestByQuiz.get(item.id)} />,
    [summary.bestByQuiz],
  );

  const recent = quizHistory.slice(0, 3);

  return (
    <SectionList
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[ui.screenContent, { gap: spacing.md }]}
      sections={sections}
      keyExtractor={(q) => q.id}
      renderItem={renderItem}
      stickySectionHeadersEnabled={false}
      initialNumToRender={8}
      ListHeaderComponent={
        <View style={{ gap: spacing.md }}>
          <Text style={[ui.muted, { color: colors.textMuted }]}>
            {QUIZ_STATS.quizzes} short quizzes · {QUIZ_STATS.questions}+ questions. Questions and answer choices are shuffled every
            attempt, and you’ll see every answer explained at the end.
          </Text>

          <View style={s.stats}>
            {[
              { label: 'Taken', value: String(summary.taken) },
              { label: 'Average', value: summary.taken ? `${summary.average}%` : '—' },
              { label: 'Best', value: summary.taken ? `${summary.best}%` : '—' },
            ].map((st) => (
              <View key={st.label} style={[s.stat, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Text style={[s.statValue, { color: colors.primary }]}>{st.value}</Text>
                <Text style={[s.statLabel, { color: colors.textMuted }]}>{st.label}</Text>
              </View>
            ))}
          </View>

          {recent.length > 0 && (
            <View style={[s.recent, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[s.recentTitle, { color: colors.text }]}>Recent results</Text>
              {recent.map((a) => (
                <View key={a.id} style={s.recentRow}>
                  <Ionicons
                    name={a.percent >= 80 ? 'trophy' : a.percent >= 50 ? 'ribbon-outline' : 'refresh-circle-outline'}
                    size={18}
                    color={a.percent >= 80 ? colors.success : a.percent >= 50 ? colors.warning : colors.danger}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: colors.text, fontWeight: '600' }} numberOfLines={1}>
                      {a.quizTitle}
                    </Text>
                    <Text style={{ color: colors.textMuted, fontSize: 12 }}>
                      {relativeDay(a.finishedAt)} · {a.correct}/{a.total} correct
                    </Text>
                  </View>
                  <Text style={{ color: colors.text, fontWeight: '800' }}>{a.percent}%</Text>
                </View>
              ))}
            </View>
          )}

          <View style={{ gap: spacing.sm }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chips}>
              <Chip label="All difficulties" selected={difficulty === 'all'} onPress={() => setDifficulty('all')} />
              {DIFFICULTIES.map((d) => (
                <Chip key={d.id} label={d.label} selected={difficulty === d.id} onPress={() => setDifficulty(d.id)} />
              ))}
            </ScrollView>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chips}>
              <Chip label="All levels" selected={level === 'all'} onPress={() => setLevel('all')} />
              {LEVELS.map((lv) => (
                <Chip key={lv.id} label={lv.title} selected={level === lv.id} onPress={() => setLevel(lv.id)} />
              ))}
            </ScrollView>
          </View>
        </View>
      }
      renderSectionHeader={({ section }) => (
        <View style={s.sectionHeader}>
          <View style={[s.sectionIcon, { backgroundColor: section.accent + '22' }]}>
            <Ionicons name={section.icon} size={18} color={section.accent} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[s.sectionTitle, { color: colors.text }]}>{section.title}</Text>
            <Text style={{ color: colors.textMuted, fontSize: 12, fontWeight: '600' }}>
              {section.subtitle} · {section.data.length} {section.data.length === 1 ? 'quiz' : 'quizzes'}
            </Text>
          </View>
        </View>
      )}
      ListEmptyComponent={
        <EmptyState icon="funnel-outline" title="No quizzes match" message="Try a different difficulty or level filter." />
      }
      ListFooterComponent={
        <View style={s.legend}>
          {DIFFICULTIES.map((d) => (
            <DifficultyBadge key={d.id} difficulty={d.id} />
          ))}
          <Text style={{ color: colors.textMuted, fontSize: 12 }}>Difficulty is relative to each level.</Text>
        </View>
      }
    />
  );
}

const s = StyleSheet.create({
  stats: { flexDirection: 'row', gap: spacing.sm },
  stat: { flex: 1, alignItems: 'center', paddingVertical: spacing.md, borderRadius: radius.md, borderWidth: StyleSheet.hairlineWidth },
  statValue: { fontSize: 20, fontWeight: '800' },
  statLabel: { fontSize: 11, fontWeight: '700', marginTop: 2 },
  recent: { borderRadius: radius.lg, borderWidth: StyleSheet.hairlineWidth, padding: spacing.lg, gap: spacing.md },
  recentTitle: { fontSize: 15, fontWeight: '800' },
  recentRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  chips: { gap: spacing.sm, paddingRight: spacing.lg },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.md },
  sectionIcon: { width: 34, height: 34, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '800' },
  legend: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
});
