import { motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';

import IntroPlayer from '../components/IntroPlayer';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useLanguage } from '../i18n/LanguageContext';
import { formatSectionIndex } from '../components/PageHeader';
import { riseVariants, staggerVariants } from '../lib/motion';
import { ROUTE_PATHS, type RoutePath } from '../routes';

const StarfieldHero = lazy(() => import('../components/StarfieldHero'));

const SITE_TITLE = 'Arcueid Daily Reports';
const CARD_STAGGER_S = 0.09;
const CARD_RISE_PX = 26;
const CARD_HOVER_LIFT_PX = -5;
const SCROLL_CUE = '↓';

interface HomeSection {
  readonly path: RoutePath;
  readonly titleKey: string;
  readonly descKey: string;
}

const HOME_SECTIONS: readonly HomeSection[] = [
  {
    path: ROUTE_PATHS.products,
    titleKey: 'nav.products',
    descKey: 'home.desc.products',
  },
  {
    path: ROUTE_PATHS.market,
    titleKey: 'nav.market',
    descKey: 'home.desc.market',
  },
  {
    path: ROUTE_PATHS.alpha,
    titleKey: 'nav.alpha',
    descKey: 'home.desc.alpha',
  },
  {
    path: ROUTE_PATHS.signals,
    titleKey: 'nav.signals',
    descKey: 'home.desc.signals',
  },
  {
    path: ROUTE_PATHS.wisdom,
    titleKey: 'nav.wisdom',
    descKey: 'home.desc.wisdom',
  },
  {
    path: ROUTE_PATHS.gallery,
    titleKey: 'nav.gallery',
    descKey: 'home.desc.gallery',
  },
];

export default function HomePage() {
  const { t } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <main className="page home-page">
      <section className="home-hero">
        <div className="hero-mesh" aria-hidden="true" />
        <Suspense fallback={null}>
          <StarfieldHero />
        </Suspense>
        <div className="hero-vignette" aria-hidden="true" />

        <motion.div
          className="home-hero-foreground"
          variants={staggerVariants(reducedMotion, { staggerS: 0.14 })}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="hero-kicker"
            variants={riseVariants(reducedMotion, { distancePx: 12 })}
          >
            {t('home.kicker')}
          </motion.p>
          <h1 className="visually-hidden">{SITE_TITLE}</h1>
          <IntroPlayer />
          <motion.p
            className="home-tagline"
            variants={riseVariants(reducedMotion, { distancePx: 14 })}
          >
            {t('home.tagline')}
          </motion.p>
        </motion.div>

        {reducedMotion ? null : (
          <span className="hero-scroll-cue" aria-hidden="true">
            {SCROLL_CUE}
          </span>
        )}
      </section>

      <div className="home-index-head">
        <h2 className="home-index-title">{t('home.sections')}</h2>
      </div>

      <motion.ul
        className="home-grid"
        variants={staggerVariants(reducedMotion, {
          staggerS: CARD_STAGGER_S,
          delayChildrenS: 0.15,
        })}
        initial="hidden"
        animate="visible"
      >
        {HOME_SECTIONS.map((section, position) => (
          <motion.li
            key={section.path}
            variants={riseVariants(reducedMotion, {
              distancePx: CARD_RISE_PX,
            })}
            whileHover={reducedMotion ? undefined : { y: CARD_HOVER_LIFT_PX }}
          >
            <Link to={section.path} className="home-card">
              <span className="home-card-num">
                {formatSectionIndex(position + 1)}
              </span>
              <span className="home-card-title">{t(section.titleKey)}</span>
              <span className="home-card-desc">{t(section.descKey)}</span>
              <span className="home-card-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </main>
  );
}
