import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectCategoryBreakdown, selectSummary } from '../store/selectors';
import { formatMoney } from '../types';
import { Card, CardSub, CardTitle, EmptyState } from '../styles';

/**
 * Summary hero (Round 2, rank-1 lessons §A.1–A.3): density from the app's
 * OWN store data — 4 live stat cells (total spent, this month, top
 * category, daily average) + the balance/income line + a per-category
 * breakdown with totals, shares and bars. All colours come from the
 * ThemeProvider theme object only (category dots/bars reuse the existing
 * data colours, as the donut does); nothing hard-coded, so it recolors
 * in all 4 Achaemenid × Modern / light × dark combos.
 */

const Hero = styled(Card)`
  padding: 21px;
  margin-bottom: 21px;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 13px;

  @media (max-width: 860px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Stat = styled.div`
  background: ${(p) => p.theme.surfaceRaised};
  border: 1px solid ${(p) => p.theme.lineFaint};
  border-radius: ${(p) => p.theme.radiusMd};
  padding: 13px 16px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${(p) => p.theme.muted};
`;

const StatValue = styled.div`
  font-size: 21px;
  font-weight: 800;
  letter-spacing: -0.01em;
  margin-top: 4px;
  font-variant-numeric: tabular-nums;
  line-height: 1.2;
`;

const StatSub = styled.div`
  font-size: 13px;
  color: ${(p) => p.theme.muted};
  margin-top: 4px;
  line-height: 1.4;
`;

const BalanceLine = styled.div`
  font-size: 13px;
  color: ${(p) => p.theme.muted};
  margin-top: 13px;
  line-height: 1.45;

  strong {
    color: ${(p) => p.theme.text};
  }
`;

const Breakdown = styled.div`
  margin-top: 21px;
  padding-top: 13px;
  border-top: 1px solid ${(p) => p.theme.line};
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: minmax(120px, 1fr) 90px 70px;
  gap: 8px 13px;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid ${(p) => p.theme.lineFaint};

  &:last-child {
    border-bottom: none;
  }

  /* Phones: the name column must be allowed to shrink (minmax(0,…)) or the
     fixed 90px + 70px columns push the row wider than the card. */
  @media (max-width: 560px) {
    grid-template-columns: minmax(0, 1fr) auto auto;
    gap: 8px;
  }
`;

const RowName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Dot = styled.span<{ $color: string }>`
  flex: none;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(props) => props.$color};
`;

const RowCount = styled.span`
  font-size: 13px;
  color: ${(p) => p.theme.muted};
  font-weight: 400;
`;

const RowTotal = styled.div`
  font-size: 14px;
  font-weight: 700;
  text-align: right;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`;

const RowShare = styled.div`
  font-size: 13px;
  color: ${(p) => p.theme.muted};
  text-align: right;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`;

const BarTrack = styled.div`
  grid-column: 1 / -1;
  height: 6px;
  border-radius: ${(p) => p.theme.radiusPill};
  background: ${(p) => p.theme.surfaceRaised};
  overflow: hidden;
`;

const BarFill = styled.div<{ $color: string; $width: number }>`
  height: 100%;
  width: ${(p) => p.$width}%;
  background: ${(p) => p.$color};
  border-radius: ${(p) => p.theme.radiusPill};
`;

export default function SummaryHero() {
  const summary = useSelector(selectSummary);
  const breakdown = useSelector(selectCategoryBreakdown);
  const savingsRate =
    summary.income > 0 ? ((summary.income - summary.expenses) / summary.income) * 100 : 0;

  return (
    <Hero className="et-enter">
      <StatGrid>
        <Stat>
          <StatLabel>Total spent</StatLabel>
          <StatValue>{formatMoney(summary.expenses)}</StatValue>
          <StatSub>
            Balance {formatMoney(summary.balance)} · {formatMoney(summary.income)} income
          </StatSub>
        </Stat>
        <Stat>
          <StatLabel>This month</StatLabel>
          <StatValue>{formatMoney(summary.thisMonthExpenses)}</StatValue>
          <StatSub>{formatMoney(summary.thisMonthIncome)} income this month</StatSub>
        </Stat>
        <Stat>
          <StatLabel>Top category</StatLabel>
          <StatValue>
            {summary.topCategory ? summary.topCategory.category : '—'}
          </StatValue>
          <StatSub>
            {summary.topCategory
              ? `${formatMoney(summary.topCategory.total)} · ${summary.topCategory.share.toFixed(1)}% of spending`
              : 'No expenses yet'}
          </StatSub>
        </Stat>
        <Stat>
          <StatLabel>Daily average</StatLabel>
          <StatValue>{formatMoney(summary.dailyAverageExpense)}/day</StatValue>
          <StatSub>
            Over {summary.expenseDaySpan} day{summary.expenseDaySpan === 1 ? '' : 's'} of
            expenses
          </StatSub>
        </Stat>
      </StatGrid>

      <BalanceLine>
        <strong>{formatMoney(summary.balance)} balance</strong>
        {summary.income > 0
          ? ` — savings rate ${savingsRate.toFixed(1)}% (${formatMoney(summary.income - summary.expenses)} kept of ${formatMoney(summary.income)} earned)`
          : ' — add income to see your savings rate'}
        {` · ${summary.count} transactions across ${summary.categoryCount} categories`}
      </BalanceLine>

      <Breakdown>
        <CardTitle>Where the money goes</CardTitle>
        <CardSub>
          Every expense category, with its total and share of all spending
        </CardSub>
        {breakdown.length === 0 ? (
          <EmptyState>No expenses yet — add one to see the breakdown.</EmptyState>
        ) : (
          breakdown.map((row) => (
            <Row key={row.category}>
              <RowName>
                <Dot $color={row.color} />
                {row.category}
                <RowCount>
                  {row.count} tx{row.count === 1 ? '' : 's'}
                </RowCount>
              </RowName>
              <RowTotal>{formatMoney(row.total)}</RowTotal>
              <RowShare>{row.share.toFixed(1)}%</RowShare>
              <BarTrack aria-hidden="true">
                <BarFill $color={row.color} $width={row.share} />
              </BarTrack>
            </Row>
          ))
        )}
      </Breakdown>
    </Hero>
  );
}
