import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { renderPage } from '../test/renderPage';
import PageHeader, { formatSectionIndex } from './PageHeader';

describe('formatSectionIndex', () => {
  it('zero-pads single-digit indices', () => {
    expect(formatSectionIndex(1)).toBe('01');
    expect(formatSectionIndex(6)).toBe('06');
  });

  it('keeps two-digit indices as-is', () => {
    expect(formatSectionIndex(12)).toBe('12');
  });

  it('rejects non-positive or non-integer indices', () => {
    expect(() => formatSectionIndex(0)).toThrow(RangeError);
    expect(() => formatSectionIndex(-3)).toThrow(RangeError);
    expect(() => formatSectionIndex(1.5)).toThrow(RangeError);
  });
});

describe('PageHeader', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders the title as the page h1', () => {
    renderPage(
      <PageHeader index={2} kicker="Daily Briefing" title="US Market Daily" />,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'US Market Daily' }),
    ).toBeInTheDocument();
  });

  it('renders the kicker with the zero-padded section number', () => {
    renderPage(
      <PageHeader index={2} kicker="Daily Briefing" title="US Market Daily" />,
    );

    expect(screen.getByText(/Daily Briefing/)).toHaveTextContent('02');
  });
});
