/**
 * Date parsing helpers for content file/directory names.
 * Pure module: no filesystem access.
 */

const DATE_PREFIX_PATTERN = /^(\d{4})-(\d{2})-(\d{2})(?:$|[-._])/;

const MONTH_MIN = 1;
const MONTH_MAX = 12;
const DAY_MIN = 1;
const DAY_MAX = 31;

/**
 * Extracts a leading "YYYY-MM-DD" date from a file or directory name.
 *
 * @param {string} name - File or directory name (not a path).
 * @returns {string | null} The date string, or null when the name does not
 *   start with a plausible date.
 */
export function parseDateFromName(name) {
  if (typeof name !== 'string') {
    throw new TypeError(`parseDateFromName expects a string, got ${typeof name}`);
  }
  const match = DATE_PREFIX_PATTERN.exec(name);
  if (!match) {
    return null;
  }
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < MONTH_MIN || month > MONTH_MAX || day < DAY_MIN || day > DAY_MAX) {
    return null;
  }
  return `${match[1]}-${match[2]}-${match[3]}`;
}
