import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  stubFetchNetworkError,
  stubFetchRoutes,
} from '../test/fetchStub';
import { manifestFixtureJson } from '../test/manifestFixture';
import { MANIFEST_URL, resetManifestCache, useManifest } from './useManifest';

describe('useManifest', () => {
  beforeEach(() => {
    resetManifestCache();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('starts loading, then exposes the validated manifest', async () => {
    stubFetchRoutes({ [MANIFEST_URL]: { body: manifestFixtureJson } });

    const { result } = renderHook(() => useManifest());

    expect(result.current.loading).toBe(true);
    expect(result.current.manifest).toBeNull();

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBeNull();
    expect(result.current.manifest?.sections.alpha).toHaveLength(4);
  });

  it('fetches the manifest only once across hook instances', async () => {
    const fetchMock = stubFetchRoutes({
      [MANIFEST_URL]: { body: manifestFixtureJson },
    });

    const first = renderHook(() => useManifest());
    await waitFor(() => expect(first.result.current.loading).toBe(false));

    const second = renderHook(() => useManifest());
    await waitFor(() => expect(second.result.current.loading).toBe(false));

    expect(second.result.current.manifest).not.toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('reports an error state on HTTP failure', async () => {
    stubFetchRoutes({ [MANIFEST_URL]: { status: 500, body: 'boom' } });

    const { result } = renderHook(() => useManifest());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.manifest).toBeNull();
    expect(result.current.error).toMatch(/500/);
  });

  it('reports an error state when the manifest shape is invalid', async () => {
    stubFetchRoutes({
      [MANIFEST_URL]: { body: JSON.stringify({ sections: { market: 'x' } }) },
    });

    const { result } = renderHook(() => useManifest());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.manifest).toBeNull();
    expect(result.current.error).toMatch(/array/i);
  });

  it('reports an error state on network failure', async () => {
    stubFetchNetworkError('connection refused');

    const { result } = renderHook(() => useManifest());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toMatch(/connection refused/);
  });
});
