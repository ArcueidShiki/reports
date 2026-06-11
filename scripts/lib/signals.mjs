/**
 * Signal-calendar section builder.
 * Pure module: no filesystem access.
 */

import { compareDatesDesc, compareNamesAsc, isJunkFile } from './sort.mjs';

const PDF_SUFFIX = '.pdf';
const CSV_SUFFIX = '.csv';
const SIGNALS_MD_PREFIX = 'signals_';
const CALENDAR_JSON_PREFIX = 'calendar_';
const POSTER_PREFIX = 'poster';
const PNG_SUFFIX = '.png';
const PROVENANCE_PREFIX = 'provenance';
const OFFICIAL_PREFIX = 'official';

function findFile(files, predicate) {
  return files.find(predicate) ?? null;
}

/**
 * @param {readonly string[] | null | undefined} sourceFiles
 * @returns {{images: string[], provenanceMd: string | null, officialJson: string | null} | null}
 */
function buildSources(sourceFiles) {
  if (sourceFiles === null || sourceFiles === undefined) {
    return null;
  }
  const files = sourceFiles.filter((file) => !isJunkFile(file));
  return {
    images: files.filter((file) => file.endsWith(PNG_SUFFIX)).sort(compareNamesAsc),
    provenanceMd: findFile(
      files,
      (file) => file.startsWith(PROVENANCE_PREFIX) && file.endsWith('.md'),
    ),
    officialJson: findFile(
      files,
      (file) => file.startsWith(OFFICIAL_PREFIX) && file.endsWith('.json'),
    ),
  };
}

/**
 * Builds the signals section from per-date directory listings.
 *
 * @param {ReadonlyArray<{date: string, files: readonly string[], sources: readonly string[] | null}>} dateDirsWithEntries
 * @returns {Array<{date: string, pdf: string | null, signalsMd: string | null,
 *   csv: string | null, calendarJson: string | null, posters: string[],
 *   sources: {images: string[], provenanceMd: string | null, officialJson: string | null} | null}>}
 *   Entries sorted descending by date.
 */
export function buildSignalsSection(dateDirsWithEntries) {
  return dateDirsWithEntries
    .map((dir) => {
      const files = dir.files.filter((file) => !isJunkFile(file));
      return {
        date: dir.date,
        pdf: findFile(files, (file) => file.endsWith(PDF_SUFFIX)),
        signalsMd: findFile(
          files,
          (file) => file.startsWith(SIGNALS_MD_PREFIX) && file.endsWith('.md'),
        ),
        csv: findFile(files, (file) => file.endsWith(CSV_SUFFIX)),
        calendarJson: findFile(
          files,
          (file) => file.startsWith(CALENDAR_JSON_PREFIX) && file.endsWith('.json'),
        ),
        posters: files
          .filter((file) => file.startsWith(POSTER_PREFIX) && file.endsWith(PNG_SUFFIX))
          .sort(compareNamesAsc),
        sources: buildSources(dir.sources),
      };
    })
    .sort((a, b) => compareDatesDesc(a.date, b.date));
}
