import { render, screen } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import type { Player } from '@remotion/player';
import IntroPlayer from './IntroPlayer';
import { INTRO_SUBTITLE, INTRO_TITLE } from '../remotion/Intro';

type PlayerProps = ComponentProps<typeof Player>;

const playerPropsSpy = vi.fn<(props: PlayerProps) => void>();

// Never boot a real Remotion player inside jsdom.
vi.mock('@remotion/player', () => ({
  Player: (props: PlayerProps) => {
    playerPropsSpy(props);
    return <div data-testid="remotion-player" />;
  },
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

describe('IntroPlayer', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    playerPropsSpy.mockClear();
  });

  it('renders the autoplaying, looping remotion player when motion is allowed', () => {
    stubMatchMedia(false);

    render(<IntroPlayer />);

    expect(screen.getByTestId('remotion-player')).toBeInTheDocument();
    expect(playerPropsSpy).toHaveBeenCalledWith(
      expect.objectContaining({ autoPlay: true, loop: true, controls: false }),
    );
  });

  it('shows a static, visible title and subtitle under reduced motion', () => {
    stubMatchMedia(true);

    render(<IntroPlayer />);

    // No frozen-at-frame-0 (opacity 0) player: replace it with static text.
    expect(screen.queryByTestId('remotion-player')).not.toBeInTheDocument();
    expect(screen.getByText(INTRO_TITLE)).toBeVisible();
    expect(screen.getByText(INTRO_SUBTITLE)).toBeVisible();
  });
});
