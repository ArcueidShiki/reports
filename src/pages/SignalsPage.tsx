import { useState } from 'react';

import ContentFrame from '../components/ContentFrame';
import DateSelector from '../components/DateSelector';
import MarkdownView from '../components/MarkdownView';
import { EmptyNote, ErrorNote, LoadingNote } from '../components/StatusNotes';
import { useFetchText } from '../hooks/useFetchText';
import { useManifest } from '../hooks/useManifest';
import { useLanguage } from '../i18n/LanguageContext';
import { contentUrl } from '../lib/contentUrl';
import type { SignalsEntry } from '../lib/manifest';

function SourcesSection({ entry }: { readonly entry: SignalsEntry }) {
  const { t } = useLanguage();
  const sources = entry.sources;
  const provenanceUrl = sources?.provenanceMd
    ? contentUrl('signals', entry.date, 'sources', sources.provenanceMd)
    : null;
  const provenance = useFetchText(provenanceUrl);

  if (!sources) return null;

  return (
    <section className="signals-sources">
      <h2>{t('signals.sources')}</h2>
      <div className="source-grid">
        {sources.images.map((image) => (
          <figure key={image} className="source-figure">
            <img
              src={contentUrl('signals', entry.date, 'sources', image)}
              alt={image}
              loading="lazy"
            />
            <figcaption>{image}</figcaption>
          </figure>
        ))}
      </div>

      {provenanceUrl ? (
        <>
          <h2>{t('signals.provenance')}</h2>
          {provenance.loading ? <LoadingNote /> : null}
          {provenance.error ? <ErrorNote detail={provenance.error} /> : null}
          {provenance.text !== null ? (
            <MarkdownView markdown={provenance.text} />
          ) : null}
        </>
      ) : null}
    </section>
  );
}

function DownloadsSection({ entry }: { readonly entry: SignalsEntry }) {
  const { t } = useLanguage();
  const officialJson = entry.sources?.officialJson ?? null;

  return (
    <section className="signals-downloads">
      <h2>{t('signals.downloads')}</h2>
      <ul className="download-links">
        <li>
          <a href={contentUrl('signals', entry.date, entry.csv)} download>
            {t('signals.csv')}
          </a>
        </li>
        <li>
          <a
            href={contentUrl('signals', entry.date, entry.calendarJson)}
            download
          >
            {t('signals.calendarJson')}
          </a>
        </li>
        {officialJson ? (
          <li>
            <a
              href={contentUrl('signals', entry.date, 'sources', officialJson)}
              download
            >
              {t('signals.officialJson')}
            </a>
          </li>
        ) : null}
      </ul>
    </section>
  );
}

export default function SignalsPage() {
  const { t } = useLanguage();
  const { manifest, loading, error } = useManifest();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const entries = manifest?.sections.signals ?? [];
  const activeDate = selectedDate ?? entries[0]?.date ?? null;
  const entry = entries.find((item) => item.date === activeDate) ?? null;

  const signalsMdUrl = entry
    ? contentUrl('signals', entry.date, entry.signalsMd)
    : null;
  const signalsMd = useFetchText(signalsMdUrl);

  return (
    <main className="page signals-page">
      <h1>{t('nav.signals')}</h1>

      {loading ? <LoadingNote /> : null}
      {error ? <ErrorNote detail={error} /> : null}
      {manifest && entries.length === 0 ? <EmptyNote /> : null}

      {activeDate ? (
        <DateSelector
          dates={entries.map((item) => item.date)}
          value={activeDate}
          onChange={setSelectedDate}
        />
      ) : null}

      {entry ? (
        <>
          <section className="signals-report">
            <h2>{t('signals.reportPdf')}</h2>
            <ContentFrame
              src={contentUrl('signals', entry.date, entry.pdf)}
              title={entry.pdf}
            />
          </section>

          <section className="signals-table">
            <h2>{t('signals.table')}</h2>
            {signalsMd.loading ? <LoadingNote /> : null}
            {signalsMd.error ? <ErrorNote detail={signalsMd.error} /> : null}
            {signalsMd.text !== null ? (
              <MarkdownView markdown={signalsMd.text} />
            ) : null}
          </section>

          {entry.posters.length > 0 ? (
            <section className="signals-posters">
              <h2>{t('signals.posters')}</h2>
              <div className="poster-row">
                {entry.posters.map((poster) => (
                  <img
                    key={poster}
                    src={contentUrl('signals', entry.date, poster)}
                    alt={poster}
                    loading="lazy"
                  />
                ))}
              </div>
            </section>
          ) : null}

          <SourcesSection entry={entry} />
          <DownloadsSection entry={entry} />
        </>
      ) : null}
    </main>
  );
}
