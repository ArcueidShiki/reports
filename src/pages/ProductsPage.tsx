import { useLanguage } from '../i18n/LanguageContext';

export default function ProductsPage() {
  const { t } = useLanguage();

  return (
    <main>
      <h1>{t('nav.products')}</h1>
    </main>
  );
}
