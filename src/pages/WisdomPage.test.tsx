import { screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { MANIFEST_URL, resetManifestCache } from '../hooks/useManifest';
import { contentUrl } from '../lib/contentUrl';
import { stubFetchRoutes } from '../test/fetchStub';
import { manifestFixtureJson } from '../test/manifestFixture';
import { renderPage } from '../test/renderPage';
import WisdomPage from './WisdomPage';

const WISDOM_URL = contentUrl('wisdom', 'investing-wisdom.md');

const WISDOM_MARKDOWN = `# Investing Wisdom

> Bullet point · Author · Source

---

## Mindset

- "Never lose money." · Warren Buffett · Berkshire Hathaway Shareholder Letters
- Time in the market beats timing the market.

## Patience

- Stay the course. · Jack Bogle · *The Little Book of Common Sense Investing*
`;

describe('WisdomPage', () => {
  beforeEach(() => {
    window.localStorage.clear();
    resetManifestCache();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders one section per category heading', async () => {
    stubFetchRoutes({
      [MANIFEST_URL]: { body: manifestFixtureJson },
      [WISDOM_URL]: { body: WISDOM_MARKDOWN },
    });

    renderPage(<WisdomPage />);

    expect(
      await screen.findByRole('heading', { level: 2, name: 'Mindset' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Patience' }),
    ).toBeInTheDocument();
  });

  it('renders a quote card with author and source attribution', async () => {
    stubFetchRoutes({
      [MANIFEST_URL]: { body: manifestFixtureJson },
      [WISDOM_URL]: { body: WISDOM_MARKDOWN },
    });

    renderPage(<WisdomPage />);

    const quote = await screen.findByText('"Never lose money."');
    const card = quote.closest('li');
    expect(card).not.toBeNull();
    const attribution = within(card as HTMLElement).getByText(/Warren Buffett/);
    expect(attribution).toHaveTextContent('Berkshire Hathaway Shareholder Letters');
  });

  it('renders an unmatched bullet as plain text without attribution', async () => {
    stubFetchRoutes({
      [MANIFEST_URL]: { body: manifestFixtureJson },
      [WISDOM_URL]: { body: WISDOM_MARKDOWN },
    });

    renderPage(<WisdomPage />);

    const quote = await screen.findByText(
      'Time in the market beats timing the market.',
    );
    const card = quote.closest('li') as HTMLElement;
    expect(within(card).queryByText(/·/)).not.toBeInTheDocument();
    expect(within(card).queryByText(/—/)).not.toBeInTheDocument();
  });

  it('shows an error state when the document fetch fails', async () => {
    stubFetchRoutes({
      [MANIFEST_URL]: { body: manifestFixtureJson },
      [WISDOM_URL]: { status: 500, body: 'boom' },
    });

    renderPage(<WisdomPage />);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Something went wrong.',
    );
  });

  it('shows the empty state when the manifest has no wisdom docs', async () => {
    const fixture = JSON.parse(manifestFixtureJson) as {
      sections: Record<string, unknown>;
    };
    const emptyManifest = {
      ...fixture,
      sections: { ...fixture.sections, wisdom: [] },
    };
    stubFetchRoutes({
      [MANIFEST_URL]: { body: JSON.stringify(emptyManifest) },
    });

    renderPage(<WisdomPage />);

    expect(await screen.findByText('No content available.')).toBeInTheDocument();
  });
});
