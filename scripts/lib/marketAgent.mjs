/**
 * Classification and merging of market-agent session reports
 * ("YYYY-MM-DD-<session>.md") into the daily market section.
 * Pure module: no filesystem access.
 */

import { parseDateFromName } from './dates.mjs';
import { detectLang } from './lang.mjs';
import { compareDatesDesc, compareNamesAsc } from './sort.mjs';

/** Human-readable tab titles per trading session. */
export const SESSION_TITLES = Object.freeze({
  premarket: 'Pre-Market',
  'in-market': 'In-Market',
  'close-market': 'Close',
  'post-market': 'Post-Market',
});

const MARKDOWN_EXTENSION = '.md';

/**
 * Classifies a single market-agent report file name.
 *
 * @param {string} name - File name, e.g. "2026-07-01-premarket.md".
 * @returns {{date: string, session: keyof typeof SESSION_TITLES} | null}
 *   null for the raw .json twins, index.json, dotfiles, names without a
 *   date prefix, and unknown session names.
 */
export function classifyMarketAgentFile(name) {
  if (typeof name !== 'string') {
    throw new TypeError(`classifyMarketAgentFile expects a string, got ${typeof name}`);
  }
  const date = parseDateFromName(name);
  if (date === null || !name.endsWith(MARKDOWN_EXTENSION)) {
    return null;
  }
  const session = name
    .slice(date.length, name.length - MARKDOWN_EXTENSION.length)
    .replace(/^-/, '');
  if (SESSION_TITLES[session] === undefined) {
    return null;
  }
  return { date, session };
}

/** Builds a market section item for a classified session report. */
function sessionItem(file, info) {
  return {
    file,
    lang: detectLang(file),
    kind: 'md',
    title: SESSION_TITLES[info.session],
    session: info.session,
  };
}

/**
 * Merges market-agent session reports into the daily market section.
 *
 * @param {ReadonlyArray<{date: string, items: readonly object[]}>} dailySection
 * @param {readonly string[]} agentFileNames - Flat market-agent file names.
 * @returns {Array<{date: string, items: object[]}>} New array sorted
 *   descending by date, items sorted by file name; inputs not mutated.
 */
export function mergeMarketAgentItems(dailySection, agentFileNames) {
  const classified = agentFileNames
    .map((file) => ({ file, info: classifyMarketAgentFile(file) }))
    .filter((entry) => entry.info !== null);

  const itemsByDate = new Map();
  for (const { file, info } of classified) {
    const items = itemsByDate.get(info.date) ?? [];
    itemsByDate.set(info.date, [...items, sessionItem(file, info)]);
  }

  const dailyDates = new Set(dailySection.map((group) => group.date));
  const merged = dailySection.map((group) => ({
    ...group,
    items: [...group.items, ...(itemsByDate.get(group.date) ?? [])].sort((a, b) =>
      compareNamesAsc(a.file, b.file),
    ),
  }));
  const agentOnly = [...itemsByDate.entries()]
    .filter(([date]) => !dailyDates.has(date))
    .map(([date, items]) => ({
      date,
      items: [...items].sort((a, b) => compareNamesAsc(a.file, b.file)),
    }));

  return [...merged, ...agentOnly].sort((a, b) => compareDatesDesc(a.date, b.date));
}
