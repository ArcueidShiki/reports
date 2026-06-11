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
  'home.tagline': 'Daily reports on products, markets, and quant signals.',
  'home.sections': 'Sections',
  'home.desc.products': 'Daily product discovery and business-model analysis.',
  'home.desc.market': 'US market daily recaps in English and Chinese.',
  'home.desc.alpha': 'Technical, fundamental, and sentiment factor library.',
  'home.desc.signals': 'Macro event calendar with signal reports and posters.',
  'home.desc.gallery': 'A new set of AI-generated images every day.',
  'common.loading': 'Loading…',
  'common.error': 'Something went wrong.',
  'common.selectDate': 'Select date',
  'common.download': 'Download',
  'common.empty': 'No content available.',
  'market.noTranslation': 'Translated version unavailable — showing original.',
  'signals.reportPdf': 'Report PDF',
  'signals.table': 'Signals',
  'signals.posters': 'Posters',
  'signals.sources': 'Source charts',
  'signals.provenance': 'Provenance',
  'signals.downloads': 'Downloads',
  'signals.csv': 'Signals CSV',
  'signals.calendarJson': 'Calendar JSON',
  'signals.officialJson': 'Official JSON',
  'gallery.close': 'Close',
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
  'home.tagline': '每日产品、市场与量化信号报告。',
  'home.sections': '栏目',
  'home.desc.products': '每日产品发现与商业模式分析。',
  'home.desc.market': '中英双语美股每日复盘。',
  'home.desc.alpha': '技术面、基本面与情绪因子库。',
  'home.desc.signals': '宏观事件日历、信号报告与海报。',
  'home.desc.gallery': '每天一组 AI 生成图片。',
  'common.loading': '加载中…',
  'common.error': '出错了。',
  'common.selectDate': '选择日期',
  'common.download': '下载',
  'common.empty': '暂无内容。',
  'market.noTranslation': '该语言版本暂缺，显示原文。',
  'signals.reportPdf': '报告 PDF',
  'signals.table': '信号一览',
  'signals.posters': '海报',
  'signals.sources': '数据来源图表',
  'signals.provenance': '数据出处',
  'signals.downloads': '下载',
  'signals.csv': '信号 CSV',
  'signals.calendarJson': '日历 JSON',
  'signals.officialJson': '官方 JSON',
  'gallery.close': '关闭',
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
