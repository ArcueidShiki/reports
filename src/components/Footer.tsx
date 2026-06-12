import { useLanguage } from '../i18n/LanguageContext';

const GITHUB_URL = 'https://github.com/ArcueidShiki';
const CONTACT_EMAIL_URL = 'mailto:pjtpengjingtong@gmail.com';
const RESUME_URL = 'https://cv.arcueidshiki.uk/cv2.html';
const COPYRIGHT_LINE = '© 2026 Arcueid — The Nightly Ledger';
const WATERMARK = 'Arcueid';

/**
 * Editorial colophon: italic sign-off, mono link row, and an oversized
 * ghost wordmark bleeding off the bottom edge.
 */
export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-tagline">{t('footer.tagline')}</p>
        <ul className="footer-links">
          <li>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              {t('footer.github')}
            </a>
          </li>
          <li>
            <a href={CONTACT_EMAIL_URL}>{t('footer.email')}</a>
          </li>
          <li>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
              {t('footer.resume')}
            </a>
          </li>
        </ul>
        <p className="footer-meta">{COPYRIGHT_LINE}</p>
      </div>
      <span className="footer-watermark" aria-hidden="true">
        {WATERMARK}
      </span>
    </footer>
  );
}
