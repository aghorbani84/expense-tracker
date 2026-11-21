/**
 * Headline-feature check for the expense tracker.
 *
 * Bundled with esbuild and run in plain Node (no browser needed). Exercises
 * the real Redux Toolkit slice + selectors: seed totals, add/update/delete a
 * transaction, budget progress, and the date/type filter. Exits non-zero on
 * any failed assertion.
 */
import { configureStore } from '@reduxjs/toolkit';
import financeReducer, {
  addTransaction,
  deleteTransaction,
  setBudget,
  updateTransaction,
} from '../src/store/financeSlice';
import {
  filterTransactions,
  selectBudgetProgress,
  selectSpendingByCategory,
  selectTotals,
} from '../src/store/selectors';

function assert(condition: boolean, message: string): void {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`PASS: ${message}`);
}

function approx(a: number, b: number, eps = 0.001): boolean {
  return Math.abs(a - b) < eps;
}

const store = configureStore({ reducer: { finance: financeReducer } });
const state = () => store.getState();

// 1. Seed data: 19 transactions, income = 3200 + 450 + 120 = 3770.
const seed = selectTotals(state());
assert(seed.count === 19, `seed has 19 transactions (got ${seed.count})`);
assert(approx(seed.income, 3770), `seed income is $3770 (got ${seed.income})`);
assert(seed.expenses > 0, `seed expenses are positive (got ${seed.expenses})`);
assert(
  approx(seed.balance, seed.income - seed.expenses),
  'balance equals income minus expenses',
);

// 2. Add an expense: totals must move by exactly the amount.
store.dispatch(
  addTransaction({
    type: 'expense',
    amount: 100,
    category: 'Food',
    description: 'Test groceries',
    date: new Date().toISOString().slice(0, 10),
  }),
);
const afterAdd = selectTotals(state());
assert(afterAdd.count === 20, 'adding a transaction grows the count to 20');
assert(
  approx(afterAdd.expenses, seed.expenses + 100),
  'expenses increase by exactly $100 after add',
);
const foodAfterAdd = selectSpendingByCategory(state()).find((c) => c.category === 'Food');
assert(
  foodAfterAdd !== undefined && approx(foodAfterAdd.total, 302.45 + 100),
  `Food category total is $402.45 after add (got ${foodAfterAdd?.total})`,
);

// 3. Update it to $150, then delete it: totals must track both operations.
const addedId = state().finance.transactions.find(
  (t) => t.description === 'Test groceries',
)?.id;
assert(addedId !== undefined, 'added transaction is findable by description');
store.dispatch(updateTransaction({ id: addedId!, changes: { amount: 150 } }));
assert(
  approx(selectTotals(state()).expenses, seed.expenses + 150),
  'expenses increase by exactly $150 after update',
);
store.dispatch(deleteTransaction(addedId!));
const afterDelete = selectTotals(state());
assert(afterDelete.count === 19, 'deleting returns the count to 19');
assert(
  approx(afterDelete.expenses, seed.expenses),
  'expenses return to the seed value after delete',
);

// 4. Budget progress: Food spent $302.45 of the $400 limit (75.6%, not over).
const foodBudget = selectBudgetProgress(state()).find((b) => b.category === 'Food');
assert(foodBudget !== undefined, 'Food budget progress exists');
assert(approx(foodBudget!.spent, 302.45), `Food spent is $302.45 (got ${foodBudget!.spent})`);
assert(!foodBudget!.overBudget, 'Food is not over its $400 budget');

// 5. Lowering the Food budget to $300 must flip it to over-budget.
store.dispatch(setBudget({ category: 'Food', limit: 300 }));
const foodTight = selectBudgetProgress(state()).find((b) => b.category === 'Food');
assert(foodTight !== undefined && foodTight.overBudget, 'Food is over budget at a $300 limit');
assert(
  approx(foodTight!.percent, (302.45 / 300) * 100),
  'over-budget percent is computed correctly',
);

// 6. Filters: expense-only filter returns only expenses; date filter narrows.
const expensesOnly = filterTransactions(state().finance.transactions, {
  type: 'expense',
  category: 'all',
  startDate: '',
  endDate: '',
  search: '',
});
assert(
  expensesOnly.length === 16 && expensesOnly.every((t) => t.type === 'expense'),
  `expense filter returns 16 expenses (got ${expensesOnly.length})`,
);
const firstOfMonth = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-01`;
const thisMonth = filterTransactions(state().finance.transactions, {
  type: 'all',
  category: 'all',
  startDate: firstOfMonth,
  endDate: '',
  search: '',
});
assert(thisMonth.length === 19, `this-month filter returns all 19 seed rows (got ${thisMonth.length})`);

console.log('\nAll slice checks passed.');
