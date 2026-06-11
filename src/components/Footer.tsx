import { useLanguage } from '../i18n/LanguageContext';

const GITHUB_URL = 'https://github.com/ArcueidShiki';
const CONTACT_EMAIL_URL = 'mailto:pjtpengjingtong@gmail.com';
const RESUME_URL = 'https://bpcv.arcueidshiki.uk';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
        {t('footer.github')}
      </a>
      <a href={CONTACT_EMAIL_URL}>{t('footer.email')}</a>
      <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
        {t('footer.resume')}
      </a>
    </footer>
  );
}
