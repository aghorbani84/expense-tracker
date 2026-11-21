import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectBudgetProgress } from '../store/selectors';
import { formatMoney } from '../types';
import { Card, CardSub, CardTitle, EmptyState } from '../styles';

/**
 * Budget rows, table-edit quiet: a color dot and a name, the spent/limit
 * pair right-aligned in tabular figures, a 6px meter, one faint line for
 * percent + remaining. Over budget reads in red — the fill, the percent,
 * and the remaining — and nowhere else.
 */

const Row = styled.div`
  margin-bottom: 21px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const RowHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 13px;
  font-size: 15px;
  margin-bottom: 8px;
`;

const RowName = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
`;

const Dot = styled.span<{ $color: string }>`
  flex: none;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(props) => props.$color};
`;

const RowAmounts = styled.span`
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  color: var(--ink);
`;

const BarTrack = styled.div`
  height: 6px;
  background: var(--well);
  border-radius: 999px;
  overflow: hidden;
`;

const BarFill = styled.div<{ $width: number; $color: string; $over: boolean }>`
  height: 100%;
  width: ${(props) => Math.min(props.$width, 100)}%;
  background: ${(props) => (props.$over ? 'var(--expense)' : props.$color)};
  border-radius: 999px;
  transition: width 0.35s cubic-bezier(0.22, 0.61, 0.36, 1);
`;

const RowFoot = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 13px;
  font-size: 13px;
  color: var(--ink-faint);
  margin-top: 6px;
`;

const Remaining = styled.span<{ $over: boolean }>`
  color: ${(props) => (props.$over ? 'var(--expense-text)' : 'var(--ink-faint)')};
  font-weight: ${(props) => (props.$over ? 600 : 400)};
  white-space: nowrap;
`;

const OverNote = styled.p`
  color: var(--expense-text);
  font-weight: 600;
  font-size: 14px;
  margin: 0 0 13px;
  line-height: 1.45;
`;

export default function BudgetPanel() {
  const progress = useSelector(selectBudgetProgress);
  const over = progress.filter((p) => p.overBudget);

  return (
    <Card className="et-enter" style={{ animationDelay: '180ms' }}>
      <CardTitle>Monthly budgets</CardTitle>
      <CardSub>
        {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} — spending
        against each category limit
      </CardSub>
      {over.length > 0 && (
        <OverNote>
          Over budget: {over.map((p) => p.category).join(', ')} — review spending in these
          categories.
        </OverNote>
      )}
      {progress.length === 0 ? (
        <EmptyState>No budgets set yet.</EmptyState>
      ) : (
        progress.map((p) => (
          <Row key={p.category}>
            <RowHead>
              <RowName>
                <Dot $color={p.color} />
                {p.category}
              </RowName>
              <RowAmounts>
                {formatMoney(p.spent)} / {formatMoney(p.limit)}
              </RowAmounts>
            </RowHead>
            <BarTrack>
              <BarFill $width={p.percent} $color={p.color} $over={p.overBudget} />
            </BarTrack>
            <RowFoot>
              <span>{p.percent.toFixed(0)}% used</span>
              <Remaining $over={p.overBudget}>
                {p.overBudget
                  ? `${formatMoney(-p.remaining)} over budget`
                  : `${formatMoney(p.remaining)} remaining`}
              </Remaining>
            </RowFoot>
          </Row>
        ))
      )}
    </Card>
  );
}
