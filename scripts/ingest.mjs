/**
 * Content ingest orchestrator.
 *
 * Reads the six report sources declared in ingest.config.json, copies their
 * publishable files into
 * public/content/{products,market,alpha,signals,gallery,wisdom}/
 * and writes public/content/manifest.json describing what was copied.
 *
 * Usage: node scripts/ingest.mjs [configPath]
 */

import { copyFile, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { ALPHA_SOURCES, buildAlphaSection } from './lib/alpha.mjs';
import { validateIngestConfig } from './lib/config.mjs';
import { parseDateFromName } from './lib/dates.mjs';
import { buildGallerySection } from './lib/gallery.mjs';
import { buildMarketSection } from './lib/market.mjs';
import { buildProductsSection } from './lib/products.mjs';
import { buildSignalsSection } from './lib/signals.mjs';
import { isJunkFile } from './lib/sort.mjs';
import { buildWisdomSection } from './lib/wisdom.mjs';

const MANIFEST_FILE = 'manifest.json';
const SIGNALS_SOURCES_DIR = 'sources';
const SECTION_NAMES = Object.freeze([
  'products',
  'market',
  'alpha',
  'signals',
  'gallery',
  'wisdom',
]);

async function dirExists(absPath) {
  try {
    return (await stat(absPath)).isDirectory();
  } catch {
    return false;
  }
}

async function fileExists(absPath) {
  try {
    return (await stat(absPath)).isFile();
  } catch {
    return false;
  }
}

/** Lists plain file names in a directory, junk files excluded. */
async function listFileNames(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && !isJunkFile(entry.name))
    .map((entry) => entry.name);
}

/** Lists subdirectory names whose name starts with a YYYY-MM-DD date. */
async function listDateDirNames(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory() && parseDateFromName(entry.name) !== null)
    .map((entry) => entry.name);
}

/** Removes and recreates a directory so repeated runs never keep stale files. */
async function resetDir(dir) {
  await rm(dir, { recursive: true, force: true });
  await mkdir(dir, { recursive: true });
}

async function copyAll(srcDir, destDir, fileNames) {
  await mkdir(destDir, { recursive: true });
  await Promise.all(
    fileNames.map((name) => copyFile(path.join(srcDir, name), path.join(destDir, name))),
  );
}

async function ingestProducts(sourceRoot, outDir, warn) {
  if (!(await dirExists(sourceRoot))) {
    warn(`products source dir missing, emitting empty section: ${sourceRoot}`);
    return [];
  }
  const dateDirs = await listDateDirNames(sourceRoot);
  const dateDirsWithFiles = await Promise.all(
    dateDirs.map(async (date) => ({
      date,
      files: await listFileNames(path.join(sourceRoot, date)),
    })),
  );
  const section = buildProductsSection(dateDirsWithFiles);
  for (const entry of section) {
    const names = [entry.analysisJson, ...entry.otherFiles].filter((name) => name !== null);
    await copyAll(path.join(sourceRoot, entry.date), path.join(outDir, entry.date), names);
  }
  return section;
}

/** Collects file names from the market root and its immediate subdirs (months). */
async function collectMarketFiles(sourceRoot) {
  const entries = await readdir(sourceRoot, { withFileTypes: true });
  const rootFiles = entries
    .filter((entry) => entry.isFile())
    .map((entry) => ({ name: entry.name, dir: sourceRoot }));
  const subdirFiles = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const dir = path.join(sourceRoot, entry.name);
        const names = await listFileNames(dir);
        return names.map((name) => ({ name, dir }));
      }),
  );
  return [...rootFiles, ...subdirFiles.flat()];
}

async function ingestMarket(sourceRoot, outDir, warn) {
  if (!(await dirExists(sourceRoot))) {
    warn(`market source dir missing, emitting empty section: ${sourceRoot}`);
    return [];
  }
  const found = await collectMarketFiles(sourceRoot);
  const sourceDirByName = new Map(found.map((entry) => [entry.name, entry.dir]));
  const section = buildMarketSection(found.map((entry) => entry.name));
  for (const group of section) {
    const destDir = path.join(outDir, group.date);
    await mkdir(destDir, { recursive: true });
    await Promise.all(
      group.items.map((item) =>
        copyFile(
          path.join(sourceDirByName.get(item.file), item.file),
          path.join(destDir, item.file),
        ),
      ),
    );
  }
  return section;
}

async function ingestAlpha(sourceRoot, outDir, warn) {
  if (!(await dirExists(sourceRoot))) {
    warn(`alpha source dir missing, emitting empty section: ${sourceRoot}`);
    return [];
  }
  await mkdir(outDir, { recursive: true });
  const copied = await Promise.all(
    ALPHA_SOURCES.map(async (entry) => {
      const src = path.join(sourceRoot, entry.sourcePath);
      if (!(await fileExists(src))) {
        warn(`alpha document missing, skipping: ${src}`);
        return null;
      }
      await copyFile(src, path.join(outDir, entry.file));
      return entry.file;
    }),
  );
  return buildAlphaSection(copied.filter((file) => file !== null));
}

