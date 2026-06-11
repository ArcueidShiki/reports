import { useLanguage } from '../i18n/LanguageContext';

export default function AlphaPage() {
  const { t } = useLanguage();

  return (
    <main>
      <h1>{t('nav.alpha')}</h1>
    </main>
  );
}
