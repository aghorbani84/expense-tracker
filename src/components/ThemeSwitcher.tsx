import styled from 'styled-components';
import { useThemeControls } from '../ThemeProvider';

/** Header theme switcher (spec §5): segmented Achaemenid | Modern + Sun/Moon toggle.
 * Icons are inline SVG in the lucide style (Landmark / Sparkles / Sun / Moon);
 * labels are text, never icons alone. */

const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const Segmented = styled.div`
  display: flex;
  gap: 4px;
  padding: 4px;
  background: ${(p) => p.theme.surfaceRaised};
  border: 1px solid ${(p) => p.theme.line};
  border-radius: ${(p) => p.theme.radiusPill};
`;

const Segment = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  border-radius: ${(p) => p.theme.radiusPill};
  padding: 10px 12px;
  min-height: 44px;
  font-size: 13px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  background: ${(p) => (p.$active ? p.theme.accent : 'transparent')};
  color: ${(p) => (p.$active ? p.theme.accentOn : p.theme.muted)};
  box-shadow: ${(p) => (p.$active ? p.theme.shadowCard : 'none')};
  transition: background-color 0.12s ease, color 0.12s ease;

  svg {
    width: 15px;
    height: 15px;
    flex: none;
  }
  &:hover {
    color: ${(p) => (p.$active ? p.theme.accentOn : p.theme.text)};
  }
  &:focus-visible {
    outline: 2px solid ${(p) => p.theme.accent};
    outline-offset: 2px;
  }
`;

const ModeButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid ${(p) => p.theme.line};
  border-radius: ${(p) => p.theme.radiusPill};
  background: ${(p) => p.theme.surface};
  color: ${(p) => p.theme.text};
  cursor: pointer;
  transition: background-color 0.12s ease, border-color 0.12s ease;

  svg {
    width: 17px;
    height: 17px;
  }
  &:hover {
    background: ${(p) => p.theme.surfaceRaised};
  }
  &:focus-visible {
    outline: 2px solid ${(p) => p.theme.accent};
    outline-offset: 2px;
  }
`;

/* lucide-style paths (24×24, stroke) */
const LandmarkIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="3" x2="21" y1="22" y2="22" /><line x1="6" x2="6" y1="18" y2="11" /><line x1="10" x2="10" y1="18" y2="11" />
    <line x1="14" x2="14" y1="18" y2="11" /><line x1="18" x2="18" y1="18" y2="11" />
    <polygon points="12 2 20 7 4 7" />
  </svg>
);

const SparklesIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
  </svg>
);

const SunIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

export default function ThemeSwitcher() {
  const { style, mode, setStyle, toggleMode } = useThemeControls();
  return (
    <Wrap>
      <Segmented role="group" aria-label="Visual style">
        <Segment
          type="button"
          $active={style === 'achaemenid'}
          aria-pressed={style === 'achaemenid'}
          onClick={() => setStyle('achaemenid')}
        >
          {LandmarkIcon} Achaemenid
        </Segment>
        <Segment
          type="button"
          $active={style === 'modern'}
          aria-pressed={style === 'modern'}
          onClick={() => setStyle('modern')}
        >
          {SparklesIcon} Modern
        </Segment>
      </Segmented>
      <ModeButton
        type="button"
        aria-label="Toggle dark mode"
        aria-pressed={mode === 'dark'}
        onClick={toggleMode}
      >
        {mode === 'dark' ? SunIcon : MoonIcon}
      </ModeButton>
    </Wrap>
  );
}
