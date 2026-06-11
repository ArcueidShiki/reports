import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import MarkdownView from './MarkdownView';

const GFM_TABLE = [
  '# Signals',
  '',
  '| Metric | Value |',
  '| ------ | ----- |',
  '| CPI    | 4.2%  |',
].join('\n');

describe('MarkdownView', () => {
  it('renders headings from markdown', () => {
    render(<MarkdownView markdown={GFM_TABLE} />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Signals' }),
    ).toBeInTheDocument();
  });

  it('renders GFM tables as real table elements', () => {
    render(<MarkdownView markdown={GFM_TABLE} />);

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '4.2%' })).toBeInTheDocument();
  });
});
