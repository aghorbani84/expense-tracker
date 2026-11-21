import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../store/store';
import { deleteTransaction } from '../store/financeSlice';
import { filterTransactions } from '../store/selectors';
import type { TransactionFilter } from '../store/selectors';
import { selectTransactions } from '../store/selectors';
import { categoryColor, formatMoney } from '../types';
import type { Transaction } from '../types';
import { Badge, Button, Card, CardTitle, EmptyState } from '../styles';
import { toEditing } from './TransactionForm';
import type { EditingTransaction } from './TransactionForm';

/**
 * The ledger, after table-edit: 48px rows on hairlines, the value never
 * moves when it changes, amounts right-aligned in tabular figures, the
 * category as a soft tinted pill, and a footer total the rows feed — net
 * of exactly the transactions shown. Edit / Delete are quiet text actions
 * that only declare themselves on hover.
 */

const ListHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
`;

const Th = styled.th`
  text-align: left;
  color: var(--ink-faint);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 8px 10px;
  border-bottom: 1px solid var(--line);
`;

const Td = styled.td`
  padding: 8px 10px;
  border-bottom: 1px solid var(--line-faint);
  vertical-align: middle;
`;

const Row = styled.tr`
  transition: background-color 0.12s ease;

  &:hover {
    background-color: #f8f9fa;
  }
  &:last-child td {
    border-bottom: none;
  }
`;

const Description = styled.span`
  font-weight: 500;
  color: var(--ink-strong);
`;

const DateCell = styled.span`
  font-size: 13px;
  color: var(--ink-faint);
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
`;

const Amount = styled.span<{ $isIncome: boolean }>`
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: ${(props) => (props.$isIncome ? 'var(--income-text)' : 'var(--expense-text)')};
  white-space: nowrap;
`;

const Actions = styled.div`
  display: flex;
  gap: 4px;
  justify-content: flex-end;
`;

const TextAction = styled.button<{ $danger?: boolean }>`
  border: none;
  background: transparent;
  padding: 6px 8px;
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  color: var(--ink-faint);
  border-radius: 6px;
  cursor: pointer;
  transition:
    color 0.12s ease,
    background-color 0.12s ease;

  &:hover {
    color: ${(props) => (props.$danger ? 'var(--expense-text)' : 'var(--ink-strong)')};
    background-color: ${(props) => (props.$danger ? 'var(--expense-soft)' : 'var(--well)')};
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 1px;
  }
`;

const ScrollWrap = styled.div`
  overflow-x: auto;
`;

const Foot = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 13px;
  border-top: 1px solid var(--line);
  padding: 13px 10px 0;
  margin-top: 8px;
  font-size: 14px;
`;

const FootLabel = styled.span`
  color: var(--ink-faint);
`;

const FootValue = styled.span`
  font-weight: 700;
  font-variant-numeric: tabular-nums;
`;

interface Props {
  filter: TransactionFilter;
  onEdit: (tx: EditingTransaction) => void;
}

export default function TransactionList({ filter, onEdit }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const all = useSelector(selectTransactions);
  const transactions = filterTransactions(all, filter);
  const netShown = transactions.reduce(
    (sum, t) => sum + (t.type === 'income' ? t.amount : -t.amount),
    0,
  );

  function exportCsv() {
    const header = 'Date,Type,Category,Description,Amount (USD)';
    const rows = transactions.map((t) => {
      const safe = (s: string) => `"${s.replace(/"/g, '""')}"`;
      return [t.date, t.type, safe(t.category), safe(t.description), t.amount.toFixed(2)].join(',');
    });
    const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expense-tracker-transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Card className="et-enter" style={{ animationDelay: '300ms' }}>
      <ListHead>
        <CardTitle style={{ marginBottom: 0 }}>
          Transactions ({transactions.length})
        </CardTitle>
        <Button $variant="ghost" onClick={exportCsv} disabled={transactions.length === 0}>
          Export CSV
        </Button>
      </ListHead>

      {transactions.length === 0 ? (
        <EmptyState>No transactions match the current filters.</EmptyState>
      ) : (
        <>
          <ScrollWrap>
            <Table>
              <thead>
                <tr>
                  <Th>Date</Th>
                  <Th>Description</Th>
                  <Th>Category</Th>
                  <Th style={{ textAlign: 'right' }}>Amount</Th>
                  <Th style={{ textAlign: 'right' }}>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t: Transaction) => (
                  <Row key={t.id}>
                    <Td>
                      <DateCell>{t.date}</DateCell>
                    </Td>
                    <Td>
                      <Description>{t.description}</Description>
                    </Td>
                    <Td>
                      <Badge $color={categoryColor(t.category)}>{t.category}</Badge>
                    </Td>
                    <Td style={{ textAlign: 'right' }}>
                      <Amount $isIncome={t.type === 'income'}>
                        {t.type === 'income' ? '+' : '-'}
                        {formatMoney(t.amount)}
                      </Amount>
                    </Td>
                    <Td>
                      <Actions>
                        <TextAction onClick={() => onEdit(toEditing(t))}>Edit</TextAction>
                        <TextAction $danger onClick={() => dispatch(deleteTransaction(t.id))}>
                          Delete
                        </TextAction>
                      </Actions>
                    </Td>
                  </Row>
                ))}
              </tbody>
            </Table>
          </ScrollWrap>
          <Foot>
            <FootLabel>Net of the {transactions.length} shown</FootLabel>
            <FootValue>{formatMoney(netShown)}</FootValue>
          </Foot>
        </>
      )}
    </Card>
  );
}
