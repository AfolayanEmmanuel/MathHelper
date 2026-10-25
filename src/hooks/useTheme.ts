import { useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { useAppState } from '../context/AppStore';
import { darkPalette, lightPalette, Palette } from '../theme';

export function useTheme(): { colors: Palette; isDark: boolean } {
  const system = useColorScheme();
  const { theme } = useAppState();
  const isDark = theme === 'system' ? system === 'dark' : theme === 'dark';
  return useMemo(() => ({ colors: isDark ? darkPalette : lightPalette, isDark }), [isDark]);
}
