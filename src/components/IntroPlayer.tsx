import { Player } from '@remotion/player';

import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import Intro, {
  INTRO_DURATION_IN_FRAMES,
  INTRO_FPS,
  INTRO_HEIGHT,
  INTRO_SUBTITLE,
  INTRO_TITLE,
  INTRO_WIDTH,
} from '../remotion/Intro';

const PLAYER_STYLE = {
  width: '100%',
  maxWidth: `${INTRO_WIDTH}px`,
  aspectRatio: `${INTRO_WIDTH} / ${INTRO_HEIGHT}`,
} as const;

/**
 * Static replacement for the animated intro. Shown when the user prefers
 * reduced motion: the Remotion composition starts at opacity 0, so a paused
 * player would render an empty hero. Reduce the motion, keep the content.
 */
function StaticIntro() {
  return (
    <div className="intro-player intro-player-static">
      <p className="intro-static-title">{INTRO_TITLE}</p>
      <p className="intro-static-subtitle">{INTRO_SUBTITLE}</p>
    </div>
  );
}

/**
 * Looping, muted, control-less Remotion intro sized to its container.
 * Falls back to a static title/subtitle block when the user prefers
 * reduced motion.
 */
export default function IntroPlayer() {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <StaticIntro />;
  }

  return (
    <Player
      component={Intro}
      durationInFrames={INTRO_DURATION_IN_FRAMES}
      fps={INTRO_FPS}
      compositionWidth={INTRO_WIDTH}
      compositionHeight={INTRO_HEIGHT}
      autoPlay
      loop
      initiallyMuted
      controls={false}
      clickToPlay={false}
      acknowledgeRemotionLicense
      className="intro-player"
      style={PLAYER_STYLE}
    />
  );
}
