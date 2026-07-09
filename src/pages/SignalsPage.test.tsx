import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { MANIFEST_URL, resetManifestCache } from '../hooks/useManifest';
import { contentUrl } from '../lib/contentUrl';
import { stubFetchRoutes } from '../test/fetchStub';
import { manifestFixtureJson } from '../test/manifestFixture';
import { renderPage } from '../test/renderPage';
import SignalsPage from './SignalsPage';

const LATEST_MD_URL = contentUrl('signals', '2026-06-11', 'signals_2026-06-11.md');
const OLDER_MD_URL = contentUrl('signals', '2026-06-10', 'signals_2026-06-10.md');
const PROVENANCE_URL = contentUrl(
  'signals',
  '2026-06-10',
  'sources',
  'provenance_2026-06-10.md',
);

const SIGNALS_TABLE = '| Metric | Value |\n| --- | --- |\n| CPI | 4.2% |';

describe('SignalsPage', () => {
  beforeEach(() => {
    window.localStorage.clear();
    resetManifestCache();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders pdf embed, signals table and posters for the latest date', async () => {
    stubFetchRoutes({
      [MANIFEST_URL]: { body: manifestFixtureJson },
      [LATEST_MD_URL]: { body: SIGNALS_TABLE },
    });

    renderPage(<SignalsPage />);

    expect(
      await screen.findByRole('cell', { name: '4.2%' }),
    ).toBeInTheDocument();

    const frame = screen.getByTitle('report_2026-06-11.pdf');
    expect(frame.tagName).toBe('OBJECT');
    expect(frame).toHaveAttribute(
      'data',
      contentUrl('signals', '2026-06-11', 'report_2026-06-11.pdf'),
    );
    expect(frame).toHaveAttribute('type', 'application/pdf');
    expect(frame).not.toHaveAttribute('sandbox');

    expect(screen.getByAltText('poster_2026-06-11_1.png')).toHaveAttribute(
      'src',
      contentUrl('signals', '2026-06-11', 'poster_2026-06-11_1.png'),
    );
    expect(screen.getByAltText('poster_2026-06-11_2.png')).toBeInTheDocument();

    expect(screen.queryByText('Source charts')).not.toBeInTheDocument();
    expect(screen.queryByText('Official JSON')).not.toBeInTheDocument();
  });

  it('renders source charts, provenance and download links when sources exist', async () => {
    stubFetchRoutes({
      [MANIFEST_URL]: { body: manifestFixtureJson },
      [LATEST_MD_URL]: { body: SIGNALS_TABLE },
      [OLDER_MD_URL]: { body: SIGNALS_TABLE },
      [PROVENANCE_URL]: { body: '## Data provenance\n\nFRED series.' },
    });

    renderPage(<SignalsPage />);
    await screen.findByRole('cell', { name: '4.2%' });

    await userEvent.selectOptions(screen.getByRole('combobox'), '2026-06-10');

    const chart = await screen.findByAltText('cpi_fred.png');
    expect(chart).toHaveAttribute(
      'src',
      contentUrl('signals', '2026-06-10', 'sources', 'cpi_fred.png'),
    );
    expect(screen.getByText('vix_cboe.png')).toBeInTheDocument();

    expect(
      await screen.findByRole('heading', { name: 'Data provenance' }),
    ).toBeInTheDocument();

    expect(screen.getByRole('link', { name: 'Signals CSV' })).toHaveAttribute(
      'href',
      contentUrl('signals', '2026-06-10', 'signals_2026-06-10.csv'),
    );
    expect(
      screen.getByRole('link', { name: 'Calendar JSON' }),
    ).toHaveAttribute(
      'href',
      contentUrl('signals', '2026-06-10', 'calendar_2026-06-10.json'),
    );
    expect(
      screen.getByRole('link', { name: 'Official JSON' }),
    ).toHaveAttribute(
      'href',
      contentUrl('signals', '2026-06-10', 'sources', 'official_2026-06-10.json'),
    );
  });

  it('shows an error state when the signals markdown fetch fails', async () => {
    stubFetchRoutes({
      [MANIFEST_URL]: { body: manifestFixtureJson },
      [LATEST_MD_URL]: { status: 500, body: 'boom' },
    });

    renderPage(<SignalsPage />);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Something went wrong.',
    );
  });
});
