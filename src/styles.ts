import styled from 'styled-components';

export const Page = styled.div`
  min-height: 100vh;
  background: #f1f5f9;
  color: #0f172a;
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
`;

export const Container = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 20px 48px;
`;

export const Header = styled.header`
  background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0e7490 100%);
  color: #fff;
  padding: 36px 0 28px;
  margin-bottom: 24px;
`;

export const HeaderInner = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.02em;
`;

export const Subtitle = styled.p`
  margin: 6px 0 0;
  color: #cbd5e1;
  font-size: 0.95rem;
`;

export const Card = styled.section`
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06);
`;

export const CardTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 1.05rem;
  font-weight: 700;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled(Card)<{ $accent?: string }>`
  border-left: 5px solid ${(props) => props.$accent ?? '#64748b'};
`;

export const StatLabel = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #64748b;
`;

export const StatValue = styled.div`
  font-size: 1.7rem;
  font-weight: 800;
  margin-top: 6px;
  font-variant-numeric: tabular-nums;
`;

export const StatSub = styled.div`
  font-size: 0.85rem;
  color: #64748b;
  margin-top: 4px;
`;

export const Button = styled.button<{ $variant?: 'primary' | 'ghost' | 'danger' }>`
  border: none;
  border-radius: 8px;
  padding: 9px 16px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: filter 0.15s ease;

  ${(props) =>
    props.$variant === 'danger'
      ? 'background: #fee2e2; color: #b91c1c;'
      : props.$variant === 'ghost'
        ? 'background: #f1f5f9; color: #334155; border: 1px solid #e2e8f0;'
        : 'background: #0f766e; color: #fff;'}

  &:hover {
    filter: brightness(0.94);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 9px 12px;
  font-size: 0.95rem;
  background: #fff;
  color: #0f172a;

  &:focus {
    outline: 2px solid #0d9488;
    outline-offset: 1px;
    border-color: #0d9488;
  }
`;

export const Select = styled.select`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 9px 12px;
  font-size: 0.95rem;
  background: #fff;
  color: #0f172a;

  &:focus {
    outline: 2px solid #0d9488;
    outline-offset: 1px;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 0.82rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 5px;
`;

export const Field = styled.div`
  margin-bottom: 12px;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const TypeToggle = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 14px;
`;

export const TypeButton = styled.button<{ $active: boolean; $tone: 'income' | 'expense' }>`
  flex: 1;
  border: 1px solid ${(props) => (props.$active ? props.$tone === 'income' ? '#16a34a' : '#dc2626' : '#cbd5e1')};
  background: ${(props) =>
    props.$active ? (props.$tone === 'income' ? '#dcfce7' : '#fee2e2') : '#fff'};
  color: ${(props) =>
    props.$active ? (props.$tone === 'income' ? '#15803d' : '#b91c1c') : '#475569'};
  border-radius: 8px;
  padding: 9px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
`;

export const Badge = styled.span<{ $color: string }>`
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 700;
  color: #fff;
  background: ${(props) => props.$color};
  border-radius: 999px;
  padding: 3px 10px;
  white-space: nowrap;
`;

export const WarningBanner = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 20px;
`;

export const EmptyState = styled.p`
  color: #64748b;
  font-size: 0.95rem;
  text-align: center;
  padding: 24px 0;
  margin: 0;
`;
