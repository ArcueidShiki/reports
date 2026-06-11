/**
 * Language detection for bilingual (EN/中文) content file names.
 * Pure module: no filesystem access.
 */

const CJK_PATTERN = /\p{Script=Han}/u;

/**
 * Detects the language of a file name.
 *
 * @param {string} name - File name to inspect.
 * @returns {'zh' | 'en'} 'zh' when the name contains CJK (Han) characters,
 *   otherwise 'en'.
 */
export function detectLang(name) {
  if (typeof name !== 'string') {
    throw new TypeError(`detectLang expects a string, got ${typeof name}`);
  }
  return CJK_PATTERN.test(name) ? 'zh' : 'en';
}
