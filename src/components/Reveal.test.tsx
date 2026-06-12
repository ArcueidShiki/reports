import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import Reveal from './Reveal';

function stubMatchMedia(matches: boolean): void {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockReturnValue({
      matches,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      // Legacy MediaQueryList API still used by framer-motion.
      addListener: () => undefined,
      removeListener: () => undefined,
    }),
  );
}

describe('Reveal', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders its children', () => {
    stubMatchMedia(false);

    render(
      <Reveal>
        <p>Hidden treasure</p>
      </Reveal>,
    );

    expect(screen.getByText('Hidden treasure')).toBeInTheDocument();
  });

  it('passes the className through to the wrapper', () => {
    stubMatchMedia(false);

    const { container } = render(
      <Reveal className="ledger-section">
        <p>content</p>
      </Reveal>,
    );

    expect(container.firstElementChild).toHaveClass('ledger-section');
  });

  it('keeps children fully visible under reduced motion', () => {
    stubMatchMedia(true);

    const { container } = render(
      <Reveal>
        <p>Static treasure</p>
      </Reveal>,
    );

    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.style.opacity === '' || wrapper.style.opacity === '1').toBe(
      true,
    );
  });
});
