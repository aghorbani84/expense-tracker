# Expense Tracker

A personal finance tracker built with React + TypeScript (Vite). Add, edit, and
delete income and expense transactions, organize them by category, set monthly
budgets per category, and see where your money goes with charts and summaries.
All data is stored in the browser with `localStorage` — no account, no server,
no API keys.

## Features

- **Transactions** — add, edit, and delete income and expenses with amount,
  category, description, and date.
- **Categories** — Food, Transport, Housing, Entertainment, Utilities,
  Healthcare, Shopping, Salary, Freelance, and more, each with its own color.
- **Monthly budgets** — a budget limit per expense category, with progress bars,
  remaining amounts, and clear over-budget warnings.
- **Dashboard** — total income, total expenses, balance, and savings rate at a
  glance.
- **Charts** — spending-by-category pie chart and income-vs-expenses monthly
  bar chart.
- **Filters** — filter by type, category, date range (with This month / Last
  30 days / All time presets), and free-text search.
- **CSV export** — download the currently filtered transactions as a CSV file.
- **Persistence** — everything is saved to `localStorage` automatically; the
  app ships with realistic sample transactions for the current month, and a
  "Reset sample data" button restores them.

## Tech used

- **React 19 + TypeScript + Vite** — UI and build tooling
- **Redux Toolkit** (`@reduxjs/toolkit` + `react-redux`) — state management;
  a single `finance` slice holds transactions and budgets, and memoized
  selectors derive totals, category spending, monthly trends, and budget
  progress
- **styled-components** — all styling, including the dashboard cards, forms,
  and budget progress bars
- **recharts** — pie and bar charts

## How to run

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

## Other commands

```bash
npm run build    # typecheck (tsc) + production build
npx tsc --noEmit # typecheck only
```

A headline-feature check for the Redux slice lives in
`scripts/verify-slice.ts` — it exercises add/update/delete, derived totals,
budget progress, and filters against the real slice logic:

```bash
npx esbuild scripts/verify-slice.ts --bundle --platform=node --format=esm \
  --outfile=/tmp/verify-slice.mjs && node /tmp/verify-slice.mjs
```

## Project structure

```
src/
  main.tsx                 # React entry point, Redux Provider
  App.tsx                  # Page layout
  types.ts                 # Transaction / Category / Budget types
  data/seed.ts             # Realistic sample transactions for the current month
  store/
    financeSlice.ts        # Redux Toolkit slice + localStorage persistence
    store.ts               # Store setup (saves state on every change)
    selectors.ts           # Memoized derived data: totals, charts, budgets
  components/
    SummaryCards.tsx       # Income / expenses / balance
    TransactionForm.tsx    # Add + edit form
    TransactionList.tsx    # Table with edit/delete and CSV export
    BudgetPanel.tsx        # Monthly budget progress bars
    ChartsPanel.tsx        # Pie + bar charts (recharts)
    FilterBar.tsx          # Type / category / date-range / search filters
  styles.ts                # Shared styled-components
```
