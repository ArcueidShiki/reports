import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import Footer from './components/Footer';
import Nav from './components/Nav';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { pageVariants } from './lib/motion';
import { ROUTE_PATHS } from './routes';

const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const MarketPage = lazy(() => import('./pages/MarketPage'));
const AlphaPage = lazy(() => import('./pages/AlphaPage'));
const SignalsPage = lazy(() => import('./pages/SignalsPage'));
const WisdomPage = lazy(() => import('./pages/WisdomPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));

function LoadingFallback() {
  const { t } = useLanguage();

  return (
    <p role="status" className="route-loading page">
      {t('common.loading')}
    </p>
  );
}

/** Jump back to the top whenever the route changes. */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

/** Routes wrapped in a rise-in/slip-out transition; static under reduced motion. */
function AnimatedRoutes() {
  const location = useLocation();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageVariants(reducedMotion)}
        initial="initial"
        animate="enter"
        exit="exit"
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
        <ScrollToTop />
        <Nav />
        <AnimatedRoutes />
        <Footer />
      </BrowserRouter>
    </LanguageProvider>
  );
}
