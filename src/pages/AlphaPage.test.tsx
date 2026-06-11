import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { MANIFEST_URL, resetManifestCache } from '../hooks/useManifest';
import { contentUrl } from '../lib/contentUrl';
import { stubFetchRoutes } from '../test/fetchStub';
import { manifestFixtureJson } from '../test/manifestFixture';
import { renderPage } from '../test/renderPage';
import AlphaPage from './AlphaPage';

const README_URL = contentUrl('alpha', 'README.md');
const TECHNICAL_URL = contentUrl('alpha', 'technical-factors.md');

describe('AlphaPage', () => {
  beforeEach(() => {
    window.localStorage.clear();
    resetManifestCache();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows tabs for all four docs and renders the overview by default', async () => {
    stubFetchRoutes({
      [MANIFEST_URL]: { body: manifestFixtureJson },
      [README_URL]: { body: '# Alpha Factors Library' },
    });

    renderPage(<AlphaPage />);

    expect(
      await screen.findByRole('heading', { name: 'Alpha Factors Library' }),
    ).toBeInTheDocument();

    for (const tab of [
      'Alpha Factors Overview',
      'Technical Factors',
      'Value Factors',
      'Sentiment Factors',
    ]) {
      expect(screen.getByRole('button', { name: tab })).toBeInTheDocument();
    }
  });

  it('fetches and renders another doc when its tab is clicked', async () => {
    stubFetchRoutes({
      [MANIFEST_URL]: { body: manifestFixtureJson },
      [README_URL]: { body: '# Alpha Factors Library' },
      [TECHNICAL_URL]: { body: '# Momentum and Reversal' },
    });

    renderPage(<AlphaPage />);
    await screen.findByRole('heading', { name: 'Alpha Factors Library' });

    await userEvent.click(
      screen.getByRole('button', { name: 'Technical Factors' }),
    );

    expect(
      await screen.findByRole('heading', { name: 'Momentum and Reversal' }),
    ).toBeInTheDocument();
  });

  it('shows an error state when a doc fetch fails', async () => {
    stubFetchRoutes({
      [MANIFEST_URL]: { body: manifestFixtureJson },
      [README_URL]: { status: 500, body: 'boom' },
    });

    renderPage(<AlphaPage />);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Something went wrong.',
    );
  });
});
