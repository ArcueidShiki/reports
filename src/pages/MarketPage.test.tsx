import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { MANIFEST_URL, resetManifestCache } from '../hooks/useManifest';
import { contentUrl } from '../lib/contentUrl';
import { stubFetchRoutes } from '../test/fetchStub';
import { manifestFixtureJson } from '../test/manifestFixture';
import { renderPage } from '../test/renderPage';
import MarketPage from './MarketPage';

const EN_MD_URL = contentUrl(
  'market',
  '2026-06-10',
  '2026-06-10-cpi-hits-4-percent.md',
);
const ZH_ONLY_MD_URL = contentUrl(
  'market',
  '2026-06-08',
  '2026-06-08-提词器-深度解读.md',
);
const HTML_CARD_URL = contentUrl(
  'market',
  '2026-06-10',
  '2026-06-10-小红书卡片.html',
);
const PREMARKET_MD_URL = contentUrl(
  'market',
  '2026-06-10',
  '2026-06-10-premarket.md',
);

describe('MarketPage', () => {
  beforeEach(() => {
    window.localStorage.clear();
    resetManifestCache();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders the English markdown for the latest date when site is English', async () => {
    stubFetchRoutes({
      [MANIFEST_URL]: { body: manifestFixtureJson },
      [EN_MD_URL]: { body: '# CPI hits 4 percent\n\nMarkets fell.' },
    });

    renderPage(<MarketPage />);

    expect(
      await screen.findByRole('heading', { name: 'CPI hits 4 percent' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Markets fell.')).toBeInTheDocument();
    expect(
      screen.queryByText(/Translated version unavailable/),
    ).not.toBeInTheDocument();
  });

  it('renders an html card in a sandboxed iframe when its tab is opened', async () => {
    stubFetchRoutes({
      [MANIFEST_URL]: { body: manifestFixtureJson },
      [EN_MD_URL]: { body: '# CPI hits 4 percent' },
    });

    renderPage(<MarketPage />);
    await screen.findByRole('heading', { name: 'CPI hits 4 percent' });

    await userEvent.click(screen.getByRole('button', { name: '小红书卡片' }));

    const frame = screen.getByTitle('小红书卡片');
    expect(frame).toHaveAttribute('src', HTML_CARD_URL);
    expect(frame).toHaveAttribute('sandbox', 'allow-same-origin');
    expect(HTML_CARD_URL).toContain('%E5%B0%8F%E7%BA%A2%E4%B9%A6');
  });

  it('lists all md docs for the date, daily doc first, with session labels', async () => {
    stubFetchRoutes({
      [MANIFEST_URL]: { body: manifestFixtureJson },
      [EN_MD_URL]: { body: '# CPI hits 4 percent' },
    });

    renderPage(<MarketPage />);
    await screen.findByRole('heading', { name: 'CPI hits 4 percent' });

    const tabs = screen.getAllByRole('button').map((tab) => tab.textContent);
    expect(tabs).toEqual([
      'cpi hits 4 percent',
      'Pre-Market',
      'Post-Market',
      '小红书',
      '小红书卡片',
    ]);
  });

  it('switches to a session report when its tab is clicked', async () => {
    stubFetchRoutes({
      [MANIFEST_URL]: { body: manifestFixtureJson },
      [EN_MD_URL]: { body: '# CPI hits 4 percent' },
      [PREMARKET_MD_URL]: { body: '# Pre-market briefing\n\nFutures up.' },
    });

    renderPage(<MarketPage />);
    await screen.findByRole('heading', { name: 'CPI hits 4 percent' });

    await userEvent.click(screen.getByRole('button', { name: 'Pre-Market' }));

    expect(
      await screen.findByRole('heading', { name: 'Pre-market briefing' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Futures up.')).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'CPI hits 4 percent' }),
    ).not.toBeInTheDocument();
  });

  it('falls back to the other language with a note when no translation exists', async () => {
    stubFetchRoutes({
      [MANIFEST_URL]: { body: manifestFixtureJson },
      [EN_MD_URL]: { body: '# CPI hits 4 percent' },
      [ZH_ONLY_MD_URL]: { body: '# 提词器深度解读' },
    });

    renderPage(<MarketPage />);
    await screen.findByRole('heading', { name: 'CPI hits 4 percent' });

    await userEvent.selectOptions(screen.getByRole('combobox'), '2026-06-08');

    expect(
      await screen.findByRole('heading', { name: '提词器深度解读' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Translated version unavailable/),
    ).toBeInTheDocument();
  });

  it('shows an error state when the markdown fetch fails', async () => {
    stubFetchRoutes({
      [MANIFEST_URL]: { body: manifestFixtureJson },
      [EN_MD_URL]: { status: 500, body: 'boom' },
    });

    renderPage(<MarketPage />);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Something went wrong.',
    );
  });
});
