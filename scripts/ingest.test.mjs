import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { runIngest } from './ingest.mjs';

const FIXTURE_FILES = {
  'sources/products/2026-06-09/products-analysis.json': '{"products":[]}',
  'sources/products/2026-06-09/sources-raw.json': '{}',
  'sources/products/2026-06-11/products-analysis.json': '{"products":[]}',
  'sources/products/2026-06-11/raw-data.json': '{}',
  'sources/products/2026-06-11/sources-raw.json': '{}',
  'sources/products-report/2026-06-09-product-trends.md': '# trends 06-09',
  'sources/products-report/2026-06-09-product-trends.html': '<html>trends</html>',
  'sources/products-report/2026-06-12-product-trends.md': '# trends 06-12',
  'sources/products-report/build_html.py': 'print("no")',
  'sources/products-report/build_html_2026-06-12.py': 'print("no")',
  'sources/products-report/assets/2026-06-09/chart.png': 'png',
  'sources/products-report/assets/2026-06-09/make_charts.py': 'print("no")',
  'sources/products-report/assets/2026-01-01/orphan.png': 'png',
  'sources/market-agent/index.json': '{}',
  'sources/market-agent/.write_probe': '',
  'sources/market-agent/2026/06/2026-06-04-premarket.md': '# premarket',
  'sources/market-agent/2026/06/2026-06-04-premarket.json': '{}',
  'sources/market-agent/2026/06/2026-06-15-post-market.md': '# post market',
  'sources/market/06/2026-06-04-tech-rotation.md': '# en',
  'sources/market/06/2026-06-04-美股日报.md': '# zh',
  'sources/market/06/2026-06-05-ai-trade-unwind.srt': '1',
  'sources/market/06/2026-06-08-run-tts.sh': '#!/bin/sh',
  'sources/market/06/2026-06-10-小红书卡片.html': '<html></html>',
  'sources/alpha/README.md': '# overview',
  'sources/alpha/technical/technical-factors.md': '# technical',
  'sources/alpha/fundamental/value-factors.md': '# value',
  'sources/alpha/sentiment/sentiment-factors.md': '# sentiment',
  'sources/signals/2026-06-10/report_2026-06-10.pdf': 'pdf',
  'sources/signals/2026-06-10/signals_2026-06-10.md': '| a |',
  'sources/signals/2026-06-10/signals_2026-06-10.csv': 'a,b',
  'sources/signals/2026-06-10/calendar_2026-06-10.json': '{}',
  'sources/signals/2026-06-10/xhs_post_2026-06-10.txt': 'xhs',
  'sources/signals/2026-06-10/sources/cpi_fred.png': 'png',
  'sources/signals/2026-06-10/sources/official_2026-06-10.json': '{}',
  'sources/signals/2026-06-10/sources/provenance_2026-06-10.md': '# prov',
  'sources/signals/2026-06-11/report_2026-06-11.pdf': 'pdf',
  'sources/signals/2026-06-11/signals_2026-06-11.md': '| b |',
  'sources/signals/2026-06-11/signals_2026-06-11.csv': 'c,d',
  'sources/signals/2026-06-11/calendar_2026-06-11.json': '{}',
  'sources/signals/2026-06-11/poster_2026-06-11_2.png': 'png',
  'sources/signals/2026-06-11/poster_2026-06-11_1.png': 'png',
  'sources/gallery/b_render.png': 'png',
  'sources/gallery/a_render.png': 'png',
  'sources/gallery/notes.txt': 'not an image',
  'sources/wisdom/investing-wisdom.md': '## Mindset\n\n- quote · Author · Source',
  'sources/wisdom/draft-notes.txt': 'not markdown',
};

async function writeFixtureTree(root) {
  for (const [relPath, content] of Object.entries(FIXTURE_FILES)) {
    const absPath = path.join(root, relPath);
    await mkdir(path.dirname(absPath), { recursive: true });
    await writeFile(absPath, content);
  }
}

function makeConfig(root) {
  return {
    products: path.join(root, 'sources/products'),
    productsReport: path.join(root, 'sources/products-report'),
    market: path.join(root, 'sources/market'),
    marketAgent: path.join(root, 'sources/market-agent'),
    alpha: path.join(root, 'sources/alpha'),
    signals: path.join(root, 'sources/signals'),
    gallery: path.join(root, 'sources/gallery'),
    wisdom: path.join(root, 'sources/wisdom'),
    outputDir: 'public/content',
  };
}

async function fileExists(absPath) {
  try {
    return (await stat(absPath)).isFile();
  } catch {
    return false;
  }
}

