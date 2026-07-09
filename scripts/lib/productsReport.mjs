/**
 * Classification and merging of product trend report files
 * (flat "YYYY-MM-DD-product-trends.{md,html}" files) into the
 * raw-data products section.
 * Pure module: no filesystem access.
 */

import { parseDateFromName } from './dates.mjs';
import { compareDatesDesc, compareNamesAsc } from './sort.mjs';

const KIND_BY_EXTENSION = Object.freeze({
  '.md': 'md',
  '.html': 'html',
});

const EXTENSION_PATTERN = /\.[^.]+$/;

const ASSET_EXTENSIONS = Object.freeze(
  new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']),
);

/**
 * @param {string} name - File name inside a report assets/<date>/ dir.
 * @returns {boolean} true only for web image files; build scripts (.py)
 *   and junk never qualify.
 */
export function isReportAssetFile(name) {
  if (typeof name !== 'string') {
    throw new TypeError(`isReportAssetFile expects a string, got ${typeof name}`);
  }
  const extensionMatch = EXTENSION_PATTERN.exec(name);
  return extensionMatch !== null && ASSET_EXTENSIONS.has(extensionMatch[0].toLowerCase());
}

/**
 * Classifies a single product report file name.
 *
 * @param {string} name - File name, e.g. "2026-07-01-product-trends.md".
 * @returns {{date: string, kind: 'md'|'html'} | null} null for build
 *   scripts (.py), junk files, non-md/html files, and names without a
 *   date prefix.
 */
export function classifyProductReportFile(name) {
  if (typeof name !== 'string') {
    throw new TypeError(`classifyProductReportFile expects a string, got ${typeof name}`);
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
  return { date, kind };
}

/**
 * Merges classified report files into the raw products section.
 *
 * Entries keep the existing {date, analysisJson, otherFiles} shape and
 * gain optional reportMd / reportHtml file names. Dates that only exist
 * in the report source get a new entry with analysisJson null.
 *
 * @param {ReadonlyArray<{date: string, analysisJson: string | null, otherFiles: readonly string[]}>} rawSection
 * @param {readonly string[]} reportFiles - Flat file names from the report dir.
 * @returns {Array<{date: string, analysisJson: string | null, otherFiles: string[], reportMd?: string, reportHtml?: string}>}
 *   New array sorted descending by date; inputs are not mutated.
 */
export function mergeProductsSections(rawSection, reportFiles) {
  const reportsByDate = new Map();
  for (const file of [...reportFiles].sort(compareNamesAsc)) {
    const info = classifyProductReportFile(file);
    if (info === null) {
      continue;
    }
    const existing = reportsByDate.get(info.date) ?? {};
    const key = info.kind === 'md' ? 'reportMd' : 'reportHtml';
    if (existing[key] === undefined) {
      reportsByDate.set(info.date, { ...existing, [key]: file });
    }
  }

  const rawDates = new Set(rawSection.map((entry) => entry.date));
  const merged = rawSection.map((entry) => {
    const reports = reportsByDate.get(entry.date);
    return reports === undefined ? { ...entry } : { ...entry, ...reports };
  });
  const reportOnly = [...reportsByDate.entries()]
    .filter(([date]) => !rawDates.has(date))
    .map(([date, reports]) => ({
      date,
      analysisJson: null,
      otherFiles: [],
      ...reports,
    }));

  return [...merged, ...reportOnly].sort((a, b) => compareDatesDesc(a.date, b.date));
}
