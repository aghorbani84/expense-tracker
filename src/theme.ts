/** Style axis: Achaemenid (Persepolis-inspired) vs Modern. Mode axis: light vs dark. */
export type ShowcaseStyle = 'achaemenid' | 'modern';
export type ShowcaseMode = 'light' | 'dark';

export interface AppTheme {
  style: ShowcaseStyle;
  mode: ShowcaseMode;
  /** semantic tokens — every styled component reads these only, never a hard-coded color */
  bg: string;
  surface: string;
  surfaceRaised: string;
  text: string;
  textSoft: string;
  muted: string;
  line: string;
  lineFaint: string;
  accent: string;
  accentStrong: string;
  accentSoft: string;
  /** readable text on the accent background (spec §2 pairs) */
  accentOn: string;
  secondary: string;
  secondaryStrong: string;
  income: string;
  incomeSoft: string;
  incomeText: string;
  expense: string;
  expenseSoft: string;
  expenseText: string;
  warningBg: string;
  warningLine: string;
  warningText: string;
  radiusSm: string;
  radiusMd: string;
  radiusLg: string;
  radiusPill: string;
  shadowCard: string;
  shadowLift: string;
  displayFont: string;
  bodyFont: string;
  /** header background pattern (lotus/fluted-column SVG data URI) — '' for Modern */
  headerPattern: string;
  /** recharts chrome, read from the active theme object */
  chartGrid: string;
  chartTick: string;
  chartAxis: string;
  tooltipBg: string;
  tooltipBorder: string;
}

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface DefaultTheme extends AppTheme {}
}

const BODY = "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif";
const DISPLAY_MODERN = "'Inter', system-ui, sans-serif";
const DISPLAY_ACH = "'Cinzel', Georgia, 'Times New Roman', serif";

/* Palettes per spec §2 (tailwindshades oklch scales, hex anchors):
   gold-600 #B08D2E, gold-400 #D9B45C, gold-700 #8A6D1F, gold-950 #33290A,
   lapis-700 #2B5CB8, lapis-400 #6B9BD8, lapis-900 #1D4E9E,
   accent-600 #4F46E5, accent-400 #818CF8, accent-950 #1E1B4B. */

const lotus = (lineHex: string) =>
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='24' viewBox='0 0 48 24'%3E%3Cg fill='none' stroke='%23${lineHex.slice(1)}' stroke-opacity='0.4' stroke-width='1'%3E%3Cpath d='M12 22 C12 14 16 10 24 10 C32 10 36 14 36 22'/%3E%3Cpath d='M24 22 C24 16 24 12 24 6'/%3E%3Cpath d='M4 22 C6 18 10 16 14 16'/%3E%3Cpath d='M44 22 C42 18 38 16 34 16'/%3E%3C/g%3E%3C/svg%3E")`;

export const modernLight: AppTheme = {
  style: 'modern',
  mode: 'light',
  bg: '#f8fafc',
  surface: '#ffffff',
  surfaceRaised: '#f1f5f9',
  text: '#0f172a',
  textSoft: '#334155',
  muted: '#475569',
  line: '#e2e8f0',
  lineFaint: '#eef2f7',
  accent: '#4F46E5',
  accentStrong: '#4338CA',
  accentSoft: '#E0E7FF',
  accentOn: '#ffffff',
  secondary: '#4F46E5',
  secondaryStrong: '#4338CA',
  income: '#16a34a',
  incomeSoft: '#dcfce7',
  incomeText: '#15803d',
  expense: '#dc2626',
  expenseSoft: '#fee2e2',
  expenseText: '#b91c1c',
  warningBg: '#fef6e7',
  warningLine: '#f5d9a8',
  warningText: '#92400e',
  radiusSm: '8px',
  radiusMd: '12px',
  radiusLg: '12px',
  radiusPill: '999px',
  shadowCard: '0 1px 2px rgba(15, 23, 42, 0.05), 0 1px 3px rgba(15, 23, 42, 0.04)',
  shadowLift: '0 8px 24px rgba(15, 23, 42, 0.10), 0 2px 6px rgba(15, 23, 42, 0.06)',
  displayFont: DISPLAY_MODERN,
  bodyFont: BODY,
  headerPattern: '',
  chartGrid: '#e2e8f0',
  chartTick: '#64748b',
  chartAxis: '#e2e8f0',
  tooltipBg: '#ffffff',
  tooltipBorder: '#e2e8f0',
};

