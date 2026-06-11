/**
 * Classification and grouping of US-market daily report files.
 * Pure module: no filesystem access.
 */

import { parseDateFromName } from './dates.mjs';
import { detectLang } from './lang.mjs';
import { compareDatesDesc, compareNamesAsc } from './sort.mjs';

const KIND_BY_EXTENSION = Object.freeze({
  '.md': 'md',
  '.html': 'html',
});

const EXTENSION_PATTERN = /\.[^.]+$/;

/**
 * Classifies a single market report file name.
 *
 * @param {string} name - File name, e.g. "2026-06-04-tech-rotation.md".
 * @returns {{date: string, lang: 'zh'|'en', kind: 'md'|'html', title: string} | null}
 *   null for excluded extensions (.srt, .sh, junk files), non-md/html files,
 *   and names without a date prefix.
 */
export function classifyMarketFile(name) {
  if (typeof name !== 'string') {
    throw new TypeError(`classifyMarketFile expects a string, got ${typeof name}`);
  }
  const date = parseDateFromName(name);
  if (date === null) {
    return null;
  }
  const extensionMatch = EXTENSION_PATTERN.exec(name);
  const kind = extensionMatch ? KIND_BY_EXTENSION[extensionMatch[0].toLowerCase()] : undefined;
  if (kind === undefined) {
    return null;
  }
  const stem = name.replace(EXTENSION_PATTERN, '');
  const slug = stem.slice(date.length).replace(/^-/, '');
  return {
    date,
    lang: detectLang(name),
    kind,
    title: slug.replaceAll('-', ' '),
  };
}

/**
 * Groups classifiable market files by date.
 *
 * @param {readonly string[]} fileNames - Flat list of file names.
 * @returns {Array<{date: string, items: Array<{file: string, lang: string, kind: string, title: string}>}>}
 *   Groups sorted descending by date; items sorted by file name.
 */
export function buildMarketSection(fileNames) {
  const classified = fileNames
    .map((file) => ({ file, info: classifyMarketFile(file) }))
    .filter((entry) => entry.info !== null);

  const dates = [...new Set(classified.map((entry) => entry.info.date))];

  return dates.sort(compareDatesDesc).map((date) => ({
    date,
    items: classified
      .filter((entry) => entry.info.date === date)
      .map(({ file, info }) => ({
        file,
        lang: info.lang,
        kind: info.kind,
        title: info.title,
      }))
      .sort((a, b) => compareNamesAsc(a.file, b.file)),
  }));
}
