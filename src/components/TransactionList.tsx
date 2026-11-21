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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;
`;

const Th = styled.th`
  text-align: left;
  color: #64748b;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 8px 10px;
  border-bottom: 2px solid #e2e8f0;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
`;

const Amount = styled.span<{ $isIncome: boolean }>`
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: ${(props) => (props.$isIncome ? '#15803d' : '#b91c1c')};
`;

const Actions = styled.div`
  display: flex;
  gap: 6px;
  justify-content: flex-end;
`;

const SmallButton = styled(Button)`
  padding: 5px 10px;
  font-size: 0.82rem;
`;

const ScrollWrap = styled.div`
  overflow-x: auto;
`;

interface Props {
  filter: TransactionFilter;
  onEdit: (tx: EditingTransaction) => void;
}

export default function TransactionList({ filter, onEdit }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const all = useSelector(selectTransactions);
  const transactions = filterTransactions(all, filter);

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
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
        <CardTitle style={{ marginBottom: 12 }}>
          Transactions ({transactions.length})
        </CardTitle>
        <Button $variant="ghost" onClick={exportCsv} disabled={transactions.length === 0}>
          Export CSV
        </Button>
      </div>

      {transactions.length === 0 ? (
        <EmptyState>No transactions match the current filters.</EmptyState>
      ) : (
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
                <tr key={t.id}>
                  <Td style={{ whiteSpace: 'nowrap' }}>{t.date}</Td>
                  <Td>{t.description}</Td>
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
                      <SmallButton $variant="ghost" onClick={() => onEdit(toEditing(t))}>
                        Edit
                      </SmallButton>
                      <SmallButton $variant="danger" onClick={() => dispatch(deleteTransaction(t.id))}>
                        Delete
                      </SmallButton>
                    </Actions>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollWrap>
      )}
    </Card>
  );
}
