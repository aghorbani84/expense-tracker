import styled, { useTheme } from 'styled-components';
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
import { Card, CardSub, CardTitle, EmptyState, TwoColPhi } from '../styles';

/**
 * Charts as the window: the φ split gives the bar chart the 1.618 share.
 * The pie becomes a donut whose centre reads the one number the chart is
 * about — total spent — so the headline sits inside the figure, the way
 * chart-scrub puts the readout on the card instead of in a tooltip box.
 * Recharts data and props are unchanged; only chrome and type are restyled.
 */

const DonutWrap = styled.div`
  position: relative;
`;

const DonutCentre = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  text-align: center;
`;

const DonutCentreLabel = styled.div`
  font-size: 13px;
  color: ${(p) => p.theme.muted};
`;

const DonutCentreValue = styled.div`
  font-size: 21px;
  font-weight: 700;
  letter-spacing: -0.01em;
  font-variant-numeric: tabular-nums;
  margin-top: 2px;
`;

export default function ChartsPanel() {
  const theme = useTheme();
  const tickStyle = { fontSize: 12, fill: theme.chartTick };
  const tooltipStyle = {
    backgroundColor: theme.tooltipBg,
    border: `1px solid ${theme.tooltipBorder}`,
    borderRadius: theme.radiusMd,
    color: theme.text,
    fontSize: 13,
  };
  const byCategory = useSelector(selectSpendingByCategory);
  const trend = useSelector(selectMonthlyTrend);
  const totalSpent = byCategory.reduce((sum, e) => sum + e.total, 0);

  return (
    <TwoColPhi>
      <Card className="et-enter" style={{ animationDelay: '60ms' }}>
        <CardTitle>Spending by category</CardTitle>
        <CardSub>All expenses, by category</CardSub>
        {byCategory.length === 0 ? (
          <EmptyState>No expenses yet — add one to see the breakdown.</EmptyState>
        ) : (
          <DonutWrap>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={byCategory}
                  dataKey="total"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={62}
                  outerRadius={100}
                  paddingAngle={2}
                  strokeWidth={0}
                  isAnimationActive={false}
                >
                  {byCategory.map((entry) => (
                    <Cell key={entry.category} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatMoney(Number(value))} contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 13, color: theme.muted }} iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
            <DonutCentre>
              <DonutCentreLabel>Total spent</DonutCentreLabel>
              <DonutCentreValue>{formatMoney(totalSpent)}</DonutCentreValue>
            </DonutCentre>
          </DonutWrap>
        )}
      </Card>

      <Card className="et-enter" style={{ animationDelay: '120ms' }}>
        <CardTitle>Income vs expenses by month</CardTitle>
        <CardSub>Monthly totals across all transactions</CardSub>
        {trend.length === 0 ? (
          <EmptyState>No transactions yet.</EmptyState>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={trend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.chartGrid} vertical={false} />
              <XAxis
                dataKey="month"
                tick={tickStyle}
                axisLine={{ stroke: theme.chartAxis }}
                tickLine={false}
                tickMargin={8}
              />
              <YAxis
                tick={tickStyle}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `$${v}`}
                width={48}
              />
              <Tooltip formatter={(value) => formatMoney(Number(value))} contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 13, color: theme.muted }} iconSize={8} />
              <Bar dataKey="income" fill={theme.income} name="Income" radius={[6, 6, 0, 0]} isAnimationActive={false} />
              <Bar dataKey="expenses" fill={theme.expense} name="Expenses" radius={[6, 6, 0, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>
    </TwoColPhi>
  );
}
