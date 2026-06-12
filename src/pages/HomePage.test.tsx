import { screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { renderPage } from '../test/renderPage';
import HomePage from './HomePage';

// Heavy media components are mocked: no WebGL or video playback in jsdom.
vi.mock('../components/StarfieldHero', () => ({
  default: () => <div data-testid="starfield-hero" />,
}));
vi.mock('../components/IntroPlayer', () => ({
  default: () => <div data-testid="intro-player" />,
}));

const EXPECTED_CARDS = [
  { href: '/products', title: 'Product Analytics' },
  { href: '/market', title: 'US Market Daily' },
  { href: '/alpha', title: 'Alpha Factors' },
  { href: '/signals', title: 'Signal Calendar' },
  { href: '/wisdom', title: 'Wisdom' },
  { href: '/gallery', title: 'Gallery' },
] as const;

function renderHomePage() {
  return renderPage(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );
}

describe('HomePage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders one card per section linking to its route', async () => {
    renderHomePage();

    // Wait for the lazy StarfieldHero chunk so Suspense resolves inside act.
    await screen.findByTestId('starfield-hero');

    const cards = screen.getAllByRole('listitem');
    expect(cards).toHaveLength(EXPECTED_CARDS.length);

    for (const [index, expected] of EXPECTED_CARDS.entries()) {
      const link = within(cards[index]).getByRole('link');
      expect(link).toHaveAttribute('href', expected.href);
      expect(link).toHaveTextContent(expected.title);
    }
  });

  it('renders the hero with intro player, lazy starfield, title and tagline', async () => {
    renderHomePage();

    expect(
      screen.getByRole('heading', { level: 1, name: 'Arcueid Daily Reports' }),
    ).toBeInTheDocument();
    expect(screen.getByTestId('intro-player')).toBeInTheDocument();
    // StarfieldHero is loaded via React.lazy, so it appears asynchronously.
    expect(await screen.findByTestId('starfield-hero')).toBeInTheDocument();
  });
});
