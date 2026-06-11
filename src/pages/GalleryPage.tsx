import { useLanguage } from '../i18n/LanguageContext';

export default function GalleryPage() {
  const { t } = useLanguage();

  return (
    <main>
      <h1>{t('nav.gallery')}</h1>
    </main>
  );
}
