import type { Budget, Transaction } from '../types';

/**
 * Realistic seed data for the current month. Dates are generated relative to
 * "now" so the sample data always falls in the current month, whenever the
 * app is first opened.
 */
function dayOfMonth(day: number): string {
  const now = new Date();
  const clamped = Math.min(day, new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate());
  const d = new Date(now.getFullYear(), now.getMonth(), clamped);
  return d.toISOString().slice(0, 10);
}

let seq = 0;
function tx(
  type: Transaction['type'],
  amount: number,
  category: string,
  description: string,
  day: number,
): Transaction {
  seq += 1;
  const date = dayOfMonth(day);
  return {
    id: `seed-${seq}`,
    type,
    amount,
    category,
    description,
    date,
    createdAt: `${date}T09:00:00.000Z`,
  };
}

export const SEED_TRANSACTIONS: Transaction[] = [
  tx('income', 3200, 'Salary', 'Monthly salary — Acme Corp', 1),
  tx('income', 450, 'Freelance', 'Website redesign for local bakery', 5),
  tx('income', 120, 'Freelance', 'Logo design gig', 14),
  tx('expense', 1150, 'Housing', 'Monthly rent', 2),
  tx('expense', 86.4, 'Utilities', 'Electricity bill', 3),
  tx('expense', 54.2, 'Utilities', 'Internet — fiber 500 Mbps', 4),
  tx('expense', 142.75, 'Food', 'Weekly groceries — Whole Foods', 6),
  tx('expense', 38.5, 'Food', 'Lunch with colleagues', 7),
  tx('expense', 96.3, 'Food', 'Weekly groceries — Trader Joe’s', 13),
  tx('expense', 24.9, 'Food', 'Coffee and pastries', 15),
  tx('expense', 62.0, 'Transport', 'Monthly metro pass', 1),
  tx('expense', 45.0, 'Transport', 'Fuel — Shell station', 9),
  tx('expense', 18.75, 'Transport', 'Ride-share to airport', 12),
  tx('expense', 15.99, 'Entertainment', 'Streaming subscription', 8),
  tx('expense', 42.0, 'Entertainment', 'Cinema tickets — Friday night', 10),
  tx('expense', 89.99, 'Shopping', 'Running shoes', 11),
  tx('expense', 34.5, 'Shopping', 'Winter jacket on sale', 16),
  tx('expense', 28.0, 'Healthcare', 'Pharmacy — vitamins', 17),
  tx('expense', 19.99, 'Other', 'Phone case', 18),
];

export const SEED_BUDGETS: Budget[] = [
  { category: 'Food', limit: 400 },
  { category: 'Transport', limit: 150 },
  { category: 'Housing', limit: 1200 },
  { category: 'Entertainment', limit: 120 },
  { category: 'Utilities', limit: 200 },
  { category: 'Healthcare', limit: 100 },
  { category: 'Shopping', limit: 250 },
  { category: 'Other', limit: 100 },
];
