import { NavLink } from 'react-router-dom';

import { useLanguage } from '../i18n/LanguageContext';
import { NAV_ITEMS } from '../routes';

export default function Nav() {
  const { lang, setLang, t } = useLanguage();

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'zh' : 'en');
  };

  return (
    <nav className="site-nav">
      <ul className="site-nav-links">
        {NAV_ITEMS.map(({ path, labelKey }) => (
          <li key={path}>
            <NavLink to={path} end={path === '/'}>
              {t(labelKey)}
            </NavLink>
          </li>
        ))}
      </ul>
      <button type="button" className="lang-toggle" onClick={toggleLanguage}>
        {t('nav.toggleLanguage')}
      </button>
    </nav>
  );
}
