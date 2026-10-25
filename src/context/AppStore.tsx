import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useMemo, useReducer, useRef } from 'react';

import type { Difficulty } from '../data/quizzes/types';
import type { SolvedProblem } from '../lib/scanTypes';

export type ThemePreference = 'system' | 'light' | 'dark';

export type SavedProblem = SolvedProblem & { id: string; savedAt: number };

export type QuizAttempt = {
  id: string;
  quizId: string;
  quizTitle: string;
  difficulty: Difficulty;
  correct: number;
  total: number;
  percent: number;
  durationSec: number;
  finishedAt: number;
};

type State = {
  hydrated: boolean;
  theme: ThemePreference;
  saved: SavedProblem[];
  quizHistory: QuizAttempt[];
};

type Action =
  | { type: 'hydrate'; payload: Partial<State> }
  | { type: 'setTheme'; theme: ThemePreference }
  | { type: 'saveProblem'; problem: SavedProblem }
  | { type: 'removeProblem'; id: string }
  | { type: 'clearSaved' }
  | { type: 'recordAttempt'; attempt: QuizAttempt }
  | { type: 'clearQuizHistory' }
  | { type: 'resetAll' };

const STORAGE_KEY = 'mathhelper/store/v1';
const MAX_HISTORY = 200;

const initialState: State = { hydrated: false, theme: 'system', saved: [], quizHistory: [] };

const newId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

/** Same question + answer counts as the same saved problem. */
export const problemKey = (p: Pick<SolvedProblem, 'question' | 'answer'>) => `${p.question.trim()}|${p.answer.trim()}`;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'hydrate':
      return { ...state, ...action.payload, hydrated: true };
    case 'setTheme':
      return { ...state, theme: action.theme };
    case 'saveProblem':
      if (state.saved.some((p) => problemKey(p) === problemKey(action.problem))) return state;
      return { ...state, saved: [action.problem, ...state.saved] };
    case 'removeProblem':
      return { ...state, saved: state.saved.filter((p) => p.id !== action.id) };
    case 'clearSaved':
      return { ...state, saved: [] };
    case 'recordAttempt':
      return { ...state, quizHistory: [action.attempt, ...state.quizHistory].slice(0, MAX_HISTORY) };
    case 'clearQuizHistory':
      return { ...state, quizHistory: [] };
    case 'resetAll':
      return { ...initialState, hydrated: true };
  }
}

type Actions = {
  setTheme: (theme: ThemePreference) => void;
  saveProblem: (problem: SolvedProblem) => void;
  removeProblem: (id: string) => void;
  clearSaved: () => void;
  recordAttempt: (attempt: Omit<QuizAttempt, 'id' | 'finishedAt' | 'percent'>) => void;
  clearQuizHistory: () => void;
  resetAll: () => void;
};

const StateContext = createContext<State | null>(null);
const ActionsContext = createContext<Actions | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        const parsed = raw ? JSON.parse(raw) : {};
        dispatch({
          type: 'hydrate',
          payload: {
            theme: ['system', 'light', 'dark'].includes(parsed.theme) ? parsed.theme : 'system',
            saved: Array.isArray(parsed.saved) ? parsed.saved : [],
            quizHistory: Array.isArray(parsed.quizHistory) ? parsed.quizHistory : [],
          },
        });
      })
      .catch(() => dispatch({ type: 'hydrate', payload: {} }));
  }, []);

  // Persist after hydration (never overwrite stored data with defaults), debounced.
  useEffect(() => {
    if (!state.hydrated) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      const { theme, saved, quizHistory } = state;
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ theme, saved, quizHistory })).catch(() => {});
    }, 250);
  }, [state]);

  const actions = useMemo<Actions>(
    () => ({
      setTheme: (theme) => dispatch({ type: 'setTheme', theme }),
      saveProblem: (problem) => dispatch({ type: 'saveProblem', problem: { ...problem, id: newId(), savedAt: Date.now() } }),
      removeProblem: (id) => dispatch({ type: 'removeProblem', id }),
      clearSaved: () => dispatch({ type: 'clearSaved' }),
      recordAttempt: (a) =>
        dispatch({
          type: 'recordAttempt',
          attempt: { ...a, id: newId(), finishedAt: Date.now(), percent: a.total ? Math.round((a.correct / a.total) * 100) : 0 },
        }),
      clearQuizHistory: () => dispatch({ type: 'clearQuizHistory' }),
      resetAll: () => dispatch({ type: 'resetAll' }),
    }),
    [],
  );

  return (
    <ActionsContext.Provider value={actions}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </ActionsContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(StateContext);
  if (!ctx) throw new Error('useAppState must be used inside AppStoreProvider');
  return ctx;
}

export function useAppActions() {
  const ctx = useContext(ActionsContext);
  if (!ctx) throw new Error('useAppActions must be used inside AppStoreProvider');
  return ctx;
}

export type QuizSummary = { taken: number; average: number; best: number; bestByQuiz: Map<string, number>; attemptsByQuiz: Map<string, number> };

export function useQuizSummary(): QuizSummary {
  const { quizHistory } = useAppState();
  return useMemo(() => {
    const bestByQuiz = new Map<string, number>();
    const attemptsByQuiz = new Map<string, number>();
    let sum = 0;
    for (const a of quizHistory) {
      sum += a.percent;
      bestByQuiz.set(a.quizId, Math.max(bestByQuiz.get(a.quizId) ?? 0, a.percent));
      attemptsByQuiz.set(a.quizId, (attemptsByQuiz.get(a.quizId) ?? 0) + 1);
    }
    return {
      taken: quizHistory.length,
      average: quizHistory.length ? Math.round(sum / quizHistory.length) : 0,
      best: quizHistory.reduce((m, a) => Math.max(m, a.percent), 0),
      bestByQuiz,
      attemptsByQuiz,
    };
  }, [quizHistory]);
}
