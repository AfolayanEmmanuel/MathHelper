import type { Level } from './types';

export const LEVELS: Level[] = [
  {
    id: 'foundations',
    title: 'Foundations',
    subtitle: 'Grades K–5',
    description: 'Number sense, the four operations, fractions, decimals and measurement.',
    icon: 'leaf-outline',
    accent: '#10B981',
  },
  {
    id: 'middle',
    title: 'Middle School',
    subtitle: 'Grades 6–8',
    description: 'Integers, ratios, percents, exponents, pre-algebra, geometry and data.',
    icon: 'rocket-outline',
    accent: '#F59E0B',
  },
  {
    id: 'high',
    title: 'High School',
    subtitle: 'Grades 9–12',
    description: 'Algebra I & II, functions, geometry, trigonometry, pre-calculus and statistics.',
    icon: 'school-outline',
    accent: '#6366F1',
  },
  {
    id: 'college',
    title: 'College & Beyond',
    subtitle: 'University',
    description: 'Calculus, multivariable calculus, linear algebra, differential equations, discrete math and statistics.',
    icon: 'library-outline',
    accent: '#EC4899',
  },
];
