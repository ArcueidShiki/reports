/**
 * Wisdom section builder (curated investing-wisdom markdown documents).
 * Pure module: no filesystem access.
 */

import { compareNamesAsc, isJunkFile } from './sort.mjs';

const MARKDOWN_SUFFIX = '.md';

/** "investing-wisdom" -> "Investing Wisdom" */
function deDashTitle(slug) {
  return slug
    .split('-')
    .filter((word) => word.length > 0)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Builds the wisdom section from a flat directory listing.
 *
 * @param {readonly string[]} fileNames - File names found in the wisdom source dir.
 * @returns {Array<{id: string, title: string, file: string}>}
 *   One entry per markdown file, sorted by file name ascending.
 */
export function buildWisdomSection(fileNames) {
  return fileNames
    .filter((name) => name.endsWith(MARKDOWN_SUFFIX) && !isJunkFile(name))
    .toSorted(compareNamesAsc)
    .map((file) => {
      const slug = file.slice(0, -MARKDOWN_SUFFIX.length);
      return { id: slug, title: deDashTitle(slug), file };
    });
}
