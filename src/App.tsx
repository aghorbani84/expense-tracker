import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from './store/store';
import { resetToSeed } from './store/financeSlice';
import { selectBudgetProgress } from './store/selectors';
import type { TransactionFilter } from './store/selectors';
import SummaryCards from './components/SummaryCards';
import TransactionForm from './components/TransactionForm';
import type { EditingTransaction } from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import BudgetPanel from './components/BudgetPanel';
import ChartsPanel from './components/ChartsPanel';
import FilterBar from './components/FilterBar';
import {
  Button,
  Container,
  Header,
  HeaderInner,
  Page,
  Subtitle,
  Title,
  TwoCol,
  WarningBanner,
} from './styles';

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const budgetProgress = useSelector(selectBudgetProgress);
  const overBudget = useMemo(
    () => budgetProgress.filter((p) => p.overBudget),
    [budgetProgress],
  );

  const [editing, setEditing] = useState<EditingTransaction | null>(null);
  const [filter, setFilter] = useState<TransactionFilter>({
    type: 'all',
    category: 'all',
    startDate: '',
    endDate: '',
    search: '',
  });
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <Page>
      <Header>
        <HeaderInner>
          <div>
            <Title>Expense Tracker</Title>
            <Subtitle>
              Track income and spending, stay inside your monthly budgets, and see where
              the money goes.
            </Subtitle>
          </div>
          <Button
            $variant="ghost"
            onClick={() => {
              if (confirmReset) {
                dispatch(resetToSeed());
                setConfirmReset(false);
              } else {
                setConfirmReset(true);
                window.setTimeout(() => setConfirmReset(false), 4000);
              }
            }}
          >
            {confirmReset ? 'Click again to confirm reset' : 'Reset sample data'}
          </Button>
        </HeaderInner>
      </Header>

      <Container>
        {overBudget.length > 0 && (
          <WarningBanner>
            Over budget this month:{' '}
            {overBudget.map((p) => `${p.category} (${p.percent.toFixed(0)}%)`).join(', ')}. Consider
            cutting back in these categories.
          </WarningBanner>
        )}

        <SummaryCards />
        <ChartsPanel />

        <TwoCol>
          <TransactionForm editing={editing} onDoneEditing={() => setEditing(null)} />
          <BudgetPanel />
        </TwoCol>

        <FilterBar filter={filter} onChange={setFilter} />
        <TransactionList filter={filter} onEdit={setEditing} />

        <p style={{ color: 'var(--ink-faint)', fontSize: '13px', textAlign: 'center', marginTop: 21 }}>
          Your data is stored only in this browser (localStorage). Nothing is sent to a server.
        </p>
      </Container>
    </Page>
  );
}
