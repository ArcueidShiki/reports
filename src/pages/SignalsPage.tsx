import { useLanguage } from '../i18n/LanguageContext';

export default function SignalsPage() {
  const { t } = useLanguage();

  return (
    <main>
      <h1>{t('nav.signals')}</h1>
    </main>
  );
}
