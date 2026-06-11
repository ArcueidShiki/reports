import { Player } from '@remotion/player';

import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import Intro, {
  INTRO_DURATION_IN_FRAMES,
  INTRO_FPS,
  INTRO_HEIGHT,
  INTRO_WIDTH,
} from '../remotion/Intro';

/**
 * Looping, muted, control-less Remotion intro sized to its container.
 * Autoplay is suppressed when the user prefers reduced motion.
 */
export default function IntroPlayer() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <Player
      component={Intro}
      durationInFrames={INTRO_DURATION_IN_FRAMES}
      fps={INTRO_FPS}
      compositionWidth={INTRO_WIDTH}
      compositionHeight={INTRO_HEIGHT}
      autoPlay={!prefersReducedMotion}
      loop
      initiallyMuted
      controls={false}
      clickToPlay={false}
      acknowledgeRemotionLicense
      className="intro-player"
      style={{
        width: '100%',
        maxWidth: `${INTRO_WIDTH}px`,
        aspectRatio: `${INTRO_WIDTH} / ${INTRO_HEIGHT}`,
      }}
    />
  );
}
