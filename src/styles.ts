import styled, { css } from 'styled-components';

/**
 * Shared visual layer — every color/radius/shadow/font comes from the active
 * theme object (src/theme.ts: 4 themes, Achaemenid × Modern, light × dark).
 * No hard-coded colors here; components read semantic tokens only.
 * Spacing scale 8 / 13 / 21 / 34 (× φ ≈ 1.618); type scale 13 / 21 / 34.
 * State and data logic are untouched; this file is presentation only.
 */

export const Page = styled.div`
  min-height: 100vh;
  background: ${(p) => p.theme.bg};
  color: ${(p) => p.theme.text};
  font-family: ${(p) => p.theme.bodyFont};
`;

export const Container = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 21px 34px;
`;

/* Header: Modern = slim quiet surface + one hairline. Achaemenid = lotus-petal
   SVG pattern background + a thin double gold rule under the header (spec §3). */
export const Header = styled.header`
  background: ${(p) => p.theme.surface};
  background-image: ${(p) => p.theme.headerPattern};
  background-repeat: repeat;
  border-bottom: 1px solid ${(p) => p.theme.line};
  padding: 21px 0;
  margin-bottom: 21px;
  position: relative;

  ${(p) =>
    p.theme.style === 'achaemenid' &&
    css`
      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: -4px;
        height: 4px;
        border-top: 1px solid ${p.theme.accent};
        border-bottom: 1px solid ${p.theme.accent};
      }
    `}
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

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  flex-wrap: wrap;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Title = styled.h1`
  margin: 0;
  font-family: ${(p) => p.theme.displayFont};
  font-size: ${(p) => (p.theme.style === 'achaemenid' ? '24px' : '21px')};
  font-weight: ${(p) => (p.theme.style === 'achaemenid' ? 700 : 800)};
  letter-spacing: ${(p) => (p.theme.style === 'achaemenid' ? '0.08em' : '-0.02em')};
  text-transform: ${(p) => (p.theme.style === 'achaemenid' ? 'uppercase' : 'none')};
  line-height: 1.2;
`;

export const Subtitle = styled.p`
  margin: 3px 0 0;
  color: ${(p) => p.theme.muted};
  font-size: 13px;
  line-height: 1.4;
`;

export const Card = styled.section`
  background: ${(p) => p.theme.surface};
  border: 1px solid ${(p) => p.theme.line};
  border-radius: ${(p) => p.theme.radiusLg};
  padding: 21px;
  box-shadow: ${(p) => p.theme.shadowCard};
`;

export const CardTitle = styled.h2`
  margin: 0 0 13px;
  font-family: ${(p) => p.theme.displayFont};
  font-size: 15px;
  font-weight: 700;
  letter-spacing: ${(p) => (p.theme.style === 'achaemenid' ? '0.04em' : '-0.01em')};
  line-height: 1.3;
`;

/* Faint one-line caption under a card title — the card's story in 13px. */
export const CardSub = styled.p`
  margin: -8px 0 13px;
  font-size: 13px;
  color: ${(p) => p.theme.muted};
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
  border-radius: ${(p) => p.theme.radiusMd};
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

  ${(p) =>
    p.$variant === 'danger'
      ? css`
          background: ${p.theme.expenseSoft};
          color: ${p.theme.expenseText};
        `
      : p.$variant === 'ghost'
        ? css`
            background: ${p.theme.surface};
            color: ${p.theme.textSoft};
            border: 1px solid ${p.theme.line};
          `
        : css`
            background: ${p.theme.accent};
            color: ${p.theme.accentOn};
            box-shadow: ${p.theme.shadowCard};
          `}

  &:hover {
    ${(p) =>
      p.$variant === 'danger'
        ? css`
            background: ${p.theme.expenseSoft};
            filter: brightness(0.96);
          `
        : p.$variant === 'ghost'
          ? css`
              background: ${p.theme.surfaceRaised};
              border-color: ${p.theme.muted};
            `
          : css`
              background: ${p.theme.accentStrong};
              color: ${p.theme.accentOn};
            `}
  }
  &:active {
    transform: translateY(0.5px);
  }
  &:focus-visible {
    outline: 2px solid ${(p) => p.theme.accent};
    outline-offset: 2px;
  }
  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

const controlBase = css`
  width: 100%;
  box-sizing: border-box;
  height: 40px;
  border: 1px solid ${(p) => p.theme.line};
  border-radius: ${(p) => p.theme.radiusMd};
  padding: 0 12px;
  font-size: 15px;
  font-family: inherit;
  background: ${(p) => p.theme.surface};
  color: ${(p) => p.theme.text};
  transition: border-color 0.12s ease, box-shadow 0.12s ease;

  &:focus {
    outline: none;
    border-color: ${(p) => p.theme.accent};
    box-shadow: 0 0 0 3px ${(p) => p.theme.accentSoft};
  }
  &::placeholder {
    color: ${(p) => p.theme.muted};
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
  color: ${(p) => p.theme.textSoft};
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

/* Segmented control: a quiet well; the active side is a raised pill. */
export const TypeToggle = styled.div`
  display: flex;
  gap: 4px;
  padding: 4px;
  margin-bottom: 13px;
  background: ${(p) => p.theme.surfaceRaised};
  border-radius: ${(p) => p.theme.radiusLg};
`;

export const TypeButton = styled.button<{ $active: boolean; $tone: 'income' | 'expense' }>`
  flex: 1;
  border: none;
  background: ${(p) => (p.$active ? p.theme.surface : 'transparent')};
  color: ${(p) =>
    p.$active
      ? p.$tone === 'income'
        ? p.theme.incomeText
        : p.theme.expenseText
      : p.theme.muted};
  box-shadow: ${(p) => (p.$active ? p.theme.shadowCard : 'none')};
  border-radius: ${(p) => p.theme.radiusMd};
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
    outline: 2px solid ${(p) => p.theme.accent};
    outline-offset: 2px;
  }
`;

/* Soft tinted pill: the category's color as a wash, never a solid chip. */
export const Badge = styled.span<{ $color: string }>`
  display: inline-block;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.3;
  color: ${(p) => `color-mix(in srgb, ${p.$color} 78%, ${p.theme.text})`};
  background: ${(p) => `color-mix(in srgb, ${p.$color} 14%, ${p.theme.surface})`};
  border-radius: ${(p) => p.theme.radiusPill};
  padding: 4px 10px;
  white-space: nowrap;
`;

export const WarningBanner = styled.div`
  background: ${(p) => p.theme.warningBg};
  border: 1px solid ${(p) => p.theme.warningLine};
  color: ${(p) => p.theme.warningText};
  border-radius: ${(p) => p.theme.radiusLg};
  padding: 13px 16px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.45;
  margin-bottom: 21px;
`;

export const EmptyState = styled.div`
  color: ${(p) => p.theme.muted};
  font-size: 15px;
  line-height: 1.5;
  text-align: center;
  padding: 34px 21px;
  margin: 0;
`;

export const Footnote = styled.p`
  color: ${(p) => p.theme.muted};
  font-size: 13px;
  text-align: center;
  margin-top: 21px;
`;
