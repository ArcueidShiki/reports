import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const INTRO_DURATION_IN_FRAMES = 150;
export const INTRO_FPS = 30;
export const INTRO_WIDTH = 1200;
export const INTRO_HEIGHT = 400;

export const INTRO_TITLE = 'Arcueid Daily Reports';
export const INTRO_SUBTITLE = '每日报告';
const SUBTITLE_DELAY_FRAMES = 18;
const FADE_OUT_FRAMES = 24;
const SLIDE_DISTANCE_PX = 48;
const SPRING_DAMPING = 14;

interface AnimatedLine {
  readonly opacity: number;
  readonly translateY: number;
}

function animateLine(
  frame: number,
  fps: number,
  delay: number,
  fadeOut: number,
): AnimatedLine {
  const progress = spring({
    frame,
    fps,
    delay,
    config: { damping: SPRING_DAMPING },
  });

  return {
    opacity: interpolate(progress, [0, 1], [0, 1]) * fadeOut,
    translateY: interpolate(progress, [0, 1], [SLIDE_DISTANCE_PX, 0]),
  };
}

/**
 * 150-frame looping intro: title and Chinese subtitle fade and slide in
 * with springs, then fade out so the loop restarts cleanly.
 */
export default function Intro() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeOut = interpolate(
    frame,
    [durationInFrames - FADE_OUT_FRAMES, durationInFrames - 1],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  const title = animateLine(frame, fps, 0, fadeOut);
  const subtitle = animateLine(frame, fps, SUBTITLE_DELAY_FRAMES, fadeOut);

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        fontFamily: "system-ui, -apple-system, 'Noto Sans SC', sans-serif",
        color: '#e6edf3',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: 700,
          letterSpacing: '0.02em',
          opacity: title.opacity,
          transform: `translateY(${title.translateY}px)`,
        }}
      >
        {INTRO_TITLE}
      </div>
      <div
        style={{
          fontSize: 36,
          marginTop: 24,
          color: '#8b949e',
          opacity: subtitle.opacity,
          transform: `translateY(${subtitle.translateY}px)`,
        }}
      >
        {INTRO_SUBTITLE}
      </div>
    </AbsoluteFill>
  );
}
