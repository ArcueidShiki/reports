import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { LanguageProvider } from '../i18n/LanguageContext';
import DateSelector from './DateSelector';

const DATES = ['2026-06-11', '2026-06-09'] as const;

function renderSelector(onChange = vi.fn()) {
  render(
    <LanguageProvider>
      <DateSelector dates={DATES} value="2026-06-11" onChange={onChange} />
    </LanguageProvider>,
  );
  return onChange;
}

describe('DateSelector', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders a labelled select with all dates as options', () => {
    renderSelector();

    const select = screen.getByRole('combobox', { name: 'Select date' });
    expect(select).toHaveValue('2026-06-11');

    const options = screen.getAllByRole('option');
    expect(options.map((o) => o.textContent)).toEqual([...DATES]);
  });

  it('calls onChange with the picked date', async () => {
    const user = userEvent.setup();
    const onChange = renderSelector();

    await user.selectOptions(screen.getByRole('combobox'), '2026-06-09');

    expect(onChange).toHaveBeenCalledWith('2026-06-09');
  });
});
