import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  REDUCED_MOTION_QUERY,
  usePrefersReducedMotion,
} from './usePrefersReducedMotion';

type ChangeListener = (event: MediaQueryListEvent) => void;

/**
 * Installs a window.matchMedia stub for the reduced-motion query and
 * returns a function that emits a change event to all listeners.
 */
function stubMatchMedia(initialMatches: boolean): {
  emitChange: (matches: boolean) => void;
  matchMedia: ReturnType<typeof vi.fn>;
} {
  const listeners = new Set<ChangeListener>();

  const mediaQueryList = {
    matches: initialMatches,
    media: REDUCED_MOTION_QUERY,
    addEventListener: (_type: 'change', listener: ChangeListener) => {
      listeners.add(listener);
    },
    removeEventListener: (_type: 'change', listener: ChangeListener) => {
      listeners.delete(listener);
    },
  };

  const matchMedia = vi.fn().mockReturnValue(mediaQueryList);
  vi.stubGlobal('matchMedia', matchMedia);

  const emitChange = (matches: boolean) => {
    for (const listener of listeners) {
      listener({ matches } as MediaQueryListEvent);
    }
  };

  return { emitChange, matchMedia };
}

describe('usePrefersReducedMotion', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns false when matchMedia is unavailable (e.g. old browsers)', () => {
    expect(window.matchMedia).toBeUndefined();

    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(false);
  });

  it('returns true when the user prefers reduced motion', () => {
    const { matchMedia } = stubMatchMedia(true);

    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(true);
    expect(matchMedia).toHaveBeenCalledWith(REDUCED_MOTION_QUERY);
  });

  it('returns false when the user has no reduced-motion preference', () => {
    stubMatchMedia(false);

    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(false);
  });

  it('updates when the media query preference changes', () => {
    const { emitChange } = stubMatchMedia(false);

    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);

    act(() => emitChange(true));
    expect(result.current).toBe(true);

    act(() => emitChange(false));
    expect(result.current).toBe(false);
  });

  it('removes its change listener on unmount', () => {
    const { emitChange } = stubMatchMedia(false);

    const { result, unmount } = renderHook(() => usePrefersReducedMotion());
    unmount();

    expect(() => act(() => emitChange(true))).not.toThrow();
    expect(result.current).toBe(false);
  });
});
