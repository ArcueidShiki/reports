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

  it('resolves relative image paths against baseUrl', () => {
    render(
      <MarkdownView
        markdown="![chart](assets/2026-07-09/chart.png)"
        baseUrl="/content/products/2026-07-09"
      />,
    );

    expect(screen.getByRole('img', { name: 'chart' })).toHaveAttribute(
      'src',
      '/content/products/2026-07-09/assets/2026-07-09/chart.png',
    );
  });

  it('leaves absolute urls untouched when baseUrl is set', () => {
    render(
      <MarkdownView
        markdown="![ext](https://example.com/a.png) ![root](/img/b.png)"
        baseUrl="/content/products/2026-07-09"
      />,
    );

    expect(screen.getByRole('img', { name: 'ext' })).toHaveAttribute(
      'src',
      'https://example.com/a.png',
    );
    expect(screen.getByRole('img', { name: 'root' })).toHaveAttribute(
      'src',
      '/img/b.png',
    );
  });

  it('keeps relative paths as-is without a baseUrl', () => {
    render(<MarkdownView markdown="![chart](assets/chart.png)" />);

    expect(screen.getByRole('img', { name: 'chart' })).toHaveAttribute(
      'src',
      'assets/chart.png',
    );
  });
});
