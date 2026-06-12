import type { Variants } from 'framer-motion';

/**
 * Shared motion grammar for the "Midnight Ledger" design system.
 * Every factory takes `reducedMotion` so callers can collapse the
 * animation into a static state for users who prefer reduced motion.
 */

/** Signature ease: a long decelerating settle, like a page laid on a desk. */
export const LEDGER_EASE = [0.22, 1, 0.36, 1] as const;

const RISE_DISTANCE_PX = 28;
const RISE_DURATION_S = 0.7;
const STAGGER_DEFAULT_S = 0.08;
const PAGE_RISE_PX = 18;
const PAGE_ENTER_S = 0.45;
const PAGE_EXIT_S = 0.22;

export interface RiseOptions {
  readonly distancePx?: number;
  readonly durationS?: number;
  readonly delayS?: number;
}

/** Fade-and-rise reveal used for headings, cards, and content sections. */
export function riseVariants(
  reducedMotion: boolean,
  options: RiseOptions = {},
): Variants {
  const {
    distancePx = RISE_DISTANCE_PX,
    durationS = RISE_DURATION_S,
    delayS = 0,
  } = options;

  if (reducedMotion) {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0, delay: 0, ease: LEDGER_EASE },
      },
    };
  }

  return {
    hidden: { opacity: 0, y: distancePx },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: durationS, delay: delayS, ease: LEDGER_EASE },
    },
  };
}

export interface StaggerOptions {
  readonly staggerS?: number;
  readonly delayChildrenS?: number;
}

/** Container variants that cascade child reveals one after another. */
export function staggerVariants(
  reducedMotion: boolean,
  options: StaggerOptions = {},
): Variants {
  const { staggerS = STAGGER_DEFAULT_S, delayChildrenS = 0 } = options;

  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : staggerS,
        delayChildren: reducedMotion ? 0 : delayChildrenS,
      },
    },
  };
}

/** Route-transition variants: pages rise in and slip out. */
export function pageVariants(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      initial: { opacity: 1, y: 0 },
      enter: { opacity: 1, y: 0, transition: { duration: 0 } },
      exit: { opacity: 1, y: 0, transition: { duration: 0 } },
    };
  }

  return {
    initial: { opacity: 0, y: PAGE_RISE_PX },
    enter: {
      opacity: 1,
      y: 0,
      transition: { duration: PAGE_ENTER_S, ease: LEDGER_EASE },
    },
    exit: {
      opacity: 0,
      y: -PAGE_RISE_PX / 2,
      transition: { duration: PAGE_EXIT_S, ease: 'easeIn' },
    },
  };
}
