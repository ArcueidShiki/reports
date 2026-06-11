import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ContentFrame from './ContentFrame';

describe('ContentFrame', () => {
  it('renders a sandboxed iframe with the given src and title', () => {
    render(
      <ContentFrame
        src="/content/market/2026-06-10/card.html"
        title="小红书卡片"
      />,
    );

    const frame = screen.getByTitle('小红书卡片');
    expect(frame.tagName).toBe('IFRAME');
    expect(frame).toHaveAttribute(
      'src',
      '/content/market/2026-06-10/card.html',
    );
    expect(frame).toHaveAttribute('sandbox', 'allow-same-origin');
  });
});
