import { useMemo } from 'react';

import { EmptyNote, ErrorNote, LoadingNote } from '../components/StatusNotes';
import { useFetchText } from '../hooks/useFetchText';
import { useManifest } from '../hooks/useManifest';
import { useLanguage } from '../i18n/LanguageContext';
import { contentUrl } from '../lib/contentUrl';
import { parseWisdomMarkdown, type WisdomQuote } from '../lib/wisdomParse';

function QuoteCard({ quote }: { readonly quote: WisdomQuote }) {
  return (
    <li className="quote-card">
      <blockquote className="quote-text">{quote.text}</blockquote>
      {quote.author ? (
        <p className="quote-attribution">
          — {quote.author}
          {quote.source ? (
            <span className="quote-source"> · {quote.source}</span>
          ) : null}
        </p>
      ) : null}
    </li>
  );
}

export default function WisdomPage() {
  const { t } = useLanguage();
  const { manifest, loading, error } = useManifest();

  const docs = manifest?.sections.wisdom ?? [];
  const activeDoc = docs[0] ?? null;
  const docUrl = activeDoc ? contentUrl('wisdom', activeDoc.file) : null;
  const markdown = useFetchText(docUrl);

  const categories = useMemo(
    () => (markdown.text !== null ? parseWisdomMarkdown(markdown.text) : []),
    [markdown.text],
  );

  return (
    <main className="page wisdom-page">
      <h1>{t('nav.wisdom')}</h1>

      {loading || markdown.loading ? <LoadingNote /> : null}
      {error ? <ErrorNote detail={error} /> : null}
      {markdown.error ? <ErrorNote detail={markdown.error} /> : null}
      {manifest && docs.length === 0 ? <EmptyNote /> : null}

      {categories.map((section) => (
        <section key={section.category} className="wisdom-category">
          <h2>{section.category}</h2>
          <ul className="quote-grid">
            {section.items.map((quote) => (
              <QuoteCard key={quote.text} quote={quote} />
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
