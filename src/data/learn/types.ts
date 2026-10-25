import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';

export type IconName = ComponentProps<typeof Ionicons>['name'];

export type LevelId = 'foundations' | 'middle' | 'high' | 'college';

export type Level = {
  id: LevelId;
  title: string;
  subtitle: string;
  description: string;
  icon: IconName;
  accent: string;
};

export type WorkedExample = {
  problem: string;
  steps: string[];
  answer: string;
};

export type PracticeProblem = {
  question: string;
  answer: string;
  hint?: string;
};

export type Lesson = {
  id: string;
  title: string;
  minutes: number;
  summary: string;
  keyPoints: string[];
  formulas?: { label: string; value: string }[];
  examples: WorkedExample[];
  mistakes?: string[];
  practice: PracticeProblem[];
};

export type Course = {
  id: string;
  level: LevelId;
  title: string;
  icon: IconName;
  description: string;
  lessons: Lesson[];
};