async function ingestSignals(sourceRoot, outDir, warn) {
  if (!(await dirExists(sourceRoot))) {
    warn(`signals source dir missing, emitting empty section: ${sourceRoot}`);
    return [];
  }
  const dateDirs = await listDateDirNames(sourceRoot);
  const dateDirsWithEntries = await Promise.all(
    dateDirs.map(async (date) => {
      const dateDir = path.join(sourceRoot, date);
      const sourcesDir = path.join(dateDir, SIGNALS_SOURCES_DIR);
      return {
        date,
        files: await listFileNames(dateDir),
        sources: (await dirExists(sourcesDir)) ? await listFileNames(sourcesDir) : null,
      };
    }),
  );
  const section = buildSignalsSection(dateDirsWithEntries);
  for (const entry of section) {
    const srcDir = path.join(sourceRoot, entry.date);
    const destDir = path.join(outDir, entry.date);
    const topFiles = [entry.pdf, entry.signalsMd, entry.csv, entry.calendarJson, ...entry.posters]
      .filter((name) => name !== null);
    await copyAll(srcDir, destDir, topFiles);
    if (entry.sources !== null) {
      const sourceFiles = [
        ...entry.sources.images,
        entry.sources.provenanceMd,
        entry.sources.officialJson,
      ].filter((name) => name !== null);
      await copyAll(
        path.join(srcDir, SIGNALS_SOURCES_DIR),
        path.join(destDir, SIGNALS_SOURCES_DIR),
        sourceFiles,
      );
    }
  }
  return section;
}

async function ingestGallery(sourceRoot, outDir, warn) {
  if (!(await dirExists(sourceRoot))) {
    warn(`gallery source dir missing, emitting empty section: ${sourceRoot}`);
    return { images: [] };
  }
  const section = buildGallerySection(await listFileNames(sourceRoot));
  await copyAll(sourceRoot, outDir, section.images);
  return section;
}

async function ingestWisdom(sourceRoot, outDir, warn) {
  if (!(await dirExists(sourceRoot))) {
    warn(`wisdom source dir missing, emitting empty section: ${sourceRoot}`);
    return [];
  }
  const section = buildWisdomSection(await listFileNames(sourceRoot));
  await copyAll(sourceRoot, outDir, section.map((entry) => entry.file));
  return section;
}

/**
 * Runs the full ingest.
 *
 * @param {unknown} rawConfig - Parsed config JSON (validated here).
 * @param {{baseDir: string, log?: (msg: string) => void, warn?: (msg: string) => void}} options
 *   baseDir resolves a relative outputDir (normally the repo root).
 * @returns {Promise<object>} The manifest that was written.
 */
export async function runIngest(rawConfig, { baseDir, log = console.log, warn = console.warn }) {
  if (typeof baseDir !== 'string' || baseDir.length === 0) {
    throw new Error('runIngest requires a non-empty baseDir option');
  }
  const config = validateIngestConfig(rawConfig);
  const outputRoot = path.resolve(baseDir, config.outputDir);
  await Promise.all(
    SECTION_NAMES.map((name) => resetDir(path.join(outputRoot, name))),
  );

  const sections = {
    products: await ingestProducts(config.products, path.join(outputRoot, 'products'), warn),
    market: await ingestMarket(config.market, path.join(outputRoot, 'market'), warn),
    alpha: await ingestAlpha(config.alpha, path.join(outputRoot, 'alpha'), warn),
    signals: await ingestSignals(config.signals, path.join(outputRoot, 'signals'), warn),
    gallery: await ingestGallery(config.gallery, path.join(outputRoot, 'gallery'), warn),
    wisdom: await ingestWisdom(config.wisdom, path.join(outputRoot, 'wisdom'), warn),
  };

  const manifest = { generatedAt: new Date().toISOString(), sections };
  await writeFile(
    path.join(outputRoot, MANIFEST_FILE),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );
  log(
    `ingest complete: products=${sections.products.length} dates, ` +
      `market=${sections.market.length} dates, alpha=${sections.alpha.length} docs, ` +
      `signals=${sections.signals.length} dates, gallery=${sections.gallery.images.length} images, ` +
      `wisdom=${sections.wisdom.length} docs -> ${outputRoot}`,
  );
  return manifest;
}

async function main() {
  const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const configPath = process.argv[2]
    ? path.resolve(process.argv[2])
    : path.join(repoRoot, 'ingest.config.json');
  let rawText;
  try {
    rawText = await readFile(configPath, 'utf8');
  } catch (error) {
    throw new Error(`cannot read ingest config at ${configPath}: ${error.message}`);
  }
  let rawConfig;
  try {
    rawConfig = JSON.parse(rawText);
  } catch (error) {
    throw new Error(`invalid JSON in ${configPath}: ${error.message}`);
  }
  await runIngest(rawConfig, { baseDir: path.dirname(configPath) });
}

const isDirectRun =
  process.argv[1] !== undefined &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  main().catch((error) => {
    console.error(`ingest failed: ${error.message}`);
    process.exitCode = 1;
  });
}
