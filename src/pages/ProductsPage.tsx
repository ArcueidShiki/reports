import { useMemo, useState } from 'react';

import DateSelector from '../components/DateSelector';
import { EmptyNote, ErrorNote, LoadingNote } from '../components/StatusNotes';
import { useFetchText } from '../hooks/useFetchText';
import { useManifest } from '../hooks/useManifest';
import { useLanguage } from '../i18n/LanguageContext';
import { contentUrl } from '../lib/contentUrl';
import { parseProductsAnalysis, type Product } from '../lib/products';

function ProductCard({ product }: { readonly product: Product }) {
  return (
    <article className="product-card">
      <header className="product-card-header">
        <h2>
          {product.url ? (
            <a href={product.url} target="_blank" rel="noopener noreferrer">
              {product.name}
            </a>
          ) : (
            product.name
          )}
        </h2>
        {product.ph ? <span className="ph-badge">{product.ph}</span> : null}
      </header>
      {product.category ? (
        <p className="product-category">{product.category}</p>
      ) : null}
      {product.businessModel ? (
        <p className="product-business-model">{product.businessModel}</p>
      ) : null}
      {product.successFactors.length > 0 ? (
        <ul className="product-success-factors">
          {product.successFactors.map((factor) => (
            <li key={factor}>{factor}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

export default function ProductsPage() {
  const { t } = useLanguage();
  const { manifest, loading, error } = useManifest();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const entries = manifest?.sections.products ?? [];
  const activeDate = selectedDate ?? entries[0]?.date ?? null;
  const activeEntry =
    entries.find((entry) => entry.date === activeDate) ?? null;
  // analysisJson is null for an in-progress date dir (raw data only).
  const analysisUrl = activeEntry?.analysisJson
    ? contentUrl('products', activeEntry.date, activeEntry.analysisJson)
    : null;

  const analysis = useFetchText(analysisUrl);
  const parsed = useMemo(
    () =>
      analysis.text === null ? null : parseProductsAnalysis(analysis.text),
    [analysis.text],
  );

  return (
    <main className="page products-page">
      <h1>{t('nav.products')}</h1>

      {loading ? <LoadingNote /> : null}
      {error ? <ErrorNote detail={error} /> : null}
      {manifest && entries.length === 0 ? <EmptyNote /> : null}
      {activeEntry && activeEntry.analysisJson === null ? <EmptyNote /> : null}

      {activeDate ? (
        <DateSelector
          dates={entries.map((entry) => entry.date)}
          value={activeDate}
          onChange={setSelectedDate}
        />
      ) : null}

      {analysis.loading ? <LoadingNote /> : null}
      {analysis.error ? <ErrorNote detail={analysis.error} /> : null}
      {parsed && !parsed.ok ? <ErrorNote detail={parsed.error} /> : null}

      {parsed?.ok ? (
        <section className="product-grid">
          {parsed.value.products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </section>
      ) : null}
    </main>
  );
}
