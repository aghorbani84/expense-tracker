import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectSummary } from '../store/selectors';
import { formatMoney } from '../types';

/**
 * Proof strip (rank-1 lesson §A.2): an honest audit line of live
 * Redux-derived counts, recomputed from the store on every change.
 * Rendered directly under the header in App, so it is visible in the
 * first screenshot. Format:
 *   "19 transactions · 10 categories · $1,949.27 total · $108.29/day avg"
 * (seed figures; every number updates as transactions are added/edited/deleted).
 */

const Strip = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 13px;
  background: ${(p) => p.theme.surfaceRaised};
  border: 1px solid ${(p) => p.theme.line};
  border-radius: ${(p) => p.theme.radiusMd};
  padding: 10px 16px;
  margin-bottom: 21px;
  font-size: 13px;
  font-weight: 600;
  color: ${(p) => p.theme.textSoft};
  font-variant-numeric: tabular-nums;
`;

const StripLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${(p) => p.theme.accent};
`;

const Sep = styled.span`
  color: ${(p) => p.theme.muted};
  font-weight: 400;
`;

export default function ProofStrip() {
  const { count, categoryCount, expenses, dailyAverageExpense } = useSelector(selectSummary);
  return (
    <Strip role="status" aria-label="Live totals from your transactions">
      <StripLabel>Live totals</StripLabel>
      <span>
        {count} transaction{count === 1 ? '' : 's'}
      </span>
      <Sep>·</Sep>
      <span>
        {categoryCount} categor{categoryCount === 1 ? 'y' : 'ies'}
      </span>
      <Sep>·</Sep>
      <span>{formatMoney(expenses)} total</span>
      <Sep>·</Sep>
      <span>{formatMoney(dailyAverageExpense)}/day avg</span>
    </Strip>
  );
}
