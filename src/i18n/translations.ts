export const LANGUAGES = ['en', 'zh'] as const;

export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = 'en';

export type TranslationDictionary = Readonly<Record<string, string>>;

export type TranslationDictionaries = Readonly<
  Record<Language, TranslationDictionary>
>;

const en: TranslationDictionary = {
  'nav.home': 'Home',
  'nav.products': 'Product Analytics',
  'nav.market': 'US Market Daily',
  'nav.alpha': 'Alpha Factors',
  'nav.signals': 'Signal Calendar',
  'nav.gallery': 'Gallery',
  'nav.toggleLanguage': '中文',
  'footer.github': 'GitHub',
  'footer.email': 'Email',
  'footer.resume': 'Resume',
  'common.loading': 'Loading…',
  'common.error': 'Something went wrong.',
  'common.selectDate': 'Select date',
  'common.download': 'Download',
};

const zh: TranslationDictionary = {
  'nav.home': '首页',
  'nav.products': '产品分析',
  'nav.market': '美股日报',
  'nav.alpha': 'Alpha因子',
  'nav.signals': '信号日历',
  'nav.gallery': '每日图集',
  'nav.toggleLanguage': 'EN',
  'footer.github': 'GitHub',
  'footer.email': '邮箱',
  'footer.resume': '简历',
  'common.loading': '加载中…',
  'common.error': '出错了。',
  'common.selectDate': '选择日期',
  'common.download': '下载',
};

export const translations: TranslationDictionaries = { en, zh };

export function isLanguage(value: unknown): value is Language {
  return LANGUAGES.includes(value as Language);
}

/**
 * Resolves a translation key against the given dictionaries.
 * Falls back to the English value when the requested language has no
 * entry, and to the key itself when no language has an entry.
 */
export function resolveTranslation(
  dictionaries: Partial<TranslationDictionaries>,
  lang: Language,
  key: string,
): string {
  return dictionaries[lang]?.[key] ?? dictionaries.en?.[key] ?? key;
}
