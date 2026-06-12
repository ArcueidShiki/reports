import { motion, type Variants } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';

import IntroPlayer from '../components/IntroPlayer';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useLanguage } from '../i18n/LanguageContext';
import { ROUTE_PATHS, type RoutePath } from '../routes';

const StarfieldHero = lazy(() => import('../components/StarfieldHero'));

const SITE_TITLE = 'Arcueid Daily Reports';
const CARD_STAGGER_S = 0.08;
const CARD_SLIDE_PX = 24;
const CARD_DURATION_S = 0.45;

interface HomeSection {
  readonly path: RoutePath;
  readonly icon: string;
  readonly titleKey: string;
  readonly descKey: string;
}

const HOME_SECTIONS: readonly HomeSection[] = [
  {
    path: ROUTE_PATHS.products,
    icon: '📊',
    titleKey: 'nav.products',
    descKey: 'home.desc.products',
  },
  {
    path: ROUTE_PATHS.market,
    icon: '📈',
    titleKey: 'nav.market',
    descKey: 'home.desc.market',
  },
  {
    path: ROUTE_PATHS.alpha,
    icon: '🧮',
    titleKey: 'nav.alpha',
    descKey: 'home.desc.alpha',
  },
  {
    path: ROUTE_PATHS.signals,
    icon: '📅',
    titleKey: 'nav.signals',
    descKey: 'home.desc.signals',
  },
  {
    path: ROUTE_PATHS.wisdom,
    icon: '📜',
    titleKey: 'nav.wisdom',
    descKey: 'home.desc.wisdom',
  },
  {
    path: ROUTE_PATHS.gallery,
    icon: '🖼️',
    titleKey: 'nav.gallery',
    descKey: 'home.desc.gallery',
  },
];

function buildGridVariants(reducedMotion: boolean): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: reducedMotion ? 0 : CARD_STAGGER_S },
    },
  };
}

function buildCardVariants(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } };
  }

  return {
    hidden: { opacity: 0, y: CARD_SLIDE_PX },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: CARD_DURATION_S, ease: 'easeOut' },
    },
  };
}

export default function HomePage() {
  const { t } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <main className="page home-page">
      <section className="home-hero">
        <Suspense fallback={null}>
          <StarfieldHero />
        </Suspense>
        <div className="home-hero-foreground">
          <h1 className="visually-hidden">{SITE_TITLE}</h1>
          <IntroPlayer />
          <p className="home-tagline">{t('home.tagline')}</p>
        </div>
      </section>

      <h2 className="visually-hidden">{t('home.sections')}</h2>
      <motion.ul
        className="home-grid"
        variants={buildGridVariants(reducedMotion)}
        initial="hidden"
        animate="visible"
      >
        {HOME_SECTIONS.map((section) => (
          <motion.li
            key={section.path}
            variants={buildCardVariants(reducedMotion)}
          >
            <Link to={section.path} className="home-card">
              <span className="home-card-icon" aria-hidden="true">
                {section.icon}
              </span>
              <span className="home-card-title">{t(section.titleKey)}</span>
              <span className="home-card-desc">{t(section.descKey)}</span>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </main>
  );
}
