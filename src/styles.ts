import styled from 'styled-components';

/**
 * Shared visual layer — tokens live in index.css (:root).
 * Spacing scale 8 / 13 / 21 / 34 (× φ ≈ 1.618); type scale 13 / 21 / 34;
 * one teal accent, status colors only where they mean status.
 * State and data logic are untouched; this file is presentation only.
 */

export const Page = styled.div`
  min-height: 100vh;
  background: var(--canvas);
  color: var(--ink-strong);
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
`;

export const Container = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 21px 34px;
`;

/* Slim quiet header: white surface, one hairline, no heavy band competing
   with the numbers below it. */
export const Header = styled.header`
  background: var(--surface);
  border-bottom: 1px solid var(--line);
  padding: 21px 0;
  margin-bottom: 21px;
`;

export const HeaderInner = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 21px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 13px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 21px;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
`;

export const Subtitle = styled.p`
  margin: 3px 0 0;
  color: var(--ink-faint);
  font-size: 13px;
  line-height: 1.4;
`;

export const Card = styled.section`
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 21px;
  box-shadow: var(--shadow-card);
`;

export const CardTitle = styled.h2`
  margin: 0 0 13px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.3;
`;

/* Faint one-line caption under a card title — the card's story in 13px. */
export const CardSub = styled.p`
  margin: -8px 0 13px;
  font-size: 13px;
  color: var(--ink-faint);
  line-height: 1.4;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 21px;
  margin-bottom: 21px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 21px;
  margin-bottom: 21px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

/* Charts split on φ: the bar chart gets the 1.618 share, the pie the 1. */
export const TwoColPhi = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.618fr;
  gap: 21px;
  margin-bottom: 21px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

export const Button = styled.button<{ $variant?: 'primary' | 'ghost' | 'danger' }>`
  border: none;
  border-radius: var(--radius-md);
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition:
    background-color 0.12s ease,
    border-color 0.12s ease,
    box-shadow 0.12s ease,
    transform 0.06s ease;

  ${(props) =>
    props.$variant === 'danger'
      ? 'background: var(--expense-soft); color: var(--expense-text);'
      : props.$variant === 'ghost'
        ? 'background: var(--surface); color: var(--ink); border: 1px solid var(--line);'
        : 'background: var(--accent); color: #fff; box-shadow: 0 1px 2px rgba(15, 118, 110, 0.35);'}

  &:hover {
    ${(props) =>
      props.$variant === 'danger'
        ? 'background: #fbdcdc;'
        : props.$variant === 'ghost'
          ? 'background: var(--well); border-color: #d4d7dc;'
          : 'background: var(--accent-strong);'}
  }
  &:active {
    transform: translateY(0.5px);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

const controlBase = `
  width: 100%;
  box-sizing: border-box;
  height: 40px;
  border: 1px solid #d4d7dc;
  border-radius: var(--radius-md);
  padding: 0 12px;
  font-size: 15px;
  font-family: inherit;
  background: var(--surface);
  color: var(--ink-strong);
  transition: border-color 0.12s ease, box-shadow 0.12s ease;

  &:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-soft);
  }
  &::placeholder {
    color: var(--ink-faint);
  }
`;

export const Input = styled.input`
  ${controlBase}
`;

export const Select = styled.select`
  ${controlBase}
`;

export const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 6px;
`;

export const Field = styled.div`
  margin-bottom: 13px;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 13px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

/* Segmented control: a quiet well; the active side is a raised white pill. */
export const TypeToggle = styled.div`
  display: flex;
  gap: 4px;
  padding: 4px;
  margin-bottom: 13px;
  background: var(--well);
  border-radius: 12px;
`;

export const TypeButton = styled.button<{ $active: boolean; $tone: 'income' | 'expense' }>`
  flex: 1;
  border: none;
  background: ${(props) => (props.$active ? 'var(--surface)' : 'transparent')};
  color: ${(props) =>
    props.$active
      ? props.$tone === 'income'
        ? 'var(--income-text)'
        : 'var(--expense-text)'
      : 'var(--ink-faint)'};
  box-shadow: ${(props) =>
    props.$active ? '0 1px 3px rgba(23, 24, 28, 0.14)' : 'none'};
  border-radius: 9px;
  padding: 9px;
  font-size: 15px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    color 0.15s ease,
    box-shadow 0.15s ease;

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

/* Soft tinted pill: the category's color as a wash, never a solid chip. */
export const Badge = styled.span<{ $color: string }>`
  display: inline-block;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.3;
  color: ${(props) => `color-mix(in srgb, ${props.$color} 78%, #17181c)`};
  background: ${(props) => `color-mix(in srgb, ${props.$color} 11%, #ffffff)`};
  border-radius: var(--radius-pill);
  padding: 4px 10px;
  white-space: nowrap;
`;

export const WarningBanner = styled.div`
  background: var(--warning-bg);
  border: 1px solid var(--warning-line);
  color: var(--warning-text);
  border-radius: 12px;
  padding: 13px 16px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.45;
  margin-bottom: 21px;
`;

export const EmptyState = styled.div`
  color: var(--ink-faint);
  font-size: 15px;
  line-height: 1.5;
  text-align: center;
  padding: 34px 21px;
  margin: 0;
`;
