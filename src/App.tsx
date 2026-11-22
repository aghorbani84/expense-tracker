import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import type { AppDispatch } from './store/store';
import { resetToSeed } from './store/financeSlice';
import { selectBudgetProgress, selectSummary } from './store/selectors';
import type { TransactionFilter } from './store/selectors';
import { formatMoney } from './types';
import SummaryHero from './components/SummaryHero';
import ProofStrip from './components/ProofStrip';
import TransactionForm from './components/TransactionForm';
import type { EditingTransaction } from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import BudgetPanel from './components/BudgetPanel';
import ChartsPanel from './components/ChartsPanel';
import FilterBar from './components/FilterBar';
import ThemeSwitcher from './components/ThemeSwitcher';
import {
  Button,
  Container,
  Footnote,
  Header,
  HeaderActions,
  HeaderInner,
  Page,
  Subtitle,
  Title,
  TitleRow,
  TwoCol,
  WarningBanner,
} from './styles';

/** One tasteful Faravahar accent (spec §3): small inline-SVG silhouette in the
 * header, gold on transparent, shown only in the Achaemenid style. */
function FaravaharMark() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      style={{ flex: 'none' }}
    >
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="13" r="3.2" />
        <path d="M16 16.2v6.3" />
        <path d="M13 22.5h6" />
        <path d="M12.8 13 4 9.5l2.2 3.5L4 15.5 12.8 13Z" />
        <path d="M19.2 13 28 9.5l-2.2 3.5 2.2 2.5L19.2 13Z" />
        <path d="M13.5 16.5 9 19M18.5 16.5 23 19" />
      </g>
    </svg>
  );
}

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const budgetProgress = useSelector(selectBudgetProgress);
  const summary = useSelector(selectSummary);
  /** Datasheet title (rank-1 lesson §A.6): live numbers in the visible
   * header title and in document.title, recomputed on every store change. */
  const datasheetTitle = `Expense Tracker v2 — ${formatMoney(summary.expenses)} total · ${summary.count} transactions · ${summary.categoryCount} categories`;
  useEffect(() => {
    document.title = datasheetTitle;
  }, [datasheetTitle]);
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
            <TitleRow>
              {theme.style === 'achaemenid' && (
                <span style={{ color: theme.accent, display: 'inline-flex' }}>
                  <FaravaharMark />
                </span>
              )}
              <Title>{datasheetTitle}</Title>
            </TitleRow>
            <Subtitle>
              Track income and spending, stay inside your monthly budgets, and see where
              the money goes.
            </Subtitle>
          </div>
          <HeaderActions>
            <ThemeSwitcher />
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
          </HeaderActions>
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

        <ProofStrip />
        <SummaryHero />
        <ChartsPanel />

        <TwoCol>
          <TransactionForm editing={editing} onDoneEditing={() => setEditing(null)} />
          <BudgetPanel />
        </TwoCol>

        <FilterBar filter={filter} onChange={setFilter} />
        <TransactionList filter={filter} onEdit={setEditing} />

        <Footnote>
          Your data is stored only in this browser (localStorage). Nothing is sent to a server.
        </Footnote>
      </Container>
    </Page>
  );
}
