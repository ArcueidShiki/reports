/**
 * Product-analytics section builder.
 * Pure module: no filesystem access.
 */

import { compareDatesDesc, compareNamesAsc, isJunkFile } from './sort.mjs';

export const PRODUCTS_ANALYSIS_FILE = 'products-analysis.json';

/**
 * Builds the products section from per-date directory listings.
 *
 * @param {ReadonlyArray<{date: string, files: readonly string[]}>} dateDirsWithFiles
 * @returns {Array<{date: string, analysisJson: string | null, otherFiles: string[]}>}
 *   Entries sorted descending by date.
 */
export function buildProductsSection(dateDirsWithFiles) {
  return dateDirsWithFiles
    .map((dir) => {
      const files = dir.files.filter((file) => !isJunkFile(file));
      const analysisJson = files.includes(PRODUCTS_ANALYSIS_FILE)
        ? PRODUCTS_ANALYSIS_FILE
        : null;
      return {
        date: dir.date,
        analysisJson,
        otherFiles: files
          .filter((file) => file !== PRODUCTS_ANALYSIS_FILE)
          .sort(compareNamesAsc),
      };
    })
    .sort((a, b) => compareDatesDesc(a.date, b.date));
}
