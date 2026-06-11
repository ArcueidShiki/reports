import { vi } from 'vitest';

export interface StubRoute {
  readonly status?: number;
  readonly body: string;
  readonly contentType?: string;
}

export type StubRoutes = Readonly<Record<string, StubRoute>>;

function requestUrl(input: RequestInfo | URL): string {
  if (typeof input === 'string') return input;
  if (input instanceof URL) return input.pathname + input.search;
  return input.url;
}

/**
 * Replaces global fetch with a stub that serves the given routes by URL.
 * Unknown URLs get a 404 so tests fail loudly instead of hanging.
 */
export function stubFetchRoutes(routes: StubRoutes): ReturnType<typeof vi.fn> {
  const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
    const url = requestUrl(input);
    const route = routes[url];
    if (!route) {
      return new Response(`stubFetchRoutes: no route for ${url}`, {
        status: 404,
      });
    }
    return new Response(route.body, {
      status: route.status ?? 200,
      headers: { 'Content-Type': route.contentType ?? 'text/plain' },
    });
  });

  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

/** Replaces global fetch with one that always rejects (network failure). */
export function stubFetchNetworkError(message = 'network down'): void {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => {
      throw new Error(message);
    }),
  );
}
