/**
 * Shared sorting and junk-file helpers.
 * Pure module: no filesystem access.
 */

const JUNK_FILE_NAMES = Object.freeze(new Set(['.DS_Store', '.gitkeep']));

/**
 * Comparator for ISO "YYYY-MM-DD" date strings, newest first.
 *
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
export function compareDatesDesc(a, b) {
  if (a < b) return 1;
  if (a > b) return -1;
  return 0;
}

/**
 * Comparator for plain ascending string sort (deterministic, locale-free).
 *
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
export function compareNamesAsc(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

/**
 * @param {string} name - File name.
 * @returns {boolean} true when the file is OS/VCS junk to be ignored.
 */
export function isJunkFile(name) {
  return JUNK_FILE_NAMES.has(name);
}
