import type { IconName, LevelId } from '../learn/types';

export type Difficulty = 'easy' | 'medium' | 'hard';

/** Authored question: the correct option is listed separately so answer keys can't drift when options are shuffled. */
export type QuizQuestion = {
  prompt: string;
  correct: string;
  wrong: [string, string, string];
  explanation: string;
};

export type Quiz = {
  id: string;
  title: string;
  description: string;
  level: LevelId;
  difficulty: Difficulty;
  icon: IconName;
  /** Related Learn course for "Review lesson". */
  courseId?: string;
  /** Fixed questions, or a generator that makes fresh ones each attempt. */
  questions?: QuizQuestion[];
  generate?: () => QuizQuestion[];
  questionCount: number;
};

/** A question as played: options shuffled, with the index of the correct one. */
export type PlayQuestion = {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};
