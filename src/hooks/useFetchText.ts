import { useEffect, useState } from 'react';

export interface FetchTextState {
  readonly text: string | null;
  readonly loading: boolean;
  readonly error: string | null;
}

const IDLE_STATE: FetchTextState = { text: null, loading: false, error: null };
const LOADING_STATE: FetchTextState = { text: null, loading: true, error: null };

/**
 * Fetches a text resource (markdown, JSON-as-text) with explicit
 * loading/error states. Pass null to stay idle.
 */
export function useFetchText(url: string | null): FetchTextState {
  const [state, setState] = useState<FetchTextState>(
    url === null ? IDLE_STATE : LOADING_STATE,
  );

  useEffect(() => {
    if (url === null) {
      setState(IDLE_STATE);
      return undefined;
    }

    let cancelled = false;
    setState(LOADING_STATE);

    fetch(url)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Failed to load ${url}: HTTP ${response.status}`);
        }
        return response.text();
      })
      .then((text) => {
        if (!cancelled) {
          setState({ text, loading: false, error: null });
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            text: null,
            loading: false,
            error: error instanceof Error ? error.message : String(error),
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return state;
}
