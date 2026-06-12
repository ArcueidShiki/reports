import { describe, expect, it } from 'vitest';

import {
  LEDGER_EASE,
  pageVariants,
  riseVariants,
  staggerVariants,
} from './motion';

interface RiseHidden {
  readonly opacity: number;
  readonly y: number;
}

interface RiseVisible {
  readonly opacity: number;
  readonly y: number;
  readonly transition: {
    readonly duration: number;
    readonly delay: number;
    readonly ease: readonly number[];
  };
}

describe('riseVariants', () => {
  it('hides below the baseline and rises into place with motion allowed', () => {
    const variants = riseVariants(false);

    const hidden = variants.hidden as RiseHidden;
    const visible = variants.visible as RiseVisible;

    expect(hidden.opacity).toBe(0);
    expect(hidden.y).toBeGreaterThan(0);
    expect(visible.opacity).toBe(1);
    expect(visible.y).toBe(0);
    expect(visible.transition.duration).toBeGreaterThan(0);
    expect(visible.transition.ease).toEqual(LEDGER_EASE);
  });

  it('honours distance, duration, and delay overrides', () => {
    const variants = riseVariants(false, {
      distancePx: 40,
      durationS: 1.2,
      delayS: 0.3,
    });

    expect((variants.hidden as RiseHidden).y).toBe(40);
    expect((variants.visible as RiseVisible).transition.duration).toBe(1.2);
    expect((variants.visible as RiseVisible).transition.delay).toBe(0.3);
  });

  it('renders fully visible with no movement under reduced motion', () => {
    const variants = riseVariants(true, { distancePx: 40 });

    expect(variants.hidden).toEqual({ opacity: 1, y: 0 });
    const visible = variants.visible as RiseVisible;
    expect(visible.opacity).toBe(1);
    expect(visible.y).toBe(0);
    expect(visible.transition.duration).toBe(0);
  });
});

interface StaggerVisible {
  readonly transition: {
    readonly staggerChildren: number;
    readonly delayChildren: number;
  };
}

describe('staggerVariants', () => {
  it('staggers children with motion allowed', () => {
    const variants = staggerVariants(false, {
      staggerS: 0.11,
      delayChildrenS: 0.2,
    });

    const visible = variants.visible as StaggerVisible;
    expect(visible.transition.staggerChildren).toBe(0.11);
    expect(visible.transition.delayChildren).toBe(0.2);
  });

  it('uses a positive default stagger', () => {
    const variants = staggerVariants(false);

    const visible = variants.visible as StaggerVisible;
    expect(visible.transition.staggerChildren).toBeGreaterThan(0);
  });

  it('removes all stagger and delay under reduced motion', () => {
    const variants = staggerVariants(true, {
      staggerS: 0.11,
      delayChildrenS: 0.2,
    });

    const visible = variants.visible as StaggerVisible;
    expect(visible.transition.staggerChildren).toBe(0);
    expect(visible.transition.delayChildren).toBe(0);
  });
});

interface PageState {
  readonly opacity: number;
  readonly y: number;
  readonly transition?: { readonly duration: number };
}

describe('pageVariants', () => {
  it('slides the page up on enter and out on exit with motion allowed', () => {
    const variants = pageVariants(false);

    const initial = variants.initial as PageState;
    const enter = variants.enter as PageState;
    const exit = variants.exit as PageState;

    expect(initial.opacity).toBe(0);
    expect(initial.y).toBeGreaterThan(0);
    expect(enter.opacity).toBe(1);
    expect(enter.y).toBe(0);
    expect(exit.opacity).toBe(0);
    expect(enter.transition?.duration).toBeGreaterThan(0);
  });

  it('swaps pages instantly under reduced motion', () => {
    const variants = pageVariants(true);

    const initial = variants.initial as PageState;
    const enter = variants.enter as PageState;
    const exit = variants.exit as PageState;

    expect(initial).toMatchObject({ opacity: 1, y: 0 });
    expect(exit).toMatchObject({ opacity: 1, y: 0 });
    expect(enter.transition?.duration).toBe(0);
    expect(exit.transition?.duration).toBe(0);
  });
});
