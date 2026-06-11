/**
 * Alpha-factors section builder.
 * Pure module: no filesystem access.
 */

/**
 * Fixed catalog of alpha-factor documents.
 * `sourcePath` is relative to the alpha source root; `file` is the flat
 * destination name inside public/content/alpha/.
 */
export const ALPHA_SOURCES = Object.freeze([
  Object.freeze({
    id: 'readme',
    title: 'Alpha Factors Overview',
    sourcePath: 'README.md',
    file: 'README.md',
  }),
  Object.freeze({
    id: 'technical',
    title: 'Technical Factors',
    sourcePath: 'technical/technical-factors.md',
    file: 'technical-factors.md',
  }),
  Object.freeze({
    id: 'value',
    title: 'Value Factors',
    sourcePath: 'fundamental/value-factors.md',
    file: 'value-factors.md',
  }),
  Object.freeze({
    id: 'sentiment',
    title: 'Sentiment Factors',
    sourcePath: 'sentiment/sentiment-factors.md',
    file: 'sentiment-factors.md',
  }),
]);

/**
 * Builds the alpha section, keeping only documents that are available.
 *
 * @param {readonly string[]} availableFiles - Destination file names that exist.
 * @returns {Array<{id: string, title: string, file: string}>} Fixed-order list.
 */
export function buildAlphaSection(availableFiles) {
  const available = new Set(availableFiles);
  return ALPHA_SOURCES.filter((entry) => available.has(entry.file)).map(
    ({ id, title, file }) => ({ id, title, file }),
  );
}
