export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number; // always positive; sign comes from `type`
  category: string;
  description: string;
  date: string; // ISO date, YYYY-MM-DD
  createdAt: string; // ISO timestamp
}

export interface Category {
  name: string;
  kind: 'income' | 'expense' | 'both';
  color: string;
}

export interface Budget {
  category: string;
  limit: number; // monthly limit in USD
}

export interface FinanceState {
  transactions: Transaction[];
  budgets: Budget[];
}

export const CATEGORIES: Category[] = [
  { name: 'Salary', kind: 'income', color: '#16a34a' },
  { name: 'Freelance', kind: 'income', color: '#059669' },
  { name: 'Other Income', kind: 'income', color: '#0d9488' },
  { name: 'Food', kind: 'expense', color: '#f59e0b' },
  { name: 'Transport', kind: 'expense', color: '#3b82f6' },
  { name: 'Housing', kind: 'expense', color: '#8b5cf6' },
  { name: 'Entertainment', kind: 'expense', color: '#ec4899' },
  { name: 'Utilities', kind: 'expense', color: '#06b6d4' },
  { name: 'Healthcare', kind: 'expense', color: '#ef4444' },
  { name: 'Shopping', kind: 'expense', color: '#f97316' },
  { name: 'Other', kind: 'both', color: '#64748b' },
];

export const EXPENSE_CATEGORIES = CATEGORIES.filter(
  (c) => c.kind === 'expense' || c.kind === 'both',
).map((c) => c.name);

export const INCOME_CATEGORIES = CATEGORIES.filter(
  (c) => c.kind === 'income' || c.kind === 'both',
).map((c) => c.name);

export function categoryColor(name: string): string {
  return CATEGORIES.find((c) => c.name === name)?.color ?? '#64748b';
}

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}