export const modernDark: AppTheme = {
  ...modernLight,
  style: 'modern',
  mode: 'dark',
  bg: '#0b1220',
  surface: '#111c2e',
  surfaceRaised: '#1a2942',
  text: '#e2e8f0',
  textSoft: '#cbd5e1',
  muted: '#94a3b8',
  line: '#1e293b',
  lineFaint: '#16233a',
  accent: '#818CF8',
  accentStrong: '#a5b4fc',
  accentSoft: '#1e1b4b',
  accentOn: '#1e1b4b',
  secondary: '#818CF8',
  secondaryStrong: '#a5b4fc',
  income: '#4ade80',
  incomeSoft: '#14532d',
  incomeText: '#86efac',
  expense: '#f87171',
  expenseSoft: '#450a0a',
  expenseText: '#fca5a5',
  warningBg: '#451a03',
  warningLine: '#78350f',
  warningText: '#fcd34d',
  shadowCard: '0 1px 2px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0, 0, 0, 0.3)',
  shadowLift: '0 8px 24px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.4)',
  chartGrid: '#1e293b',
  chartTick: '#94a3b8',
  chartAxis: '#1e293b',
  tooltipBg: '#111c2e',
  tooltipBorder: '#1e293b',
};

export const achaemenidLight: AppTheme = {
  ...modernLight,
  style: 'achaemenid',
  mode: 'light',
  bg: '#f5efe3',
  surface: '#fffdf6',
  surfaceRaised: '#fbf6ea',
  text: '#2b2118',
  textSoft: '#4a3a28',
  muted: '#7a6a55',
  line: '#d9c9a8',
  lineFaint: '#ece2cc',
  accent: '#B08D2E',
  accentStrong: '#8a6d1f',
  accentSoft: '#f7efd2',
  accentOn: '#33290a',
  secondary: '#2b5cb8',
  secondaryStrong: '#1d4e9e',
  income: '#15803d',
  incomeSoft: '#dcfce7',
  incomeText: '#166534',
  expense: '#b91c1c',
  expenseSoft: '#fee2e2',
  expenseText: '#991b1b',
  warningBg: '#fdf3d7',
  warningLine: '#d9c9a8',
  warningText: '#713f12',
  radiusSm: '6px',
  radiusMd: '6px',
  radiusLg: '6px',
  radiusPill: '6px',
  shadowCard: '0 1px 2px rgba(43, 33, 24, 0.08), 0 1px 3px rgba(43, 33, 24, 0.06)',
  shadowLift: '0 8px 24px rgba(43, 33, 24, 0.14), 0 2px 6px rgba(43, 33, 24, 0.08)',
  displayFont: DISPLAY_ACH,
  headerPattern: lotus('d9c9a8'),
  chartGrid: '#d9c9a8',
  chartTick: '#7a6a55',
  chartAxis: '#d9c9a8',
  tooltipBg: '#fffdf6',
  tooltipBorder: '#d9c9a8',
};

export const achaemenidDark: AppTheme = {
  ...achaemenidLight,
  style: 'achaemenid',
  mode: 'dark',
  bg: '#171310',
  surface: '#221b15',
  surfaceRaised: '#2c241b',
  text: '#ece0c8',
  textSoft: '#d6c8a8',
  muted: '#a89880',
  line: '#3d3226',
  lineFaint: '#2c241b',
  accent: '#d9b45c',
  accentStrong: '#e3c878',
  accentSoft: '#33290a',
  accentOn: '#33290a',
  secondary: '#6b9bd8',
  secondaryStrong: '#93b4e4',
  income: '#4ade80',
  incomeSoft: '#14532d',
  incomeText: '#86efac',
  expense: '#f87171',
  expenseSoft: '#450a0a',
  expenseText: '#fca5a5',
  warningBg: '#3a2a10',
  warningLine: '#6b5a2e',
  warningText: '#fcd34d',
  shadowCard: '0 1px 2px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.35)',
  shadowLift: '0 8px 24px rgba(0, 0, 0, 0.55), 0 2px 6px rgba(0, 0, 0, 0.45)',
  headerPattern: lotus('3d3226'),
  chartGrid: '#3d3226',
  chartTick: '#a89880',
  chartAxis: '#3d3226',
  tooltipBg: '#221b15',
  tooltipBorder: '#3d3226',
};

export const THEMES: Record<`${ShowcaseStyle}-${ShowcaseMode}`, AppTheme> = {
  'modern-light': modernLight,
  'modern-dark': modernDark,
  'achaemenid-light': achaemenidLight,
  'achaemenid-dark': achaemenidDark,
};

export function themeFor(style: ShowcaseStyle, mode: ShowcaseMode): AppTheme {
  return THEMES[`${style}-${mode}`];
}
