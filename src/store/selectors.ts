import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { categoryColor } from '../types';

export interface TransactionFilter {
  type: 'all' | 'income' | 'expense';
  category: string; // 'all' or a category name
  startDate: string; // '' = no lower bound
  endDate: string; // '' = no upper bound
  search: string;
}

export const selectTransactions = (state: RootState) => state.finance.transactions;
export const selectBudgets = (state: RootState) => state.finance.budgets;

export function filterTransactions(
  transactions: RootState['finance']['transactions'],
  filter: TransactionFilter,
) {
  const query = filter.search.trim().toLowerCase();
  return transactions
    .filter((t) => (filter.type === 'all' ? true : t.type === filter.type))
    .filter((t) => (filter.category === 'all' ? true : t.category === filter.category))
    .filter((t) => (filter.startDate ? t.date >= filter.startDate : true))
    .filter((t) => (filter.endDate ? t.date <= filter.endDate : true))
    .filter((t) =>
      query
        ? t.description.toLowerCase().includes(query) || t.category.toLowerCase().includes(query)
        : true,
    )
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export const selectTotals = createSelector([selectTransactions], (transactions) => {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  return { income, expenses, balance: income - expenses, count: transactions.length };
});

export interface CategorySpending {
  category: string;
  total: number;
  color: string;
  count: number;
}

export const selectSpendingByCategory = createSelector(
  [selectTransactions],
  computeSpendingByCategory,
);

function computeSpendingByCategory(
  transactions: RootState['finance']['transactions'],
): CategorySpending[] {
  const map = new Map<string, CategorySpending>();
  for (const t of transactions) {
    if (t.type !== 'expense') continue;
    const entry = map.get(t.category) ?? {
      category: t.category,
      total: 0,
      color: categoryColor(t.category),
      count: 0,
    };
    entry.total += t.amount;
    entry.count += 1;
    map.set(t.category, entry);
  }
  return [...map.values()].sort((a, b) => b.total - a.total);
}

export interface MonthlyPoint {
  month: string; // e.g. "Nov 2026"
  income: number;
  expenses: number;
}

export const selectMonthlyTrend = createSelector([selectTransactions], (transactions) => {
  const map = new Map<string, MonthlyPoint>();
  for (const t of transactions) {
    const key = t.date.slice(0, 7); // YYYY-MM
    const label = new Date(`${key}-01T00:00:00`).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
    const entry = map.get(key) ?? { month: label, income: 0, expenses: 0 };
    if (t.type === 'income') entry.income += t.amount;
    else entry.expenses += t.amount;
    map.set(key, entry);
  }
  return [...map.entries()].sort((a, b) => (a[0] < b[0] ? -1 : 1)).map(([, v]) => v);
});

export interface BudgetProgress {
  category: string;
  limit: number;
  spent: number;
  remaining: number;
  percent: number; // 0..Infinity
  overBudget: boolean;
  color: string;
}

export interface Summary {
  income: number;
  expenses: number;
  balance: number;
  count: number;
  /** distinct categories across all transactions (income + expense) */
  categoryCount: number;
  thisMonthIncome: number;
  thisMonthExpenses: number;
  topCategory: { category: string; total: number; share: number } | null;
  /** total expenses / days spanned by expense dates (max - min + 1, min 1) */
  dailyAverageExpense: number;
  /** calendar days spanned by all expense dates */
  expenseDaySpan: number;
}

/** Memoized summary/proof numbers — every figure in the hero, proof strip
 * and datasheet title derives from this one selector, so all three always agree. */
export const selectSummary = createSelector([selectTransactions], (transactions): Summary => {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const now = new Date();
  const monthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const thisMonthIncome = transactions
    .filter((t) => t.type === 'income' && t.date.startsWith(monthPrefix))
    .reduce((sum, t) => sum + t.amount, 0);
  const thisMonthExpenses = transactions
    .filter((t) => t.type === 'expense' && t.date.startsWith(monthPrefix))
    .reduce((sum, t) => sum + t.amount, 0);
  const categoryCount = new Set(transactions.map((t) => t.category)).size;

  const expenseDates = transactions
    .filter((t) => t.type === 'expense')
    .map((t) => t.date)
    .sort();
  let expenseDaySpan = 0;
  if (expenseDates.length > 0) {
    const first = new Date(`${expenseDates[0]}T00:00:00Z`).getTime();
    const last = new Date(`${expenseDates[expenseDates.length - 1]}T00:00:00Z`).getTime();
    expenseDaySpan = Math.max(1, Math.round((last - first) / 86400000) + 1);
  }
  const dailyAverageExpense = expenseDaySpan > 0 ? expenses / expenseDaySpan : 0;

  const byCategory = computeSpendingByCategory(transactions);
  const top = byCategory[0] ?? null;
  return {
    income,
    expenses,
    balance: income - expenses,
    count: transactions.length,
    categoryCount,
    thisMonthIncome,
    thisMonthExpenses,
    topCategory: top
      ? { category: top.category, total: top.total, share: expenses > 0 ? (top.total / expenses) * 100 : 0 }
      : null,
    dailyAverageExpense,
    expenseDaySpan,
  };
});

export interface CategoryBreakdownRow extends CategorySpending {
  /** share of total expenses, 0..100 */
  share: number;
}

/** Per-category totals with shares — feeds the dense breakdown list in SummaryHero. */
export const selectCategoryBreakdown = createSelector(
  [selectSpendingByCategory],
  (byCategory): CategoryBreakdownRow[] => {
    const total = byCategory.reduce((sum, e) => sum + e.total, 0);
    return byCategory.map((e) => ({
      ...e,
      share: total > 0 ? (e.total / total) * 100 : 0,
    }));
  },
);

export const selectBudgetProgress = createSelector(
  [selectTransactions, selectBudgets],
  (transactions, budgets) => {
    const now = new Date();
    const monthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    return budgets
      .map((b) => {
        const spent = transactions
          .filter(
            (t) => t.type === 'expense' && t.category === b.category && t.date.startsWith(monthPrefix),
          )
          .reduce((sum, t) => sum + t.amount, 0);
        return {
          category: b.category,
          limit: b.limit,
          spent,
          remaining: b.limit - spent,
          percent: b.limit > 0 ? (spent / b.limit) * 100 : 0,
          overBudget: spent > b.limit,
          color: categoryColor(b.category),
        };
      })
      .sort((a, b) => b.percent - a.percent);
  },
);
