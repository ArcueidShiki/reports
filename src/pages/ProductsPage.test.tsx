import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { MANIFEST_URL, resetManifestCache } from '../hooks/useManifest';
import { contentUrl } from '../lib/contentUrl';
import { stubFetchRoutes } from '../test/fetchStub';
import { manifestFixtureJson } from '../test/manifestFixture';
import { renderPage } from '../test/renderPage';
import ProductsPage from './ProductsPage';

const ANALYSIS_LATEST = JSON.stringify({
  scrape_date: '2026-06-11',
  products: [
    {
      name: 'Publora',
      category: 'Social publishing API',
      url: 'https://publora.com',
      ph: '#1 on 2026-06-10, 478 upvotes',
      business_model: 'Freemium SaaS',
      success_factors: ['MCP-native positioning', 'Low entry price'],
    },
  ],
});

const ANALYSIS_OLDER = JSON.stringify({
  scrape_date: '2026-06-09',
  products: [{ name: 'OlderProduct', url: 'https://older.test' }],
});

const LATEST_URL = contentUrl('products', '2026-06-11', 'products-analysis.json');
const OLDER_URL = contentUrl('products', '2026-06-09', 'products-analysis.json');

describe('ProductsPage', () => {
  beforeEach(() => {
    window.localStorage.clear();
    resetManifestCache();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders product cards for the latest date by default', async () => {
    stubFetchRoutes({
      [MANIFEST_URL]: { body: manifestFixtureJson },
      [LATEST_URL]: { body: ANALYSIS_LATEST },
    });

    renderPage(<ProductsPage />);

    const link = await screen.findByRole('link', { name: 'Publora' });
    expect(link).toHaveAttribute('href', 'https://publora.com');
    expect(screen.getByText('#1 on 2026-06-10, 478 upvotes')).toBeInTheDocument();
    expect(screen.getByText('Social publishing API')).toBeInTheDocument();
    expect(screen.getByText('Freemium SaaS')).toBeInTheDocument();
    expect(screen.getByText('MCP-native positioning')).toBeInTheDocument();
    expect(screen.getByText('Low entry price')).toBeInTheDocument();
  });

  it('loads products for another date picked in the selector', async () => {
    stubFetchRoutes({
      [MANIFEST_URL]: { body: manifestFixtureJson },
      [LATEST_URL]: { body: ANALYSIS_LATEST },
      [OLDER_URL]: { body: ANALYSIS_OLDER },
    });

    renderPage(<ProductsPage />);
    await screen.findByRole('link', { name: 'Publora' });

    await userEvent.selectOptions(screen.getByRole('combobox'), '2026-06-09');

    expect(
      await screen.findByRole('link', { name: 'OlderProduct' }),
    ).toBeInTheDocument();
    expect(screen.queryByText('Publora')).not.toBeInTheDocument();
  });

  it('shows an error state when the analysis fetch fails', async () => {
    stubFetchRoutes({
      [MANIFEST_URL]: { body: manifestFixtureJson },
      [LATEST_URL]: { status: 500, body: 'boom' },
    });

    renderPage(<ProductsPage />);

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Something went wrong.');
  });

  it('shows an error state when the analysis JSON is malformed', async () => {
    stubFetchRoutes({
      [MANIFEST_URL]: { body: manifestFixtureJson },
      [LATEST_URL]: { body: '{not json' },
    });

    renderPage(<ProductsPage />);

    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(/JSON/i),
    );
  });

  it('shows an error state when the manifest fetch fails', async () => {
    stubFetchRoutes({ [MANIFEST_URL]: { status: 500, body: 'down' } });

    renderPage(<ProductsPage />);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Something went wrong.',
    );
  });
});
