import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import StarfieldHero from './StarfieldHero';

// Never boot a real WebGL canvas inside jsdom.
vi.mock('@react-three/fiber', () => ({
  Canvas: () => <div data-testid="r3f-canvas" />,
  useFrame: () => undefined,
}));

function stubMatchMedia(matches: boolean): void {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockReturnValue({
      matches,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
    }),
  );
}

describe('StarfieldHero', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders the three.js canvas as a decorative background', () => {
    stubMatchMedia(false);

    render(<StarfieldHero />);

    const hero = screen.getByTestId('starfield-hero');
    expect(hero).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByTestId('r3f-canvas')).toBeInTheDocument();
  });

  it('renders nothing when the user prefers reduced motion', () => {
    stubMatchMedia(true);

    const { container } = render(<StarfieldHero />);

    expect(container).toBeEmptyDOMElement();
  });
});
