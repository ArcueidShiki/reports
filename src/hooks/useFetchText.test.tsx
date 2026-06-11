import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { stubFetchRoutes } from '../test/fetchStub';
import { useFetchText } from './useFetchText';

describe('useFetchText', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('fetches and exposes the text body', async () => {
    stubFetchRoutes({ '/content/alpha/README.md': { body: '# Alpha' } });

    const { result } = renderHook(() =>
      useFetchText('/content/alpha/README.md'),
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.text).toBe('# Alpha');
    expect(result.current.error).toBeNull();
  });

  it('stays idle when url is null', () => {
    const fetchMock = stubFetchRoutes({});

    const { result } = renderHook(() => useFetchText(null));

    expect(result.current.loading).toBe(false);
    expect(result.current.text).toBeNull();
    expect(result.current.error).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('reports an error on HTTP failure', async () => {
    stubFetchRoutes({ '/missing.md': { status: 404, body: 'nope' } });

    const { result } = renderHook(() => useFetchText('/missing.md'));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.text).toBeNull();
    expect(result.current.error).toMatch(/404/);
  });

  it('refetches when the url changes', async () => {
    stubFetchRoutes({
      '/a.md': { body: 'AAA' },
      '/b.md': { body: 'BBB' },
    });

    const { result, rerender } = renderHook(
      ({ url }: { url: string }) => useFetchText(url),
      { initialProps: { url: '/a.md' } },
    );

    await waitFor(() => expect(result.current.text).toBe('AAA'));

    rerender({ url: '/b.md' });

    await waitFor(() => expect(result.current.text).toBe('BBB'));
  });
});
