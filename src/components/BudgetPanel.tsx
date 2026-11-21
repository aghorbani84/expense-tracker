import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectBudgetProgress } from '../store/selectors';
import { formatMoney } from '../types';
import { Card, CardTitle, EmptyState } from '../styles';

const Row = styled.div`
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const RowHead = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

const BarTrack = styled.div`
  height: 10px;
  background: #e2e8f0;
  border-radius: 999px;
  overflow: hidden;
`;

const BarFill = styled.div<{ $width: number; $color: string; $over: boolean }>`
  height: 100%;
  width: ${(props) => Math.min(props.$width, 100)}%;
  background: ${(props) => (props.$over ? '#dc2626' : props.$color)};
  border-radius: 999px;
  transition: width 0.3s ease;
`;

const Remaining = styled.span<{ $over: boolean }>`
  color: ${(props) => (props.$over ? '#b91c1c' : '#64748b')};
  font-weight: ${(props) => (props.$over ? 700 : 400)};
`;

export default function BudgetPanel() {
  const progress = useSelector(selectBudgetProgress);
  const over = progress.filter((p) => p.overBudget);

  return (
    <Card>
      <CardTitle>Monthly budgets — {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</CardTitle>
      {over.length > 0 && (
        <p style={{ color: '#b91c1c', fontWeight: 600, fontSize: '0.9rem', margin: '0 0 14px' }}>
          Over budget: {over.map((p) => p.category).join(', ')} — review spending in these categories.
        </p>
      )}
      {progress.length === 0 ? (
        <EmptyState>No budgets set yet.</EmptyState>
      ) : (
        progress.map((p) => (
          <Row key={p.category}>
            <RowHead>
              <strong>{p.category}</strong>
              <span>
                {formatMoney(p.spent)} / {formatMoney(p.limit)}
              </span>
            </RowHead>
            <BarTrack>
              <BarFill $width={p.percent} $color={p.color} $over={p.overBudget} />
            </BarTrack>
            <RowHead style={{ marginTop: 4, fontSize: '0.82rem' }}>
              <span>{p.percent.toFixed(0)}% used</span>
              <Remaining $over={p.overBudget}>
                {p.overBudget
                  ? `${formatMoney(-p.remaining)} over budget`
                  : `${formatMoney(p.remaining)} remaining`}
              </Remaining>
            </RowHead>
          </Row>
        ))
      )}
    </Card>
  );
}
