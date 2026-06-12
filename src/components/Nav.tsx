import { motion } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';

import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useLanguage } from '../i18n/LanguageContext';
import { NAV_ITEMS, ROUTE_PATHS } from '../routes';
import LangToggle from './LangToggle';

const BRAND_NAME = 'Arcueid';
const BRAND_SUB = 'Daily Reports';
const INK_SPRING = { type: 'spring', stiffness: 420, damping: 36 } as const;

/**
 * Sticky masthead: brand block, mono section links with a gliding
 * gold underline (framer layoutId), and the language toggle.
 */
export default function Nav() {
  const { t } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Primary">
        <Link to={ROUTE_PATHS.home} className="brand">
          <span className="brand-mark" aria-hidden="true">
            Ar
          </span>
          <span className="brand-text">
            <span className="brand-name">{BRAND_NAME}</span>
            <span className="brand-sub">{BRAND_SUB}</span>
          </span>
        </Link>

        <ul className="site-nav-links">
          {NAV_ITEMS.map(({ path, labelKey }) => (
            <li key={path}>
              <NavLink to={path} end={path === '/'} className="nav-link">
                {({ isActive }) => (
                  <>
                    {t(labelKey)}
                    {isActive ? (
                      <motion.span
                        className="nav-ink"
                        layoutId="nav-ink"
                        aria-hidden="true"
                        transition={
                          reducedMotion ? { duration: 0 } : INK_SPRING
                        }
                      />
                    ) : null}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <LangToggle />
      </nav>
    </header>
  );
}
