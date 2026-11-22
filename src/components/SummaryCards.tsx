import styled, { useTheme } from 'styled-components';
import { useSelector } from 'react-redux';
import { selectTotals } from '../store/selectors';
import { formatMoney } from '../types';
import { Card } from '../styles';

/**
 * Hero summary. One number gets to be big — the balance at 34px — and the
 * panel splits on φ: 61.8% balance, 38.2% income / expenses behind a
 * hairline. The old three equal stat cards made every figure the same
 * weight; now the eye lands on the balance first.
 */

const Hero = styled(Card)`
  padding: 34px;
  display: grid;
  grid-template-columns: 1.618fr 1fr;
  gap: 34px;
  align-items: center;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    gap: 21px;
    padding: 21px;
  }
`;

const HeroLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${(p) => p.theme.muted};
`;

const HeroValue = styled.div`
  font-size: 34px;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin-top: 8px;
  font-variant-numeric: tabular-nums;
`;

const HeroSub = styled.div`
  font-size: 13px;
  color: ${(p) => p.theme.muted};
  margin-top: 8px;
  line-height: 1.45;
`;

const Side = styled.div`
  border-left: 1px solid ${(p) => p.theme.line};
  padding-left: 34px;
  display: grid;
  gap: 21px;

  @media (max-width: 720px) {
    border-left: none;
    border-top: 1px solid ${(p) => p.theme.line};
    padding-left: 0;
    padding-top: 21px;
  }
`;

const SideRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 13px;
`;

const SideMeta = styled.div`
  min-width: 0;
`;

const SideLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: ${(p) => p.theme.textSoft};
`;

const Dot = styled.span<{ $color: string }>`
  flex: none;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(props) => props.$color};
`;

const SideSub = styled.div`
  font-size: 13px;
  color: ${(p) => p.theme.muted};
  margin-top: 4px;
  padding-left: 16px;
  line-height: 1.4;
`;

const SideValue = styled.div`
  font-size: 21px;
  font-weight: 700;
  letter-spacing: -0.01em;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`;

export default function SummaryCards() {
  const theme = useTheme();
  const { income, expenses, balance, count } = useSelector(selectTotals);
  const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;

  return (
    <Hero className="et-enter">
      <div>
        <HeroLabel>Balance</HeroLabel>
        <HeroValue>{formatMoney(balance)}</HeroValue>
        <HeroSub>
          {income > 0
            ? `Savings rate ${savingsRate.toFixed(1)}% — ${formatMoney(income - expenses)} kept of ${formatMoney(income)} earned`
            : 'Add income to see your savings rate'}
        </HeroSub>
      </div>
      <Side>
        <SideRow>
          <SideMeta>
            <SideLabel>
              <Dot $color={theme.income} />
              Total income
            </SideLabel>
            <SideSub>Across {count} transactions</SideSub>
          </SideMeta>
          <SideValue>{formatMoney(income)}</SideValue>
        </SideRow>
        <SideRow>
          <SideMeta>
            <SideLabel>
              <Dot $color={theme.expense} />
              Total expenses
            </SideLabel>
            <SideSub>
              {income > 0
                ? `${((expenses / income) * 100).toFixed(1)}% of income spent`
                : 'No income recorded'}
            </SideSub>
          </SideMeta>
          <SideValue>{formatMoney(expenses)}</SideValue>
        </SideRow>
      </Side>
    </Hero>
  );
}
