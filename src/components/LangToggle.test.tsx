import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { LanguageProvider } from '../i18n/LanguageContext';
import LangToggle from './LangToggle';

function renderToggle() {
  return render(
    <LanguageProvider>
      <LangToggle />
    </LanguageProvider>,
  );
}

describe('LangToggle', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders both language options with English active by default', () => {
    renderToggle();

    expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: '中文' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('activates Chinese when 中文 is clicked', async () => {
    const user = userEvent.setup();
    renderToggle();

    await user.click(screen.getByRole('button', { name: '中文' }));

    expect(screen.getByRole('button', { name: '中文' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('switches back to English from Chinese', async () => {
    const user = userEvent.setup();
    renderToggle();

    await user.click(screen.getByRole('button', { name: '中文' }));
    await user.click(screen.getByRole('button', { name: 'EN' }));

    expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });
});
