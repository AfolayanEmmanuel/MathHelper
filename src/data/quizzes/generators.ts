import type { Quiz, QuizQuestion } from './types';

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = <T,>(items: readonly T[]) => items[rand(0, items.length - 1)];

/** Three distinct wrong answers near the correct one (plus any "likely mistake" values first). */
function distractors(answer: number, likely: number[] = [], spread = Math.max(3, Math.round(Math.abs(answer) * 0.15))) {
  const out = new Set<number>();
  for (const v of likely) if (v !== answer && v >= 0) out.add(v);
  while (out.size < 3) {
    const v = answer + rand(-spread, spread);
    if (v !== answer && v >= 0) out.add(v);
  }
  return [...out].slice(0, 3).map(String) as [string, string, string];
}

const withOnes = (min: number, max: number) => {
  let n = rand(min, max);
  while (n % 10 === 0) n = rand(min, max);
  return n;
};

function addition(): QuizQuestion {
  const a = withOnes(12, 89);
  const b = withOnes(12, 89);
  const tens = b - (b % 10);
  const ans = a + b;
  return {
    prompt: `${a} + ${b} = ?`,
    correct: String(ans),
    wrong: distractors(ans, [ans - 10, ans + 10]),
    explanation: `Add the tens first: ${a} + ${tens} = ${a + tens}. Then add the ones: ${a + tens} + ${b % 10} = ${ans}.`,
  };
}

function subtraction(): QuizQuestion {
  const a = rand(40, 99);
  const b = withOnes(11, a - 5);
  const tens = b - (b % 10);
  const ans = a - b;
  return {
    prompt: `${a} − ${b} = ?`,
    correct: String(ans),
    wrong: distractors(ans, [ans + 10, Math.abs(ans - 10)]),
    explanation: `Subtract the tens first: ${a} − ${tens} = ${a - tens}. Then subtract the ones: ${a - tens} − ${b % 10} = ${ans}. Check: ${ans} + ${b} = ${a}.`,
  };
}

function timesTable(): QuizQuestion {
  const a = rand(3, 12);
  const b = rand(3, 12);
  const ans = a * b;
  return {
    prompt: `${a} × ${b} = ?`,
    correct: String(ans),
    wrong: distractors(ans, [a * (b - 1), a * (b + 1), a + b]),
    explanation: `${a} × ${b} = ${ans}. If you forget it, build from a fact you know: ${a} × ${b - 1} = ${a * (b - 1)}, plus one more ${a} gives ${ans}.`,
  };
}

function twoDigitTimes(): QuizQuestion {
  const a = withOnes(13, 49);
  const b = rand(3, 9);
  const tens = a - (a % 10);
  const ans = a * b;
  return {
    prompt: `${a} × ${b} = ?`,
    correct: String(ans),
    wrong: distractors(ans, [tens * b + (a % 10), ans + 10]),
    explanation: `Split ${a} into ${tens} + ${a % 10}: ${tens} × ${b} = ${tens * b} and ${a % 10} × ${b} = ${(a % 10) * b}. Add them: ${tens * b} + ${(a % 10) * b} = ${ans}.`,
  };
}

function division(): QuizQuestion {
  const b = rand(3, 12);
  const q = rand(3, 12);
  const n = b * q;
  return {
    prompt: `${n} ÷ ${b} = ?`,
    correct: String(q),
    wrong: distractors(q, [q + 1, q - 1, q + 2], 3),
    explanation: `Think of the related multiplication fact: ${b} × ${q} = ${n}, so ${n} ÷ ${b} = ${q}.`,
  };
}

function percentOf(): QuizQuestion {
  const pct = pick([10, 15, 20, 25, 30, 40, 50, 75] as const);
  const n = 20 * rand(2, 20);
  const ans = (pct * n) / 100;
  const tenth = n / 10;
  return {
    prompt: `What is ${pct}% of ${n}?`,
    correct: String(ans),
    wrong: distractors(ans, [tenth, ans * 2, n - ans].filter((v) => Number.isInteger(v))),
    explanation: `10% of ${n} is ${tenth}. ${pct}% is ${pct / 10} times that: ${pct / 10} × ${tenth} = ${ans}.`,
  };
}

function square(): QuizQuestion {
  let n = rand(11, 25);
  while (n === 20) n = rand(11, 25);
  const t = n < 20 ? 10 : 20;
  const k = n - t;
  const ans = n * n;
  return {
    prompt: `${n}² = ?`,
    correct: String(ans),
    wrong: distractors(ans, [n * 2, t * t + k * k, ans + 10]),
    explanation: `Use (a + b)² = a² + 2ab + b² with ${n} = ${t} + ${k}: ${t * t} + ${2 * t * k} + ${k * k} = ${ans}.`,
  };
}

function orderOfOps(): QuizQuestion {
  const a = rand(2, 20);
  const b = rand(2, 9);
  const c = rand(2, 9);
  const ans = a + b * c;
  const wrongWay = (a + b) * c;
  return {
    prompt: `${a} + ${b} × ${c} = ?`,
    correct: String(ans),
    wrong: distractors(ans, [wrongWay, ans + c]),
    explanation: `Multiply before adding: ${b} × ${c} = ${b * c}, then ${a} + ${b * c} = ${ans}. (Working left to right would give the wrong answer ${wrongWay}.)`,
  };
}

const build = (makers: (() => QuizQuestion)[], count = 8) => {
  const seen = new Set<string>();
  const out: QuizQuestion[] = [];
  while (out.length < count) {
    const q = makers[out.length % makers.length]();
    if (!seen.has(q.prompt)) {
      seen.add(q.prompt);
      out.push(q);
    }
  }
  return out;
};

export const GENERATED_QUIZZES: Quiz[] = [
  {
    id: 'mental-math-easy',
    title: 'Mental Math Sprint: Add & Subtract',
    description: 'Fresh two-digit addition and subtraction every attempt.',
    level: 'foundations',
    difficulty: 'easy',
    icon: 'flash-outline',
    courseId: 'add-subtract',
    questionCount: 8,
    generate: () => build([addition, subtraction]),
  },
  {
    id: 'mental-math-medium',
    title: 'Mental Math Sprint: Multiply & Divide',
    description: 'Times tables, two-digit products and division facts — new every time.',
    level: 'foundations',
    difficulty: 'medium',
    icon: 'flash-outline',
    courseId: 'multiply-divide',
    questionCount: 8,
    generate: () => build([timesTable, twoDigitTimes, division]),
  },
  {
    id: 'mental-math-hard',
    title: 'Mental Math Sprint: Challenge Mix',
    description: 'Percents, squares and order of operations — new every time.',
    level: 'middle',
    difficulty: 'hard',
    icon: 'flash-outline',
    courseId: 'percents',
    questionCount: 8,
    generate: () => build([percentOf, square, orderOfOps]),
  },
];
