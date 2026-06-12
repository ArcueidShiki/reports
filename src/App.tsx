import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import Footer from './components/Footer';
import Nav from './components/Nav';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { ROUTE_PATHS } from './routes';

const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const MarketPage = lazy(() => import('./pages/MarketPage'));
const AlphaPage = lazy(() => import('./pages/AlphaPage'));
const SignalsPage = lazy(() => import('./pages/SignalsPage'));
const WisdomPage = lazy(() => import('./pages/WisdomPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));

const PAGE_FADE_DURATION_S = 0.25;

function LoadingFallback() {
  const { t } = useLanguage();

  return <p role="status">{t('common.loading')}</p>;
}

/** Routes wrapped in a cross-route fade; disabled under reduced motion. */
function AnimatedRoutes() {
  const location = useLocation();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: reducedMotion ? 1 : 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: reducedMotion ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : PAGE_FADE_DURATION_S }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Routes location={location}>
            <Route path={ROUTE_PATHS.home} element={<HomePage />} />
            <Route path={ROUTE_PATHS.products} element={<ProductsPage />} />
            <Route path={ROUTE_PATHS.market} element={<MarketPage />} />
            <Route path={ROUTE_PATHS.alpha} element={<AlphaPage />} />
            <Route path={ROUTE_PATHS.signals} element={<SignalsPage />} />
            <Route path={ROUTE_PATHS.wisdom} element={<WisdomPage />} />
            <Route path={ROUTE_PATHS.gallery} element={<GalleryPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Nav />
        <AnimatedRoutes />
        <Footer />
      </BrowserRouter>
    </LanguageProvider>
  );
}
