# Expense Tracker

> A browser-based personal finance tracker with category budgets, charts, and CSV export.

[![Live demo](https://img.shields.io/badge/demo-GitHub%20Pages-2ea44f)](https://aghorbani84.github.io/expense-tracker/)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-764ABC?logo=redux&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)

**Live demo:** https://aghorbani84.github.io/expense-tracker/

## Overview

Expense Tracker lets you record income and expenses, group them by category, set a monthly budget per category, and see where your money goes. It runs entirely in the browser: data is kept in `localStorage`, with no account, server, or API keys.

## Features

- **Transactions** – add, edit, and delete income and expenses with amount, category, description, and date
- **Categories** – Food, Transport, Housing, Entertainment, Utilities, Healthcare, Shopping, Salary, Freelance, and more, each with its own color
- **Monthly budgets** – per-category limits with progress bars, remaining amounts, and over-budget warnings
- **Dashboard** – total income, total expenses, balance, and savings rate, plus a live totals strip (transaction count, categories, total spent, daily average)
- **Charts** – spending-by-category pie chart and monthly income-vs-expenses bar chart
- **Filters** – by type, category, date range (This month / Last 30 days / All time presets), and free-text search
- **CSV export** – download the currently filtered transactions
- **Themes** – Modern and Achaemenid visual styles, each with light and dark mode
- **Persistence** – state is saved to `localStorage` automatically; sample data for the current month can be restored with **Reset sample data**

## Tech stack

| Area | Tools |
| --- | --- |
| UI | React 19, TypeScript |
| State | Redux Toolkit (`@reduxjs/toolkit`, `react-redux`) with memoized selectors |
| Styling | styled-components |
| Charts | Recharts |
| Build & lint | Vite, oxlint |
| Deployment | GitHub Pages via GitHub Actions |

## Getting started

Requires Node.js (CI uses Node 20).

```bash
git clone https://github.com/aghorbani84/expense-tracker.git
cd expense-tracker
npm install
npm run dev        # start the dev server (usually http://localhost:5173)
```

Other scripts:

```bash
npm run build      # type-check (tsc) + production build into dist/
npm run preview    # serve the production build locally
npm run lint       # run oxlint
```

A check for the Redux slice (add/update/delete, derived totals, budget progress, filters) lives in `scripts/verify-slice.ts`:

```bash
npx esbuild scripts/verify-slice.ts --bundle --platform=node --format=esm \
  --outfile=/tmp/verify-slice.mjs && node /tmp/verify-slice.mjs
```

## Project structure

```
src/
├── main.tsx              # entry point, Redux Provider
├── App.tsx               # page layout
├── ThemeProvider.tsx     # style (Modern/Achaemenid) + light/dark mode
├── types.ts              # Transaction / Category / Budget types
├── data/seed.ts          # sample transactions for the current month
├── store/
│   ├── financeSlice.ts   # Redux slice + localStorage persistence
│   ├── store.ts          # store setup
│   └── selectors.ts      # totals, chart data, budget progress
└── components/           # summary, form, list, budgets, charts, filters, theme switcher
```

## Author

Built by [aghorbani84](https://github.com/aghorbani84).
