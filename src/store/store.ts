import { configureStore } from '@reduxjs/toolkit';
import financeReducer, { persistState } from './financeSlice';

export const store = configureStore({
  reducer: {
    finance: financeReducer,
  },
});

// Persist every state change to localStorage.
store.subscribe(() => {
  persistState(store.getState().finance);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
