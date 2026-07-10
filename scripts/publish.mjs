/**
 * One-command content publish orchestrator.
 *
 * Pipeline: ingest -> test -> build -> stage public/content -> commit ->
 * push -> wrangler deploy -> live-verify the deployed manifest.
 *
 * Usage: node scripts/publish.mjs [--dry-run] [--skip-deploy] [--date YYYY-MM-DD]
 *   --dry-run      run ingest/tests/build and report, but never touch git or deploy
 *   --skip-deploy  commit and push content, but skip wrangler deploy + live verify
 *
 * Pure decision logic lives in scripts/lib/publish.mjs (TDD'd); this file is
 * thin subprocess glue.
 */

import { spawnSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import { runIngest } from './ingest.mjs';
import {
  CONTENT_DIR,
  buildPublishCommitMessage,
  formatPublishDate,
  manifestGeneratedAtMatches,
  parsePublishArgs,
  partitionDirtyPaths,
  partitionStagedPaths,
} from './lib/publish.mjs';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const INGEST_CONFIG = path.join(REPO_ROOT, 'ingest.config.json');
const LIVE_MANIFEST_URL = 'https://blog.arcueidshiki.uk/content/manifest.json';
const GIT_REMOTE = 'origin';
const GIT_BRANCH = 'main';
const VERIFY_ATTEMPTS = 5;
const VERIFY_DELAY_MS = 4000;

const log = (message) => console.log(`[publish] ${message}`);
const warn = (message) => console.warn(`[publish] WARNING: ${message}`);

function describeFailure(result) {
  return result.signal !== null
    ? `was killed by signal ${result.signal}`
    : `failed with exit code ${result.status}`;
}

/** Runs a subprocess with output streamed to the console; throws on failure. */
function runStep(description, command, args) {
  log(`$ ${command} ${args.join(' ')}`);
  const result = spawnSync(command, args, { cwd: REPO_ROOT, stdio: 'inherit' });
  if (result.error) {
    throw new Error(`${description} failed to start: ${result.error.message}`);
  }
  if (result.status !== 0) {
    throw new Error(`${description} ${describeFailure(result)}`);
  }
}

/** Runs a subprocess and returns its stdout; throws (with stderr) on failure. */
function runCapture(description, command, args) {
  const result = spawnSync(command, args, { cwd: REPO_ROOT, encoding: 'utf8' });
  if (result.error) {
    throw new Error(`${description} failed to start: ${result.error.message}`);
  }
  if (result.status !== 0) {
    throw new Error(`${description} ${describeFailure(result)}: ${result.stderr.trim()}`);
  }
  return result.stdout;
}

async function stepIngest() {
  log('step 1/8: ingest content sources');
  let rawConfig;
  try {
    rawConfig = JSON.parse(await readFile(INGEST_CONFIG, 'utf8'));
  } catch (error) {
    throw new Error(`cannot read ingest config at ${INGEST_CONFIG}: ${error.message}`);
  }
  return runIngest(rawConfig, { baseDir: REPO_ROOT });
}

/** Stages content outputs only; warns about (and never stages) other dirty files. */
function stepStage(dryRun) {
  log(`step 4/8: stage ${CONTENT_DIR}`);
  const porcelain = runCapture('git status', 'git', ['status', '--porcelain']);
  const { contentPaths, otherPaths } = partitionDirtyPaths(porcelain);
  if (otherPaths.length > 0) {
    warn(
      `${otherPaths.length} non-content dirty file(s) detected; publish never stages ` +
        'code changes, and aborts before commit if any are already staged:',
    );
    otherPaths.forEach((filePath) => warn(`  ${filePath}`));
  }
  if (contentPaths.length === 0) {
    log('no content changes detected');
    return;
  }
  if (dryRun) {
    log(`dry-run: would stage ${contentPaths.length} content path(s)`);
    return;
  }
  runStep('git add', 'git', ['add', '--', CONTENT_DIR]);
}

function stepCommit(publishDate) {
  log('step 5/8: commit staged content');
  const staged = runCapture('git diff --cached', 'git', ['diff', '--cached', '--name-only']);
  const { contentPaths, otherPaths } = partitionStagedPaths(staged);
  if (otherPaths.length > 0) {
    throw new Error(
      `refusing to commit: ${otherPaths.length} staged path(s) outside ${CONTENT_DIR} ` +
        `(unstage with "git restore --staged <path>" and re-run):\n  ${otherPaths.join('\n  ')}`,
    );
  }
  if (contentPaths.length === 0) {
    log('nothing staged, skipping commit');
    return;
  }
  const message = buildPublishCommitMessage(publishDate);
  runStep('git commit', 'git', ['commit', '-m', message]);
  log(`committed: ${message}`);
}

async function fetchRemoteManifest() {
  const response = await fetch(`${LIVE_MANIFEST_URL}?ts=${Date.now()}`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(`live manifest fetch returned HTTP ${response.status}`);
  }
  return response.json();
}

async function stepVerify(localManifest) {
  log(`step 8/8: verify live manifest at ${LIVE_MANIFEST_URL}`);
  for (let attempt = 1; attempt <= VERIFY_ATTEMPTS; attempt += 1) {
    try {
      if (manifestGeneratedAtMatches(localManifest, await fetchRemoteManifest())) {
        log(`live manifest matches local generatedAt=${localManifest.generatedAt}`);
        return;
      }
      log(`attempt ${attempt}/${VERIFY_ATTEMPTS}: live manifest not updated yet`);
    } catch (error) {
      log(`attempt ${attempt}/${VERIFY_ATTEMPTS}: ${error.message}`);
    }
    if (attempt < VERIFY_ATTEMPTS) {
      await delay(VERIFY_DELAY_MS);
    }
  }
  throw new Error(
    `live manifest still differs from local after ${VERIFY_ATTEMPTS} attempts; ` +
      `check ${LIVE_MANIFEST_URL} manually`,
  );
}

async function main() {
  const args = parsePublishArgs(process.argv.slice(2));
  const mode = args.dryRun ? 'dry-run' : args.skipDeploy ? 'skip-deploy' : 'full publish';
  log(`mode: ${mode}`);

  const manifest = await stepIngest();
  const publishDate = args.date ?? formatPublishDate(manifest.generatedAt);

  log('step 2/8: run test suite');
  runStep('tests', 'npx', ['vitest', 'run']);

  log('step 3/8: build');
  runStep('build', 'npm', ['run', 'build']);

  stepStage(args.dryRun);

  if (args.dryRun) {
    log('steps 5-8/8 skipped (dry-run): commit, push, deploy, live verify');
    log(`dry-run complete: content for ${publishDate} ingested, tests green, build ok`);
    return;
  }

  stepCommit(publishDate);

  log(`step 6/8: push to ${GIT_REMOTE}/${GIT_BRANCH}`);
  runStep('git push', 'git', ['push', GIT_REMOTE, GIT_BRANCH]);

  if (args.skipDeploy) {
    log('steps 7-8/8 skipped (--skip-deploy): deploy, live verify');
    log(`publish complete (not deployed): content for ${publishDate} pushed`);
    return;
  }

  log('step 7/8: deploy worker');
  runStep('wrangler deploy', 'npx', ['wrangler', 'deploy']);

  await stepVerify(manifest);
  log(`publish complete: content for ${publishDate} live at https://blog.arcueidshiki.uk`);
}

main().catch((error) => {
  console.error(`[publish] FAILED: ${error.message}`);
  process.exitCode = 1;
});
