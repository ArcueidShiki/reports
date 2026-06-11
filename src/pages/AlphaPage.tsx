import { useState } from 'react';

import MarkdownView from '../components/MarkdownView';
import { EmptyNote, ErrorNote, LoadingNote } from '../components/StatusNotes';
import { useFetchText } from '../hooks/useFetchText';
import { useManifest } from '../hooks/useManifest';
import { useLanguage } from '../i18n/LanguageContext';
import { contentUrl } from '../lib/contentUrl';

export default function AlphaPage() {
  const { t } = useLanguage();
  const { manifest, loading, error } = useManifest();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const docs = manifest?.sections.alpha ?? [];
  const activeDoc =
    docs.find((doc) => doc.id === selectedId) ?? docs[0] ?? null;
  const docUrl = activeDoc ? contentUrl('alpha', activeDoc.file) : null;
  const markdown = useFetchText(docUrl);

  return (
    <main className="page alpha-page">
      <h1>{t('nav.alpha')}</h1>

      {loading ? <LoadingNote /> : null}
      {error ? <ErrorNote detail={error} /> : null}
      {manifest && docs.length === 0 ? <EmptyNote /> : null}

      {docs.length > 0 ? (
        <div className="tab-bar">
          {docs.map((doc) => (
            <button
              key={doc.id}
              type="button"
              className={doc.id === activeDoc?.id ? 'tab tab-active' : 'tab'}
              aria-pressed={doc.id === activeDoc?.id}
              onClick={() => setSelectedId(doc.id)}
            >
              {doc.title}
            </button>
          ))}
        </div>
      ) : null}

      {markdown.loading ? <LoadingNote /> : null}
      {markdown.error ? <ErrorNote detail={markdown.error} /> : null}
      {markdown.text !== null ? <MarkdownView markdown={markdown.text} /> : null}
    </main>
  );
}
