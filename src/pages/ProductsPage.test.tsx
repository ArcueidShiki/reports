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
const REPORT_MD = '2026-07-01-product-trends.md';
const REPORT_HTML = '2026-07-01-product-trends.html';
const REPORT_MD_URL = contentUrl('products', '2026-07-01', REPORT_MD);
const REPORT_HTML_URL = contentUrl('products', '2026-07-01', REPORT_HTML);

interface ProductsFixture {
  readonly sections: { readonly products: readonly unknown[] } & Record<string, unknown>;
}

/** Returns the shared fixture with extra products entries prepended. */
function fixtureWithProducts(extraEntries: readonly unknown[]): string {
  const fixture = JSON.parse(manifestFixtureJson) as ProductsFixture;
  return JSON.stringify({
    ...fixture,
    sections: {
      ...fixture.sections,
      products: [...extraEntries, ...fixture.sections.products],
    },
  });
}

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

  it('shows the empty state for a date whose analysis JSON is missing', async () => {
    // Real manifests can contain an in-progress date dir with raw data only
    // (analysisJson: null); the page must not crash building a content URL.
    const fixture = JSON.parse(manifestFixtureJson) as {
      sections: { products: unknown[] } & Record<string, unknown>;
    };
    const withPendingDate = {
      ...fixture,
      sections: {
        ...fixture.sections,
        products: [
          { date: '2026-06-12', analysisJson: null, otherFiles: ['raw-data.json'] },
          ...fixture.sections.products,
        ],
      },
    };
    stubFetchRoutes({
      [MANIFEST_URL]: { body: JSON.stringify(withPendingDate) },
      [LATEST_URL]: { body: ANALYSIS_LATEST },
    });

    renderPage(<ProductsPage />);

    expect(await screen.findByText('No content available.')).toBeInTheDocument();

    await userEvent.selectOptions(screen.getByRole('combobox'), '2026-06-11');

    expect(await screen.findByRole('link', { name: 'Publora' })).toBeInTheDocument();
  });

  it('renders the trend report md and html card for a report-only date', async () => {
    stubFetchRoutes({
      [MANIFEST_URL]: {
        body: fixtureWithProducts([
          {
            date: '2026-07-01',
            analysisJson: null,
            otherFiles: [],
            reportMd: REPORT_MD,
            reportHtml: REPORT_HTML,
          },
        ]),
      },
      [REPORT_MD_URL]: {
        body: '# July trends\n\nAI tools dominate.\n\n![chart](assets/2026-07-01/chart.png)',
      },
    });

    renderPage(<ProductsPage />);

    expect(
      await screen.findByRole('heading', { name: 'July trends' }),
    ).toBeInTheDocument();
    expect(screen.getByText('AI tools dominate.')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'chart' })).toHaveAttribute(
      'src',
      '/content/products/2026-07-01/assets/2026-07-01/chart.png',
    );
    expect(
      screen.getByRole('heading', { name: 'Trend Report' }),
    ).toBeInTheDocument();
    expect(screen.getByTitle('Report Card')).toHaveAttribute(
      'src',
      REPORT_HTML_URL,
    );
    expect(screen.queryByText('No content available.')).not.toBeInTheDocument();
  });

  it('renders both the trend report and analysis cards when both exist', async () => {
    stubFetchRoutes({
      [MANIFEST_URL]: {
        body: fixtureWithProducts([
          {
            date: '2026-07-01',
            analysisJson: 'products-analysis.json',
            otherFiles: [],
            reportMd: REPORT_MD,
          },
        ]),
      },
      [REPORT_MD_URL]: { body: '# July trends' },
      [contentUrl('products', '2026-07-01', 'products-analysis.json')]: {
        body: ANALYSIS_LATEST,
      },
    });

    renderPage(<ProductsPage />);

    expect(
      await screen.findByRole('heading', { name: 'July trends' }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('link', { name: 'Publora' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Trend Report' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Analysis Cards' }),
    ).toBeInTheDocument();
  });

  it('shows an error state when the manifest fetch fails', async () => {
    stubFetchRoutes({ [MANIFEST_URL]: { status: 500, body: 'down' } });

    renderPage(<ProductsPage />);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Something went wrong.',
    );
  });
});
