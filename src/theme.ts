export type Palette = {
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  primarySoft: string;
  onPrimary: string;
  success: string;
  successSoft: string;
  danger: string;
  dangerSoft: string;
  warning: string;
};

export const lightPalette: Palette = {
  background: '#F5F6FB',
  surface: '#FFFFFF',
  surfaceAlt: '#EEF0F8',
  text: '#161A33',
  textMuted: '#636985',
  border: '#E1E4F0',
  primary: '#4F46E5',
  primarySoft: '#E7E6FD',
  onPrimary: '#FFFFFF',
  success: '#15803D',
  successSoft: '#DCFCE7',
  danger: '#DC2626',
  dangerSoft: '#FEE2E2',
  warning: '#D97706',
};

export const darkPalette: Palette = {
  background: '#0E1020',
  surface: '#181B30',
  surfaceAlt: '#22263F',
  text: '#F1F2FA',
  textMuted: '#9EA3C0',
  border: '#2C3050',
  primary: '#8B85FF',
  primarySoft: '#2B2958',
  onPrimary: '#0E1020',
  success: '#4ADE80',
  successSoft: '#163323',
  danger: '#F87171',
  dangerSoft: '#3B1A1F',
  warning: '#FBBF24',
};

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 } as const;
export const radius = { sm: 8, md: 12, lg: 18, pill: 999 } as const;
