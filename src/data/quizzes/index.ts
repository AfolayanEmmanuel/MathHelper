import { COLLEGE_QUIZZES } from './college';
import { FOUNDATIONS_QUIZZES } from './foundations';
import { GENERATED_QUIZZES } from './generators';
import { HIGH_SCHOOL_QUIZZES } from './highSchool';
import { MIDDLE_QUIZZES } from './middle';
import type { Difficulty, PlayQuestion, Quiz } from './types';

export * from './types';

export const QUIZZES: Quiz[] = [
  ...GENERATED_QUIZZES,
  ...FOUNDATIONS_QUIZZES,
  ...MIDDLE_QUIZZES,
  ...HIGH_SCHOOL_QUIZZES,
  ...COLLEGE_QUIZZES,
];

const quizById = new Map(QUIZZES.map((q) => [q.id, q]));

export const getQuiz = (id: string | undefined) => (id ? quizById.get(id) : undefined);

export const DIFFICULTIES: { id: Difficulty; label: string }[] = [
  { id: 'easy', label: 'Easy' },
  { id: 'medium', label: 'Medium' },
  { id: 'hard', label: 'Hard' },
];

export const difficultyLabel = (d: Difficulty) => DIFFICULTIES.find((x) => x.id === d)!.label;

/** Rough time estimate: about 40 seconds per question. */
export const quizMinutes = (quiz: Quiz) => Math.max(1, Math.round((quiz.questionCount * 40) / 60));

export const QUIZ_STATS = {
  quizzes: QUIZZES.length,
  questions: QUIZZES.reduce((n, q) => n + q.questionCount, 0),
};

function shuffle<T>(items: readonly T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Builds one playable attempt: question order and answer options are shuffled every time. */
export function buildQuizRun(quiz: Quiz): PlayQuestion[] {
  const source = quiz.generate ? quiz.generate() : shuffle(quiz.questions ?? []);
  return source.map((q) => {
    const options = shuffle([q.correct, ...q.wrong]);
    return { prompt: q.prompt, options, correctIndex: options.indexOf(q.correct), explanation: q.explanation };
  });
}
