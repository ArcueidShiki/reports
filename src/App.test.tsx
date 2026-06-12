import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import App from './App';

// Heavy media components are mocked: no WebGL or video playback in jsdom.
vi.mock('./components/StarfieldHero', () => ({
  default: () => <div data-testid="starfield-hero" />,
}));
vi.mock('./components/IntroPlayer', () => ({
  default: () => <div data-testid="intro-player" />,
}));

// 7 section links + the brand wordmark linking home.
const NAV_LINK_COUNT = 8;
const FOOTER_LINK_COUNT = 3;
const HOME_CARD_LINK_COUNT = 6;

describe('App', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.pushState({}, '', '/');
  });

  it('renders the nav, the lazily loaded home page, and the footer', async () => {
    render(<App />);

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: 'Arcueid Daily Reports',
      }),
    ).toBeInTheDocument();

    expect(screen.getAllByRole('link')).toHaveLength(
      NAV_LINK_COUNT + FOOTER_LINK_COUNT + HOME_CARD_LINK_COUNT,
    );
    expect(screen.getByRole('link', { name: 'Resume' })).toHaveAttribute(
      'href',
      'https://cv.arcueidshiki.uk/cv2.html',
    );
  });

  it('navigates to a section page via the nav links', async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByRole('heading', {
      level: 1,
      name: 'Arcueid Daily Reports',
    });

    await user.click(screen.getByRole('link', { name: 'Product Analytics' }));

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: 'Product Analytics',
      }),
    ).toBeInTheDocument();
  });
});
