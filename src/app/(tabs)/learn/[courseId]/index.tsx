import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Button, Card, EmptyState, Screen, SectionTitle, styles as ui } from '../../../../components/ui';
import { courseMinutes, getCourse, getLevel } from '../../../../data/learn';
import { useTheme } from '../../../../hooks/useTheme';
import { radius, spacing } from '../../../../theme';

export default function CourseScreen() {
  const { colors } = useTheme();
  const { courseId } = useLocalSearchParams<{ courseId: string }>();
  const course = getCourse(courseId);

  if (!course) {
    return (
      <Screen>
        <EmptyState icon="alert-circle-outline" title="Course not found" message="This course doesn’t exist. Go back to browse all courses." />
      </Screen>
    );
  }

  const level = getLevel(course.level);
  const practiceCount = course.lessons.reduce((n, l) => n + l.practice.length, 0);
  const openLesson = (lessonId: string) =>
    router.push({ pathname: '/learn/[courseId]/[lessonId]', params: { courseId: course.id, lessonId } });

  return (
    <Screen>
      <Stack.Screen options={{ title: level.title }} />

      <Card style={{ gap: spacing.md }}>
        <View style={s.heroTop}>
          <View style={[s.heroIcon, { backgroundColor: level.accent + '22' }]}>
            <Ionicons name={course.icon} size={30} color={level.accent} />
          </View>
          <View style={[s.badge, { backgroundColor: level.accent + '22' }]}>
            <Text style={[s.badgeText, { color: level.accent }]}>
              {level.title} · {level.subtitle}
            </Text>
          </View>
        </View>
        <Text style={[s.title, { color: colors.text }]}>{course.title}</Text>
        <Text style={[ui.muted, { color: colors.textMuted }]}>{course.description}</Text>
        <View style={s.statsRow}>
          {[
            { icon: 'book-outline' as const, label: `${course.lessons.length} lessons` },
            { icon: 'time-outline' as const, label: `${courseMinutes(course)} min` },
            { icon: 'create-outline' as const, label: `${practiceCount} practice` },
          ].map((st) => (
            <View key={st.label} style={[s.statPill, { backgroundColor: colors.surfaceAlt }]}>
              <Ionicons name={st.icon} size={14} color={colors.textMuted} />
              <Text style={[s.statText, { color: colors.text }]}>{st.label}</Text>
            </View>
          ))}
        </View>
        <Button label="Start course" icon="play" onPress={() => openLesson(course.lessons[0].id)} />
      </Card>

      <SectionTitle>Lessons</SectionTitle>
      <View style={{ gap: spacing.sm }}>
        {course.lessons.map((lesson, i) => (
          <Pressable
            key={lesson.id}
            onPress={() => openLesson(lesson.id)}
            style={({ pressed }) => [s.lessonRow, { backgroundColor: colors.surface, borderColor: colors.border, opacity: pressed ? 0.85 : 1 }]}
            accessibilityRole="button"
            accessibilityLabel={`Lesson ${i + 1}: ${lesson.title}`}
          >
            <View style={[s.number, { backgroundColor: colors.primarySoft }]}>
              <Text style={[s.numberText, { color: colors.primary }]}>{i + 1}</Text>
            </View>
            <View style={{ flex: 1, gap: 2 }}>
              <Text style={[s.lessonTitle, { color: colors.text }]}>{lesson.title}</Text>
              <Text style={[s.lessonMeta, { color: colors.textMuted }]} numberOfLines={2}>
                {lesson.summary}
              </Text>
              <Text style={[s.lessonMeta, { color: colors.textMuted }]}>
                {lesson.minutes} min · {lesson.examples.length} examples · {lesson.practice.length} practice
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const s = StyleSheet.create({
  heroTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md },
  heroIcon: { width: 60, height: 60, borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center' },
  badge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: radius.pill, flexShrink: 1 },
  badgeText: { fontSize: 12, fontWeight: '800' },
  title: { fontSize: 24, fontWeight: '800' },
  statsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  statPill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 6, borderRadius: radius.pill },
  statText: { fontSize: 12, fontWeight: '700' },
  lessonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
  },
  number: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  numberText: { fontSize: 14, fontWeight: '800' },
  lessonTitle: { fontSize: 16, fontWeight: '700' },
  lessonMeta: { fontSize: 12, lineHeight: 17 },
});
