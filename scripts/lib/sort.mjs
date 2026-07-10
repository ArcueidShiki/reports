/**
 * Shared sorting and junk-file helpers.
 * Pure module: no filesystem access.
 */

const JUNK_FILE_NAMES = Object.freeze(new Set(['.DS_Store', '.gitkeep']));
const JUNK_FILE_EXTENSIONS = Object.freeze(new Set(['.py', '.pyc']));

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
 * @returns {boolean} true when the file is OS/VCS junk, a dotfile, or a
 *   build script that must never be published as content.
 */
export function isJunkFile(name) {
  if (JUNK_FILE_NAMES.has(name) || name.startsWith('.')) return true;
  const dot = name.lastIndexOf('.');
  return dot > 0 && JUNK_FILE_EXTENSIONS.has(name.slice(dot));
}
