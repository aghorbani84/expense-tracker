import { useSelector } from 'react-redux';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { selectMonthlyTrend, selectSpendingByCategory } from '../store/selectors';
import { formatMoney } from '../types';
import { Card, CardTitle, EmptyState, TwoCol } from '../styles';

export default function ChartsPanel() {
  const byCategory = useSelector(selectSpendingByCategory);
  const trend = useSelector(selectMonthlyTrend);

  return (
    <TwoCol>
      <Card>
        <CardTitle>Spending by category</CardTitle>
        {byCategory.length === 0 ? (
          <EmptyState>No expenses yet — add one to see the breakdown.</EmptyState>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={byCategory}
                dataKey="total"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={95}
                label={({ payload, percent }) => {
                  const category =
                    (payload as { category?: string } | undefined)?.category ?? '';
                  return `${category} ${(((percent ?? 0) as number) * 100).toFixed(0)}%`;
                }}
              >
                {byCategory.map((entry) => (
                  <Cell key={entry.category} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatMoney(Number(value))} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </Card>

      <Card>
        <CardTitle>Income vs expenses by month</CardTitle>
        {trend.length === 0 ? (
          <EmptyState>No transactions yet.</EmptyState>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={trend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(v: number) => `$${v}`} />
              <Tooltip formatter={(value) => formatMoney(Number(value))} />
              <Legend />
              <Bar dataKey="income" fill="#16a34a" name="Income" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#dc2626" name="Expenses" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>
    </TwoCol>
  );
}
