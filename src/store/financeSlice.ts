import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Budget, FinanceState, Transaction } from '../types';
import { SEED_BUDGETS, SEED_TRANSACTIONS } from '../data/seed';

const STORAGE_KEY = 'expense-tracker-state-v1';

export function loadPersistedState(): FinanceState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as FinanceState;
    if (!Array.isArray(parsed.transactions) || !Array.isArray(parsed.budgets)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function persistState(state: FinanceState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable (private mode) — the app keeps working in memory.
  }
}

const initialState: FinanceState = loadPersistedState() ?? {
  transactions: SEED_TRANSACTIONS,
  budgets: SEED_BUDGETS,
};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    addTransaction: (
      state,
      action: PayloadAction<Omit<Transaction, 'id' | 'createdAt'>>,
    ) => {
      const transaction: Transaction = {
        ...action.payload,
        id: `tx-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        createdAt: new Date().toISOString(),
      };
      state.transactions.push(transaction);
    },
    updateTransaction: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<Omit<Transaction, 'id' | 'createdAt'>> }>,
    ) => {
      const tx = state.transactions.find((t) => t.id === action.payload.id);
      if (tx) Object.assign(tx, action.payload.changes);
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter((t) => t.id !== action.payload);
    },
    setBudget: (state, action: PayloadAction<Budget>) => {
      const existing = state.budgets.find((b) => b.category === action.payload.category);
      if (existing) {
        existing.limit = action.payload.limit;
      } else {
        state.budgets.push(action.payload);
      }
    },
    resetToSeed: (state) => {
      state.transactions = SEED_TRANSACTIONS;
      state.budgets = SEED_BUDGETS;
    },
  },
});

export const {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setBudget,
  resetToSeed,
} = financeSlice.actions;

export default financeSlice.reducer;
