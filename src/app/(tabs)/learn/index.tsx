import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { memo, useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, SectionList, StyleSheet, Text, TextInput, View } from 'react-native';

import { Chip, EmptyState, styles as ui } from '../../../components/ui';
import { Course, courseMinutes, getLevel, LEARN_STATS, LEVELS, LevelId, Lesson, searchCourses } from '../../../data/learn';
import { useTheme } from '../../../hooks/useTheme';
import { radius, spacing } from '../../../theme';

type Row = { course: Course; matchedLessons: Lesson[] };

const CourseCard = memo(function CourseCard({ course, matchedLessons }: Row) {
  const { colors } = useTheme();
  const accent = getLevel(course.level).accent;
  return (
    <Pressable
      onPress={() => router.push({ pathname: '/learn/[courseId]', params: { courseId: course.id } })}
      style={({ pressed }) => [s.card, { backgroundColor: colors.surface, borderColor: colors.border, opacity: pressed ? 0.85 : 1 }]}
      accessibilityRole="button"
      accessibilityLabel={`${course.title}, ${course.lessons.length} lessons`}
    >
      <View style={[s.courseIcon, { backgroundColor: accent + '22' }]}>
        <Ionicons name={course.icon} size={24} color={accent} />
      </View>
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={[s.courseTitle, { color: colors.text }]}>{course.title}</Text>
        <Text style={[ui.muted, { color: colors.textMuted }]} numberOfLines={2}>
          {course.description}
        </Text>
        <View style={s.meta}>
          <Ionicons name="book-outline" size={13} color={colors.textMuted} />
          <Text style={[s.metaText, { color: colors.textMuted }]}>{course.lessons.length} lessons</Text>
          <Ionicons name="time-outline" size={13} color={colors.textMuted} />
          <Text style={[s.metaText, { color: colors.textMuted }]}>{courseMinutes(course)} min</Text>
        </View>
        {matchedLessons.length > 0 && (
          <Text style={[s.metaText, { color: colors.primary }]} numberOfLines={1}>
            Matches: {matchedLessons.map((l) => l.title).join(', ')}
          </Text>
        )}
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </Pressable>
  );
});

export default function LearnCatalog() {
  const { colors } = useTheme();
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState<LevelId | 'all'>('all');

  const sections = useMemo(() => {
    const results = searchCourses(query, level);
    return LEVELS.map((lv) => ({ level: lv, data: results.filter((r) => r.course.level === lv.id) })).filter(
      (sec) => sec.data.length > 0,
    );
  }, [query, level]);

  const renderItem = useCallback(({ item }: { item: Row }) => <CourseCard {...item} />, []);

  return (
    <SectionList
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[ui.screenContent, { gap: spacing.md }]}
      sections={sections}
      keyExtractor={(item) => item.course.id}
      renderItem={renderItem}
      stickySectionHeadersEnabled={false}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      initialNumToRender={8}
      ListHeaderComponent={
        <View style={{ gap: spacing.md }}>
          <Text style={[ui.muted, { color: colors.textMuted }]}>
            Review any topic from first numbers to university math. Every lesson has key ideas, formulas, worked
            examples and practice problems.
          </Text>
          <View style={s.stats}>
            {[
              { label: 'Levels', value: LEARN_STATS.levels },
              { label: 'Courses', value: LEARN_STATS.courses },
              { label: 'Lessons', value: LEARN_STATS.lessons },
              { label: 'Practice', value: LEARN_STATS.practice },
            ].map((st) => (
              <View key={st.label} style={[s.stat, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Text style={[s.statValue, { color: colors.primary }]}>{st.value}</Text>
                <Text style={[s.statLabel, { color: colors.textMuted }]}>{st.label}</Text>
              </View>
            ))}
          </View>
          <View style={[s.search, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Ionicons name="search" size={18} color={colors.textMuted} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search topics, e.g. fractions, derivatives"
              placeholderTextColor={colors.textMuted}
              style={{ flex: 1, color: colors.text, fontSize: 16 }}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="search"
              accessibilityLabel="Search courses and lessons"
            />
            {!!query && (
              <Pressable onPress={() => setQuery('')} hitSlop={8} accessibilityLabel="Clear search">
                <Ionicons name="close-circle" size={18} color={colors.textMuted} />
              </Pressable>
            )}
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chips}>
            <Chip label="All levels" selected={level === 'all'} onPress={() => setLevel('all')} />
            {LEVELS.map((lv) => (
              <Chip key={lv.id} label={lv.title} selected={level === lv.id} onPress={() => setLevel(lv.id)} />
            ))}
          </ScrollView>
        </View>
      }
      renderSectionHeader={({ section }) => (
        <View style={s.sectionHeader}>
          <View style={[s.levelIcon, { backgroundColor: section.level.accent + '22' }]}>
            <Ionicons name={section.level.icon} size={18} color={section.level.accent} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[s.levelTitle, { color: colors.text }]}>{section.level.title}</Text>
            <Text style={[s.metaText, { color: colors.textMuted }]}>
              {section.level.subtitle} · {section.data.length} {section.data.length === 1 ? 'course' : 'courses'}
            </Text>
          </View>
        </View>
      )}
      ListEmptyComponent={<EmptyState icon="search-outline" title="No matches" message={`Nothing matches “${query}”. Try another topic.`} />}
    />
  );
}

const s = StyleSheet.create({
  stats: { flexDirection: 'row', gap: spacing.sm },
  stat: { flex: 1, alignItems: 'center', paddingVertical: spacing.md, borderRadius: radius.md, borderWidth: StyleSheet.hairlineWidth },
  statValue: { fontSize: 20, fontWeight: '800' },
  statLabel: { fontSize: 11, fontWeight: '700', marginTop: 2 },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  chips: { gap: spacing.sm, paddingRight: spacing.lg },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.md },
  levelIcon: { width: 34, height: 34, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
  levelTitle: { fontSize: 18, fontWeight: '800' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
  },
  courseIcon: { width: 48, height: 48, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  courseTitle: { fontSize: 16, fontWeight: '700' },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 12, fontWeight: '600', marginRight: 6 },
});
