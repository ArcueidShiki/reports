import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

import ContentFrame from '../components/ContentFrame';
import DateSelector from '../components/DateSelector';
import MarkdownView from '../components/MarkdownView';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { EmptyNote, ErrorNote, LoadingNote } from '../components/StatusNotes';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { riseVariants, staggerVariants } from '../lib/motion';
import { useFetchText } from '../hooks/useFetchText';
import { useManifest } from '../hooks/useManifest';
import { useLanguage } from '../i18n/LanguageContext';
import { contentUrl } from '../lib/contentUrl';
import { parseProductsAnalysis, type Product } from '../lib/products';

interface ProductCardProps {
  readonly product: Product;
  readonly reducedMotion: boolean;
}

function ProductCard({ product, reducedMotion }: ProductCardProps) {
  return (
    <motion.article
      className="product-card"
      variants={riseVariants(reducedMotion, { distancePx: 20 })}
    >
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
    </motion.article>
  );
}

export default function ProductsPage() {
  const { t } = useLanguage();
  const { manifest, loading, error } = useManifest();
  const reducedMotion = usePrefersReducedMotion();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const entries = manifest?.sections.products ?? [];
  const activeDate = selectedDate ?? entries[0]?.date ?? null;
  const activeEntry =
    entries.find((entry) => entry.date === activeDate) ?? null;
  // analysisJson is null for an in-progress date dir (raw data only).
  const analysisUrl = activeEntry?.analysisJson
    ? contentUrl('products', activeEntry.date, activeEntry.analysisJson)
    : null;
  const reportMdUrl = activeEntry?.reportMd
    ? contentUrl('products', activeEntry.date, activeEntry.reportMd)
    : null;
  const reportHtmlUrl = activeEntry?.reportHtml
    ? contentUrl('products', activeEntry.date, activeEntry.reportHtml)
    : null;
  const hasContent =
    analysisUrl !== null || reportMdUrl !== null || reportHtmlUrl !== null;

  const analysis = useFetchText(analysisUrl);
  const reportMd = useFetchText(reportMdUrl);
  const parsed = useMemo(
    () =>
      analysis.text === null ? null : parseProductsAnalysis(analysis.text),
    [analysis.text],
  );

  return (
    <main className="page products-page">
      <PageHeader
        index={1}
        kicker={t('page.kicker.products')}
        title={t('nav.products')}
      />

      {loading ? <LoadingNote /> : null}
      {error ? <ErrorNote detail={error} /> : null}
      {manifest && entries.length === 0 ? <EmptyNote /> : null}
      {activeEntry && !hasContent ? <EmptyNote /> : null}

      {activeDate ? (
        <DateSelector
          dates={entries.map((entry) => entry.date)}
          value={activeDate}
          onChange={setSelectedDate}
        />
      ) : null}

      {reportMdUrl !== null ? (
        <section className="products-report content-section">
          <h2>{t('products.trendReport')}</h2>
          {reportMd.loading ? <LoadingNote /> : null}
          {reportMd.error ? <ErrorNote detail={reportMd.error} /> : null}
          {reportMd.text !== null && activeEntry ? (
            <Reveal>
              <MarkdownView
                markdown={reportMd.text}
                baseUrl={contentUrl('products', activeEntry.date)}
              />
            </Reveal>
          ) : null}
        </section>
      ) : null}

      {reportHtmlUrl !== null ? (
        <section className="products-report-card content-section">
          <h2>{t('products.reportCard')}</h2>
          <ContentFrame src={reportHtmlUrl} title={t('products.reportCard')} />
        </section>
      ) : null}

      {analysis.loading ? <LoadingNote /> : null}
      {analysis.error ? <ErrorNote detail={analysis.error} /> : null}
      {parsed && !parsed.ok ? <ErrorNote detail={parsed.error} /> : null}

      {parsed?.ok ? (
        <section className="products-analysis content-section">
          <h2>{t('products.analysisCards')}</h2>
          <motion.div
            className="product-grid"
            variants={staggerVariants(reducedMotion)}
            initial="hidden"
            animate="visible"
          >
            {parsed.value.products.map((product) => (
              <ProductCard
                key={product.name}
                product={product}
                reducedMotion={reducedMotion}
              />
            ))}
          </motion.div>
        </section>
      ) : null}
    </main>
  );
}
