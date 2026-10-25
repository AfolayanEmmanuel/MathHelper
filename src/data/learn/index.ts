import { COLLEGE } from './college';
import { FOUNDATIONS } from './foundations';
import { HIGH_SCHOOL } from './highSchool';
import { LEVELS } from './levels';
import { MIDDLE } from './middle';
import type { Course, Lesson, Level, LevelId } from './types';

export * from './types';
export { LEVELS };

export const COURSES: Course[] = [...FOUNDATIONS, ...MIDDLE, ...HIGH_SCHOOL, ...COLLEGE];

const courseById = new Map(COURSES.map((c) => [c.id, c]));
const levelById = new Map(LEVELS.map((l) => [l.id, l]));

export const LEARN_STATS = {
  levels: LEVELS.length,
  courses: COURSES.length,
  lessons: COURSES.reduce((n, c) => n + c.lessons.length, 0),
  practice: COURSES.reduce((n, c) => n + c.lessons.reduce((m, l) => m + l.practice.length, 0), 0),
};

export const getCourse = (id: string | undefined): Course | undefined => (id ? courseById.get(id) : undefined);

export const getLevel = (id: LevelId): Level => levelById.get(id)!;

export function getLesson(courseId: string | undefined, lessonId: string | undefined) {
  const course = getCourse(courseId);
  const index = course?.lessons.findIndex((l) => l.id === lessonId) ?? -1;
  if (!course || index < 0) return undefined;
  return {
    course,
    lesson: course.lessons[index],
    index,
    prev: course.lessons[index - 1] as Lesson | undefined,
    next: course.lessons[index + 1] as Lesson | undefined,
  };
}

export const courseMinutes = (course: Course) => course.lessons.reduce((n, l) => n + l.minutes, 0);

/** Courses matching a query by title/description, plus the lesson titles that matched. */
export function searchCourses(query: string, level: LevelId | 'all') {
  const q = query.trim().toLowerCase();
  return COURSES.filter((c) => level === 'all' || c.level === level)
    .map((course) => {
      if (!q) return { course, matchedLessons: [] as Lesson[] };
      const courseHit = course.title.toLowerCase().includes(q) || course.description.toLowerCase().includes(q);
      const matchedLessons = course.lessons.filter(
        (l) => l.title.toLowerCase().includes(q) || l.summary.toLowerCase().includes(q),
      );
      return courseHit || matchedLessons.length ? { course, matchedLessons } : null;
    })
    .filter((r): r is { course: Course; matchedLessons: Lesson[] } => r !== null);
}
