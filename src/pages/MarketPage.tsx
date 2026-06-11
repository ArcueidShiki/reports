import { useLanguage } from '../i18n/LanguageContext';

export default function MarketPage() {
  const { t } = useLanguage();

  return (
    <main>
      <h1>{t('nav.market')}</h1>
    </main>
  );
}
