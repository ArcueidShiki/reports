import { useEffect, useState } from 'react';

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function isMatchMediaSupported(): boolean {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function';
}

function queryPrefersReducedMotion(): boolean {
  if (!isMatchMediaSupported()) {
    return false;
  }

  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/**
 * Tracks the OS-level "prefers-reduced-motion" setting.
 * Falls back to `false` (motion allowed) when matchMedia is unavailable.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    queryPrefersReducedMotion,
  );

  useEffect(() => {
    if (!isMatchMediaSupported()) {
      return undefined;
    }

    const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQueryList.addEventListener('change', onChange);
    return () => mediaQueryList.removeEventListener('change', onChange);
  }, []);

  return prefersReducedMotion;
}
