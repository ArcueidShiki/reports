import { motion } from 'framer-motion';

import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useLanguage } from '../i18n/LanguageContext';
import { LANGUAGES, type Language } from '../i18n/translations';

const OPTION_LABELS: Readonly<Record<Language, string>> = {
  en: 'EN',
  zh: '中文',
};

const PILL_SPRING = { type: 'spring', stiffness: 500, damping: 38 } as const;

/**
 * Segmented EN ⇄ 中文 switch with a sliding pill behind the active option.
 * The pill glides between options via a framer-motion layout animation;
 * under reduced motion it snaps instantly.
 */
export default function LangToggle() {
  const { lang, setLang, t } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="lang-toggle" role="group" aria-label={t('nav.language')}>
      {LANGUAGES.map((option) => (
        <button
          key={option}
          type="button"
          className={
            option === lang ? 'lang-option lang-option-active' : 'lang-option'
          }
          aria-pressed={option === lang}
          onClick={() => setLang(option)}
        >
          {option === lang ? (
            <motion.span
              className="lang-pill"
              layoutId="lang-pill"
              aria-hidden="true"
              transition={reducedMotion ? { duration: 0 } : PILL_SPRING}
            />
          ) : null}
          <span className="lang-option-label">{OPTION_LABELS[option]}</span>
        </button>
      ))}
    </div>
  );
}
