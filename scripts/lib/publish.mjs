/**
 * Pure helpers for the publish orchestrator (scripts/publish.mjs).
 * Pure module: no filesystem, git, or network access.
 */

/** Repo-relative directory whose changes the publish script is allowed to stage. */
export const CONTENT_DIR = 'public/content';

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const ISO_TIMESTAMP_PATTERN =
  /^(\d{4}-\d{2}-\d{2})T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
/** git status --porcelain: two status chars + one space before the path. */
const PORCELAIN_PATH_OFFSET = 3;
const RENAME_SEPARATOR = ' -> ';

function requireValidDate(value, source) {
  if (typeof value !== 'string' || !DATE_PATTERN.test(value)) {
    throw new Error(`${source} must be a YYYY-MM-DD date, got: ${String(value)}`);
  }
  return value;
}

/**
 * Parses publish CLI arguments.
 *
 * @param {string[]} argv - Arguments after the script path (process.argv.slice(2)).
 * @returns {{dryRun: boolean, skipDeploy: boolean, date: string | null}}
 */
export function parsePublishArgs(argv) {
  if (!Array.isArray(argv)) {
    throw new TypeError(`parsePublishArgs expects an array, got ${typeof argv}`);
  }
  let dryRun = false;
  let skipDeploy = false;
  let date = null;
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--dry-run') {
      dryRun = true;
    } else if (arg === '--skip-deploy') {
      skipDeploy = true;
    } else if (arg === '--date') {
      date = requireValidDate(argv[i + 1], '--date');
      i += 1;
    } else if (arg.startsWith('--date=')) {
      date = requireValidDate(arg.slice('--date='.length), '--date');
    } else {
      throw new Error(
        `unknown argument: ${arg} (expected --dry-run, --skip-deploy, --date YYYY-MM-DD)`,
      );
    }
  }
  return Object.freeze({ dryRun, skipDeploy, date });
}

/**
 * Extracts the YYYY-MM-DD date from an ISO timestamp such as the
 * manifest.json generatedAt field.
 *
 * @param {string} isoTimestamp
 * @returns {string} The date portion.
 */
export function formatPublishDate(isoTimestamp) {
  if (typeof isoTimestamp !== 'string') {
    throw new TypeError(`formatPublishDate expects a string, got ${typeof isoTimestamp}`);
  }
  const match = ISO_TIMESTAMP_PATTERN.exec(isoTimestamp);
  if (!match) {
    throw new Error(`formatPublishDate expects an ISO timestamp, got: ${isoTimestamp}`);
  }
  return match[1];
}

/**
 * Builds the conventional commit message for a content publish.
 *
 * @param {string} date - YYYY-MM-DD publish date.
 * @returns {string}
 */
export function buildPublishCommitMessage(date) {
  if (typeof date !== 'string') {
    throw new TypeError(`buildPublishCommitMessage expects a string, got ${typeof date}`);
  }
  return `chore: publish content ${requireValidDate(date, 'commit date')}`;
}

/** Strips the surrounding double quotes git adds around paths with special chars. */
function unquotePorcelainPath(rawPath) {
  if (rawPath.startsWith('"') && rawPath.endsWith('"') && rawPath.length >= 2) {
    return rawPath.slice(1, -1);
  }
  return rawPath;
}

function extractPorcelainPath(line) {
  const rawPath = line.slice(PORCELAIN_PATH_OFFSET);
  const renameIndex = rawPath.indexOf(RENAME_SEPARATOR);
  const destination =
    renameIndex === -1 ? rawPath : rawPath.slice(renameIndex + RENAME_SEPARATOR.length);
  return unquotePorcelainPath(destination);
}

function isContentPath(filePath) {
  return filePath === CONTENT_DIR || filePath.startsWith(`${CONTENT_DIR}/`);
}

/**
 * Partitions `git status --porcelain` output into content-output paths
 * (safe for the publish script to stage) and everything else.
 *
 * @param {string} porcelainText - Raw stdout of `git status --porcelain`.
 * @returns {{contentPaths: string[], otherPaths: string[]}}
 */
export function partitionDirtyPaths(porcelainText) {
  if (typeof porcelainText !== 'string') {
    throw new TypeError(`partitionDirtyPaths expects a string, got ${typeof porcelainText}`);
  }
  const paths = porcelainText
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .map(extractPorcelainPath);
  return Object.freeze({
    contentPaths: paths.filter(isContentPath),
    otherPaths: paths.filter((filePath) => !isContentPath(filePath)),
  });
}

/**
 * Partitions `git diff --cached --name-only` output into content-output paths
 * and everything else. Final guard before `git commit`: the publish script
 * must never commit staged paths outside CONTENT_DIR, even ones staged by the
 * user or a prior interrupted session before the script ran.
 *
 * @param {string} nameOnlyText - Raw stdout of `git diff --cached --name-only`.
 * @returns {{contentPaths: string[], otherPaths: string[]}}
 */
export function partitionStagedPaths(nameOnlyText) {
  if (typeof nameOnlyText !== 'string') {
    throw new TypeError(`partitionStagedPaths expects a string, got ${typeof nameOnlyText}`);
  }
  const paths = nameOnlyText
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .map(unquotePorcelainPath);
  return Object.freeze({
    contentPaths: paths.filter(isContentPath),
    otherPaths: paths.filter((filePath) => !isContentPath(filePath)),
  });
}

/**
 * Predicate for the post-deploy live check: does the remote manifest carry the
 * same generatedAt as the locally written one? A malformed remote manifest is
 * treated as "not yet in sync" (stale cache) rather than an error, while a
 * malformed local manifest is a hard failure because we just wrote it.
 *
 * @param {unknown} localManifest
 * @param {unknown} remoteManifest
 * @returns {boolean}
 */
export function manifestGeneratedAtMatches(localManifest, remoteManifest) {
  const localGeneratedAt =
    localManifest !== null && typeof localManifest === 'object'
      ? localManifest.generatedAt
      : undefined;
  if (typeof localGeneratedAt !== 'string' || localGeneratedAt.length === 0) {
    throw new Error('local manifest is missing a generatedAt string');
  }
  if (remoteManifest === null || typeof remoteManifest !== 'object') {
    return false;
  }
  return remoteManifest.generatedAt === localGeneratedAt;
}
