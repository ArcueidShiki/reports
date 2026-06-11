import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { MANIFEST_URL, resetManifestCache } from '../hooks/useManifest';
import { contentUrl } from '../lib/contentUrl';
import { stubFetchRoutes } from '../test/fetchStub';
import { manifestFixtureJson } from '../test/manifestFixture';
import { renderPage } from '../test/renderPage';
import GalleryPage from './GalleryPage';

describe('GalleryPage', () => {
  beforeEach(() => {
    window.localStorage.clear();
    resetManifestCache();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders a grid item for every gallery image in the manifest', async () => {
    stubFetchRoutes({ [MANIFEST_URL]: { body: manifestFixtureJson } });

    renderPage(<GalleryPage />);

    const first = await screen.findByAltText('yr_hero_concert_00001_.png');
    expect(first).toHaveAttribute(
      'src',
      contentUrl('gallery', 'yr_hero_concert_00001_.png'),
    );
    expect(
      screen.getByAltText('yr_gallery_piano_00001_.png'),
    ).toBeInTheDocument();
  });

  it('opens a lightbox on click and closes it with Escape', async () => {
    stubFetchRoutes({ [MANIFEST_URL]: { body: manifestFixtureJson } });

    renderPage(<GalleryPage />);
    const thumb = await screen.findByAltText('yr_hero_concert_00001_.png');

    await userEvent.click(thumb);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    );
  });

  it('closes the lightbox when clicking outside the image', async () => {
    stubFetchRoutes({ [MANIFEST_URL]: { body: manifestFixtureJson } });

    renderPage(<GalleryPage />);
    await userEvent.click(
      await screen.findByAltText('yr_gallery_piano_00001_.png'),
    );

    await userEvent.click(screen.getByRole('dialog'));

    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    );
  });

  it('shows an error state when the manifest fetch fails', async () => {
    stubFetchRoutes({ [MANIFEST_URL]: { status: 500, body: 'down' } });

    renderPage(<GalleryPage />);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Something went wrong.',
    );
  });
});
