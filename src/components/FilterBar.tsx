import styled from 'styled-components';
import { CATEGORIES } from '../types';
import type { TransactionFilter } from '../store/selectors';
import { Card, Field, Input, Label, Select } from '../styles';

/**
 * Filter toolbar: five quiet fields in a row, presets as pills underneath.
 * Same fields, same presets, same behaviour — only the chrome changed.
 */

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1.4fr 1fr 1fr;
  gap: 13px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const Presets = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 13px;
  flex-wrap: wrap;
`;

const Preset = styled.button`
  border: 1px solid var(--line);
  background: var(--surface);
  border-radius: var(--radius-pill);
  padding: 7px 14px;
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  color: var(--ink);
  cursor: pointer;
  transition:
    background-color 0.12s ease,
    border-color 0.12s ease,
    color 0.12s ease;

  &:hover {
    background: var(--accent-soft);
    border-color: var(--accent);
    color: var(--accent-strong);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

interface Props {
  filter: TransactionFilter;
  onChange: (next: TransactionFilter) => void;
}

export default function FilterBar({ filter, onChange }: Props) {
  const set = (patch: Partial<TransactionFilter>) => onChange({ ...filter, ...patch });

  function applyPreset(preset: 'month' | '30days' | 'all') {
    const now = new Date();
    if (preset === 'all') {
      set({ startDate: '', endDate: '' });
    } else if (preset === 'month') {
      const first = new Date(now.getFullYear(), now.getMonth(), 1);
      set({ startDate: first.toISOString().slice(0, 10), endDate: now.toISOString().slice(0, 10) });
    } else {
      const from = new Date(now);
      from.setDate(from.getDate() - 30);
      set({ startDate: from.toISOString().slice(0, 10), endDate: now.toISOString().slice(0, 10) });
    }
  }

  return (
    <Card style={{ marginBottom: 21 }} className="et-enter">
      <FilterGrid>
        <Field style={{ marginBottom: 0 }}>
          <Label htmlFor="f-search">Search</Label>
          <Input
            id="f-search"
            type="text"
            placeholder="Description or category"
            value={filter.search}
            onChange={(e) => set({ search: e.target.value })}
          />
        </Field>
        <Field style={{ marginBottom: 0 }}>
          <Label htmlFor="f-type">Type</Label>
          <Select id="f-type" value={filter.type} onChange={(e) => set({ type: e.target.value as TransactionFilter['type'] })}>
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expenses</option>
          </Select>
        </Field>
        <Field style={{ marginBottom: 0 }}>
          <Label htmlFor="f-category">Category</Label>
          <Select id="f-category" value={filter.category} onChange={(e) => set({ category: e.target.value })}>
            <option value="all">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field style={{ marginBottom: 0 }}>
          <Label htmlFor="f-from">From</Label>
          <Input id="f-from" type="date" value={filter.startDate} onChange={(e) => set({ startDate: e.target.value })} />
        </Field>
        <Field style={{ marginBottom: 0 }}>
          <Label htmlFor="f-to">To</Label>
          <Input id="f-to" type="date" value={filter.endDate} onChange={(e) => set({ endDate: e.target.value })} />
        </Field>
      </FilterGrid>
      <Presets>
        <Preset type="button" onClick={() => applyPreset('month')}>This month</Preset>
        <Preset type="button" onClick={() => applyPreset('30days')}>Last 30 days</Preset>
        <Preset type="button" onClick={() => applyPreset('all')}>All time</Preset>
      </Presets>
    </Card>
  );
}
