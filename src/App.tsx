import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Nav from './components/Nav';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { ROUTE_PATHS } from './routes';

const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const MarketPage = lazy(() => import('./pages/MarketPage'));
const AlphaPage = lazy(() => import('./pages/AlphaPage'));
const SignalsPage = lazy(() => import('./pages/SignalsPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));

function LoadingFallback() {
  const { t } = useLanguage();

  return <p role="status">{t('common.loading')}</p>;
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Nav />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path={ROUTE_PATHS.home} element={<HomePage />} />
            <Route path={ROUTE_PATHS.products} element={<ProductsPage />} />
            <Route path={ROUTE_PATHS.market} element={<MarketPage />} />
            <Route path={ROUTE_PATHS.alpha} element={<AlphaPage />} />
            <Route path={ROUTE_PATHS.signals} element={<SignalsPage />} />
            <Route path={ROUTE_PATHS.gallery} element={<GalleryPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </LanguageProvider>
  );
}
