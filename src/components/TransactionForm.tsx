import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';
import { addTransaction, updateTransaction } from '../store/financeSlice';
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  todayISO,
} from '../types';
import type { Transaction, TransactionType } from '../types';
import {
  Button,
  Card,
  CardTitle,
  Field,
  FormRow,
  Input,
  Label,
  Select,
  TypeButton,
  TypeToggle,
} from '../styles';

export interface EditingTransaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface Props {
  editing: EditingTransaction | null;
  onDoneEditing: () => void;
}

export default function TransactionForm({ editing, onDoneEditing }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0]);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(todayISO());
  const [error, setError] = useState('');

  useEffect(() => {
    if (editing) {
      setType(editing.type);
      setAmount(String(editing.amount));
      setCategory(editing.category);
      setDescription(editing.description);
      setDate(editing.date);
    }
  }, [editing]);

  // Keep the category valid when the type changes.
  useEffect(() => {
    const allowed = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    if (!allowed.includes(category)) setCategory(allowed[0]);
  }, [type, category]);

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  function resetForm() {
    setAmount('');
    setDescription('');
    setDate(todayISO());
    setError('');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = Number(amount);
    if (!Number.isFinite(value) || value <= 0) {
      setError('Enter an amount greater than zero.');
      return;
    }
    if (!description.trim()) {
      setError('Add a short description.');
      return;
    }
    const payload = {
      type,
      amount: Math.round(value * 100) / 100,
      category,
      description: description.trim(),
      date,
    };
    if (editing) {
      dispatch(updateTransaction({ id: editing.id, changes: payload }));
      onDoneEditing();
    } else {
      dispatch(addTransaction(payload));
    }
    resetForm();
  }

  return (
    <Card as="form" onSubmit={handleSubmit}>
      <CardTitle>{editing ? 'Edit transaction' : 'Add a transaction'}</CardTitle>

      <TypeToggle>
        <TypeButton
          type="button"
          $tone="expense"
          $active={type === 'expense'}
          onClick={() => setType('expense')}
        >
          Expense
        </TypeButton>
        <TypeButton
          type="button"
          $tone="income"
          $active={type === 'income'}
          onClick={() => setType('income')}
        >
          Income
        </TypeButton>
      </TypeToggle>

      <FormRow>
        <Field>
          <Label htmlFor="amount">Amount (USD)</Label>
          <Input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Field>
        <Field>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Field>
      </FormRow>

      <Field>
        <Label htmlFor="category">Category</Label>
        <Select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </Field>

      <Field>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          type="text"
          placeholder="e.g. Weekly groceries at Trader Joe's"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Field>

      {error && (
        <p style={{ color: '#b91c1c', fontSize: '0.88rem', margin: '0 0 12px' }}>{error}</p>
      )}

      <div style={{ display: 'flex', gap: 8 }}>
        <Button type="submit">{editing ? 'Save changes' : 'Add transaction'}</Button>
        {editing && (
          <Button
            type="button"
            $variant="ghost"
            onClick={() => {
              onDoneEditing();
              resetForm();
            }}
          >
            Cancel
          </Button>
        )}
      </div>
    </Card>
  );
}

export function toEditing(tx: Transaction): EditingTransaction {
  return {
    id: tx.id,
    type: tx.type,
    amount: tx.amount,
    category: tx.category,
    description: tx.description,
    date: tx.date,
  };
}