describe('runIngest', () => {
  let root;
  let outRoot;
  let warn;
  const log = vi.fn();

  beforeEach(async () => {
    root = await mkdtemp(path.join(tmpdir(), 'ingest-test-'));
    outRoot = path.join(root, 'public/content');
    warn = vi.fn();
    await writeFixtureTree(root);
  });

  afterEach(async () => {
    await rm(root, { recursive: true, force: true });
  });

  it('writes a manifest with all six sections', async () => {
    const manifest = await runIngest(makeConfig(root), { baseDir: root, log, warn });
    const onDisk = JSON.parse(await readFile(path.join(outRoot, 'manifest.json'), 'utf8'));
    expect(onDisk).toEqual(manifest);
    expect(manifest.generatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(Object.keys(manifest.sections).sort()).toEqual([
      'alpha',
      'gallery',
      'market',
      'products',
      'signals',
      'wisdom',
    ]);
  });

  it('copies market md/html nested by date and skips srt/sh', async () => {
    const manifest = await runIngest(makeConfig(root), { baseDir: root, log, warn });
    expect(manifest.sections.market.map((group) => group.date)).toEqual([
      '2026-06-15',
      '2026-06-10',
      '2026-06-04',
    ]);
    expect(
      await fileExists(path.join(outRoot, 'market/2026-06-04/2026-06-04-tech-rotation.md')),
    ).toBe(true);
    expect(
      await fileExists(path.join(outRoot, 'market/2026-06-10/2026-06-10-小红书卡片.html')),
    ).toBe(true);
    expect(
      await fileExists(path.join(outRoot, 'market/2026-06-05/2026-06-05-ai-trade-unwind.srt')),
    ).toBe(false);
  });

  it('copies products nested by date with analysis json split out', async () => {
    const manifest = await runIngest(makeConfig(root), { baseDir: root, log, warn });
    expect(manifest.sections.products).toEqual([
      {
        date: '2026-06-12',
        analysisJson: null,
        otherFiles: [],
        reportMd: '2026-06-12-product-trends.md',
      },
      {
        date: '2026-06-11',
        analysisJson: 'products-analysis.json',
        otherFiles: ['raw-data.json', 'sources-raw.json'],
      },
      {
        date: '2026-06-09',
        analysisJson: 'products-analysis.json',
        otherFiles: ['sources-raw.json'],
        reportMd: '2026-06-09-product-trends.md',
        reportHtml: '2026-06-09-product-trends.html',
      },
    ]);
    expect(
      await fileExists(path.join(outRoot, 'products/2026-06-11/products-analysis.json')),
    ).toBe(true);
  });

  it('copies product trend reports per date and excludes python build scripts', async () => {
    await runIngest(makeConfig(root), { baseDir: root, log, warn });
    expect(
      await fileExists(path.join(outRoot, 'products/2026-06-09/2026-06-09-product-trends.md')),
    ).toBe(true);
    expect(
      await fileExists(path.join(outRoot, 'products/2026-06-09/2026-06-09-product-trends.html')),
    ).toBe(true);
    expect(
      await fileExists(path.join(outRoot, 'products/2026-06-12/2026-06-12-product-trends.md')),
    ).toBe(true);
    expect(await fileExists(path.join(outRoot, 'products/build_html.py'))).toBe(false);
    expect(
      await fileExists(path.join(outRoot, 'products/2026-06-12/build_html_2026-06-12.py')),
    ).toBe(false);
  });

  it('copies per-date report assets so relative image paths keep working', async () => {
    await runIngest(makeConfig(root), { baseDir: root, log, warn });
    expect(
      await fileExists(path.join(outRoot, 'products/2026-06-09/assets/2026-06-09/chart.png')),
    ).toBe(true);
    // asset dirs for dates without a report are not published
    expect(
      await fileExists(path.join(outRoot, 'products/2026-01-01/assets/2026-01-01/orphan.png')),
    ).toBe(false);
    // python helper scripts inside asset dirs are never published
    expect(
      await fileExists(path.join(outRoot, 'products/2026-06-09/assets/2026-06-09/make_charts.py')),
    ).toBe(false);
  });

  it('warns and keeps the raw products section when the report source dir is missing', async () => {
    const config = { ...makeConfig(root), productsReport: path.join(root, 'no-reports-here') };
    const manifest = await runIngest(config, { baseDir: root, log, warn });
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('no-reports-here'));
    expect(manifest.sections.products.map((entry) => entry.date)).toEqual([
      '2026-06-11',
      '2026-06-09',
    ]);
    expect(manifest.sections.products[1]).not.toHaveProperty('reportMd');
  });

  it('merges market-agent session md per date and excludes json/index/dotfiles', async () => {
    const manifest = await runIngest(makeConfig(root), { baseDir: root, log, warn });
    const june4 = manifest.sections.market.find((group) => group.date === '2026-06-04');
    expect(june4.items).toContainEqual({
      file: '2026-06-04-premarket.md',
      lang: 'en',
      kind: 'md',
      title: 'Pre-Market',
      session: 'premarket',
    });
    const june15 = manifest.sections.market.find((group) => group.date === '2026-06-15');
    expect(june15.items).toEqual([
      {
        file: '2026-06-15-post-market.md',
        lang: 'en',
        kind: 'md',
        title: 'Post-Market',
        session: 'post-market',
      },
    ]);
    expect(
      await fileExists(path.join(outRoot, 'market/2026-06-04/2026-06-04-premarket.md')),
    ).toBe(true);
    expect(
      await fileExists(path.join(outRoot, 'market/2026-06-15/2026-06-15-post-market.md')),
    ).toBe(true);
    expect(
      await fileExists(path.join(outRoot, 'market/2026-06-04/2026-06-04-premarket.json')),
    ).toBe(false);
    expect(await fileExists(path.join(outRoot, 'market/index.json'))).toBe(false);
    expect(await fileExists(path.join(outRoot, 'market/.write_probe'))).toBe(false);
  });

  it('warns and keeps the daily market section when the agent source dir is missing', async () => {
    const config = { ...makeConfig(root), marketAgent: path.join(root, 'no-agent-here') };
    const manifest = await runIngest(config, { baseDir: root, log, warn });
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('no-agent-here'));
    expect(manifest.sections.market.map((group) => group.date)).toEqual([
      '2026-06-10',
      '2026-06-04',
    ]);
  });

  it('copies signals with sources subdir, null sources when absent', async () => {
    const manifest = await runIngest(makeConfig(root), { baseDir: root, log, warn });
    const [june11, june10] = manifest.sections.signals;
    expect(june11.date).toBe('2026-06-11');
    expect(june11.sources).toBeNull();
    expect(june11.posters).toEqual(['poster_2026-06-11_1.png', 'poster_2026-06-11_2.png']);
    expect(june10.sources).toEqual({
      images: ['cpi_fred.png'],
      provenanceMd: 'provenance_2026-06-10.md',
      officialJson: 'official_2026-06-10.json',
    });
    expect(
      await fileExists(path.join(outRoot, 'signals/2026-06-10/sources/cpi_fred.png')),
    ).toBe(true);
    expect(
      await fileExists(path.join(outRoot, 'signals/2026-06-11/poster_2026-06-11_1.png')),
    ).toBe(true);
    expect(
      await fileExists(path.join(outRoot, 'signals/2026-06-10/xhs_post_2026-06-10.txt')),
    ).toBe(false);
  });

  it('copies the four alpha documents flat', async () => {
    const manifest = await runIngest(makeConfig(root), { baseDir: root, log, warn });
    expect(manifest.sections.alpha.map((entry) => entry.id)).toEqual([
      'readme',
      'technical',
      'value',
      'sentiment',
    ]);
    expect(await fileExists(path.join(outRoot, 'alpha/technical-factors.md'))).toBe(true);
    expect(await fileExists(path.join(outRoot, 'alpha/README.md'))).toBe(true);
  });

  it('copies only markdown files into wisdom, flat', async () => {
    const manifest = await runIngest(makeConfig(root), { baseDir: root, log, warn });
    expect(manifest.sections.wisdom).toEqual([
      {
        id: 'investing-wisdom',
        title: 'Investing Wisdom',
        file: 'investing-wisdom.md',
      },
    ]);
    expect(await fileExists(path.join(outRoot, 'wisdom/investing-wisdom.md'))).toBe(true);
    expect(await fileExists(path.join(outRoot, 'wisdom/draft-notes.txt'))).toBe(false);
  });

  it('warns and emits an empty wisdom section when its source dir is missing', async () => {
    const config = { ...makeConfig(root), wisdom: path.join(root, 'no-wisdom-here') };
    const manifest = await runIngest(config, { baseDir: root, log, warn });
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('no-wisdom-here'));
    expect(manifest.sections.wisdom).toEqual([]);
  });

  it('copies only png files into gallery, sorted', async () => {
    const manifest = await runIngest(makeConfig(root), { baseDir: root, log, warn });
    expect(manifest.sections.gallery).toEqual({
      images: ['a_render.png', 'b_render.png'],
    });
    expect(await fileExists(path.join(outRoot, 'gallery/a_render.png'))).toBe(true);
    expect(await fileExists(path.join(outRoot, 'gallery/notes.txt'))).toBe(false);
  });

  it('warns and emits an empty section when a source dir is missing', async () => {
    const config = { ...makeConfig(root), gallery: path.join(root, 'does-not-exist') };
    const manifest = await runIngest(config, { baseDir: root, log, warn });
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('does-not-exist'));
    expect(manifest.sections.gallery).toEqual({ images: [] });
    expect(manifest.sections.market.length).toBeGreaterThan(0);
  });

  it('rejects an invalid config with a clear error', async () => {
    const { signals: _omitted, ...incomplete } = makeConfig(root);
    await expect(runIngest(incomplete, { baseDir: root, log, warn })).rejects.toThrow(/signals/);
  });

  it('is idempotent across repeated runs', async () => {
    const first = await runIngest(makeConfig(root), { baseDir: root, log, warn });
    const second = await runIngest(makeConfig(root), { baseDir: root, log, warn });
    expect(second.sections).toEqual(first.sections);
  });
});
