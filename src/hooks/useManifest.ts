import { useEffect, useState } from 'react';

import { validateManifest, type Manifest } from '../lib/manifest';

export const MANIFEST_URL = '/content/manifest.json';

export interface ManifestState {
  readonly manifest: Manifest | null;
  readonly loading: boolean;
  readonly error: string | null;
}

let cachedManifest: Manifest | null = null;
let pendingLoad: Promise<Manifest> | null = null;

/** Test hook: clears the module-level cache between tests. */
export function resetManifestCache(): void {
  cachedManifest = null;
  pendingLoad = null;
}

async function loadManifest(): Promise<Manifest> {
  const response = await fetch(MANIFEST_URL);
  if (!response.ok) {
    throw new Error(`Failed to load manifest: HTTP ${response.status}`);
  }
  const data: unknown = await response.json();
  return validateManifest(data);
}

function toErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/**
 * Fetches and validates /content/manifest.json once per session
 * (module-level cache); later subscribers reuse the cached result.
 */
export function useManifest(): ManifestState {
  const [state, setState] = useState<ManifestState>(() =>
    cachedManifest
      ? { manifest: cachedManifest, loading: false, error: null }
      : { manifest: null, loading: true, error: null },
  );

  useEffect(() => {
    if (cachedManifest) return undefined;

    let cancelled = false;
    if (!pendingLoad) {
      pendingLoad = loadManifest();
    }

    pendingLoad
      .then((manifest) => {
        cachedManifest = manifest;
        if (!cancelled) {
          setState({ manifest, loading: false, error: null });
        }
      })
      .catch((error: unknown) => {
        pendingLoad = null;
        if (!cancelled) {
          setState({
            manifest: null,
            loading: false,
            error: toErrorMessage(error),
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
