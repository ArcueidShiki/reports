import { motion } from 'framer-motion';
import { useMemo } from 'react';

import PageHeader from '../components/PageHeader';
import { EmptyNote, ErrorNote, LoadingNote } from '../components/StatusNotes';
import { useFetchText } from '../hooks/useFetchText';
import { useManifest } from '../hooks/useManifest';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useLanguage } from '../i18n/LanguageContext';
import { contentUrl } from '../lib/contentUrl';
import { riseVariants, staggerVariants } from '../lib/motion';
import { parseWisdomMarkdown, type WisdomQuote } from '../lib/wisdomParse';

const QUOTE_STAGGER_S = 0.07;
const QUOTE_RISE_PX = 22;
const QUOTE_HOVER_LIFT_PX = -4;

interface QuoteCardProps {
  readonly quote: WisdomQuote;
  readonly reducedMotion: boolean;
}

function QuoteCard({ quote, reducedMotion }: QuoteCardProps) {
  return (
    <motion.li
      className="quote-card"
      variants={riseVariants(reducedMotion, { distancePx: QUOTE_RISE_PX })}
      whileHover={reducedMotion ? undefined : { y: QUOTE_HOVER_LIFT_PX }}
    >
      <blockquote className="quote-text">{quote.text}</blockquote>
      {quote.author ? (
        <p className="quote-attribution">
          — {quote.author}
          {quote.source ? (
            <span className="quote-source">{quote.source}</span>
          ) : null}
        </p>
      ) : null}
    </motion.li>
  );
}

export default function WisdomPage() {
  const { t } = useLanguage();
  const { manifest, loading, error } = useManifest();
  const reducedMotion = usePrefersReducedMotion();

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
      <PageHeader
        index={5}
        kicker={t('page.kicker.wisdom')}
        title={t('nav.wisdom')}
      />

      {loading || markdown.loading ? <LoadingNote /> : null}
      {error ? <ErrorNote detail={error} /> : null}
      {markdown.error ? <ErrorNote detail={markdown.error} /> : null}
      {manifest && docs.length === 0 ? <EmptyNote /> : null}

      {categories.map((section) => (
        <section key={section.category} className="wisdom-category">
          <h2>{section.category}</h2>
          <motion.ul
            className="quote-grid"
            variants={staggerVariants(reducedMotion, {
              staggerS: QUOTE_STAGGER_S,
            })}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -48px 0px' }}
          >
            {section.items.map((quote) => (
              <QuoteCard
                key={quote.text}
                quote={quote}
                reducedMotion={reducedMotion}
              />
            ))}
          </motion.ul>
        </section>
      ))}
    </main>
  );
}
