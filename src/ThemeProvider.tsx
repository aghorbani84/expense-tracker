import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import type { ShowcaseMode, ShowcaseStyle } from './theme';
import { themeFor } from './theme';

const STYLE_KEY = 'showcase-style';
const MODE_KEY = 'showcase-mode';

function readStyle(): ShowcaseStyle {
  try {
    return localStorage.getItem(STYLE_KEY) === 'achaemenid' ? 'achaemenid' : 'modern';
  } catch {
    return 'modern';
  }
}

function readMode(): ShowcaseMode {
  try {
    const saved = localStorage.getItem(MODE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {
    /* fall through to media query */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Body-level styles from the active theme object (replaces the :root tokens in index.css). */
const GlobalStyle = createGlobalStyle`
  body {
    background: ${(p) => p.theme.bg};
    color: ${(p) => p.theme.text};
    font-family: ${(p) => p.theme.bodyFont};
  }
`;

export interface ThemeControls {
  style: ShowcaseStyle;
  mode: ShowcaseMode;
  setStyle: (s: ShowcaseStyle) => void;
  toggleMode: () => void;
}

export const ThemeControlsContext = createContext<ThemeControls>({
  style: 'modern',
  mode: 'light',
  setStyle: () => {},
  toggleMode: () => {},
});

export function useThemeControls(): ThemeControls {
  return useContext(ThemeControlsContext);
}

export function ShowcaseThemeProvider({ children }: { children: ReactNode }) {
  const [style, setStyle] = useState<ShowcaseStyle>(readStyle);
  const [mode, setMode] = useState<ShowcaseMode>(readMode);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.style = style;
    root.dataset.mode = mode;
    try {
      localStorage.setItem(STYLE_KEY, style);
      localStorage.setItem(MODE_KEY, mode);
    } catch {
      /* storage unavailable — theme still applies for this session */
    }
  }, [style, mode]);

  const theme = useMemo(() => themeFor(style, mode), [style, mode]);
  const toggleMode = useCallback(
    () => setMode((m) => (m === 'dark' ? 'light' : 'dark')),
    [],
  );

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ThemeControlsContext.Provider value={{ style, mode, setStyle, toggleMode }}>
        {children}
      </ThemeControlsContext.Provider>
    </ThemeProvider>
  );
}
