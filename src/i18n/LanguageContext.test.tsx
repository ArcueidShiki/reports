import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LanguageProvider, useLanguage } from './LanguageContext';
import { resolveTranslation } from './translations';

const STORAGE_KEY = 'reports-lang';

function LanguageProbe() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="home-label">{t('nav.home')}</span>
      <span data-testid="missing-key">{t('does.not.exist')}</span>
      <button onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}>
        toggle
      </button>
    </div>
  );
}

function renderProbe() {
  return render(
    <LanguageProvider>
      <LanguageProbe />
    </LanguageProvider>,
  );
}

describe('LanguageContext', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('defaults to English', () => {
    renderProbe();

    expect(screen.getByTestId('lang')).toHaveTextContent('en');
    expect(screen.getByTestId('home-label')).toHaveTextContent('Home');
  });

  it('updates translated strings when the language is toggled', async () => {
    const user = userEvent.setup();
    renderProbe();

    await user.click(screen.getByRole('button', { name: 'toggle' }));

    expect(screen.getByTestId('lang')).toHaveTextContent('zh');
    expect(screen.getByTestId('home-label')).toHaveTextContent('首页');
  });

  it('persists the selected language to localStorage', async () => {
    const user = userEvent.setup();
    renderProbe();

    await user.click(screen.getByRole('button', { name: 'toggle' }));

    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('zh');
  });

  it('reads a previously persisted language on mount', () => {
    window.localStorage.setItem(STORAGE_KEY, 'zh');

    renderProbe();

    expect(screen.getByTestId('lang')).toHaveTextContent('zh');
    expect(screen.getByTestId('home-label')).toHaveTextContent('首页');
  });

  it('falls back to English when the stored value is invalid', () => {
    window.localStorage.setItem(STORAGE_KEY, 'fr');

    renderProbe();

    expect(screen.getByTestId('lang')).toHaveTextContent('en');
  });

  it('returns the key itself when a translation is missing', () => {
    renderProbe();

    expect(screen.getByTestId('missing-key')).toHaveTextContent(
      'does.not.exist',
    );
  });

  it('throws a clear error when useLanguage is used outside the provider', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    try {
      expect(() => render(<LanguageProbe />)).toThrow(
        'useLanguage must be used within a LanguageProvider',
      );
    } finally {
      consoleError.mockRestore();
    }
  });
});

describe('resolveTranslation', () => {
  const dictionaries = {
    en: { greeting: 'Hello', enOnly: 'English only' },
    zh: { greeting: '你好' },
  };

  it('returns the value for the requested language', () => {
    expect(resolveTranslation(dictionaries, 'zh', 'greeting')).toBe('你好');
  });

  it('falls back to the English value when the zh entry is missing', () => {
    expect(resolveTranslation(dictionaries, 'zh', 'enOnly')).toBe(
      'English only',
    );
  });

  it('falls back to the key when no language has the entry', () => {
    expect(resolveTranslation(dictionaries, 'en', 'unknown.key')).toBe(
      'unknown.key',
    );
  });
});
