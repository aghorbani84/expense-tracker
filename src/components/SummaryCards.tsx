import { useSelector } from 'react-redux';
import { selectTotals } from '../store/selectors';
import { formatMoney } from '../types';
import { Grid, StatCard, StatLabel, StatSub, StatValue } from '../styles';

export default function SummaryCards() {
  const { income, expenses, balance, count } = useSelector(selectTotals);
  const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;

  return (
    <Grid>
      <StatCard $accent="#16a34a">
        <StatLabel>Total Income</StatLabel>
        <StatValue>{formatMoney(income)}</StatValue>
        <StatSub>Across {count} transactions</StatSub>
      </StatCard>
      <StatCard $accent="#dc2626">
        <StatLabel>Total Expenses</StatLabel>
        <StatValue>{formatMoney(expenses)}</StatValue>
        <StatSub>
          {income > 0 ? `${((expenses / income) * 100).toFixed(1)}% of income spent` : 'No income recorded'}
        </StatSub>
      </StatCard>
      <StatCard $accent={balance >= 0 ? '#0d9488' : '#dc2626'}>
        <StatLabel>Balance</StatLabel>
        <StatValue>{formatMoney(balance)}</StatValue>
        <StatSub>
          {income > 0
            ? `Savings rate: ${savingsRate.toFixed(1)}%`
            : 'Add income to see your savings rate'}
        </StatSub>
      </StatCard>
    </Grid>
  );
}
