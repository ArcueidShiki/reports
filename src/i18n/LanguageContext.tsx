import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  DEFAULT_LANGUAGE,
  isLanguage,
  resolveTranslation,
  translations,
  type Language,
} from './translations';

export const LANGUAGE_STORAGE_KEY = 'reports-lang';

interface LanguageContextValue {
  readonly lang: Language;
  readonly setLang: (next: Language) => void;
  readonly t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLanguage(): Language {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isLanguage(stored) ? stored : DEFAULT_LANGUAGE;
  } catch (error) {
    console.warn('Failed to read stored language, using default:', error);
    return DEFAULT_LANGUAGE;
  }
}

function writeStoredLanguage(lang: Language): void {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch (error) {
    console.warn('Failed to persist language preference:', error);
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(readStoredLanguage);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    writeStoredLanguage(next);
  }, []);

  const t = useCallback(
    (key: string) => resolveTranslation(translations, lang, key),
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const value = useContext(LanguageContext);

  if (!value) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return value;
}
