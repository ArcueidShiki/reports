import { describe, expect, it } from 'vitest';
import {
  classifyProductReportFile,
  isReportAssetFile,
  mergeProductsSections,
} from './productsReport.mjs';

describe('isReportAssetFile', () => {
  it('accepts web image files', () => {
    expect(isReportAssetFile('positioning.png')).toBe(true);
    expect(isReportAssetFile('photo.JPG')).toBe(true);
    expect(isReportAssetFile('chart.webp')).toBe(true);
    expect(isReportAssetFile('logo.svg')).toBe(true);
  });

  it('rejects python scripts and junk', () => {
    expect(isReportAssetFile('make_report_images.py')).toBe(false);
    expect(isReportAssetFile('build_html.py')).toBe(false);
    expect(isReportAssetFile('.DS_Store')).toBe(false);
    expect(isReportAssetFile('notes.txt')).toBe(false);
  });

  it('throws for non-string input', () => {
    expect(() => isReportAssetFile(null)).toThrow(TypeError);
  });
});

describe('classifyProductReportFile', () => {
  it('classifies a dated markdown trend report', () => {
    expect(classifyProductReportFile('2026-07-01-product-trends.md')).toEqual({
      date: '2026-07-01',
      kind: 'md',
    });
  });

  it('classifies a dated html trend report', () => {
    expect(classifyProductReportFile('2026-07-01-product-trends.html')).toEqual({
      date: '2026-07-01',
      kind: 'html',
    });
  });

  it('returns null for python build scripts', () => {
    expect(classifyProductReportFile('build_html.py')).toBeNull();
    expect(classifyProductReportFile('build_html_2026-07-01.py')).toBeNull();
  });

  it('returns null for junk and dotfiles', () => {
    expect(classifyProductReportFile('.DS_Store')).toBeNull();
  });

  it('returns null for names without a date prefix', () => {
    expect(classifyProductReportFile('product-trends.md')).toBeNull();
  });

  it('returns null for dated files with other extensions', () => {
    expect(classifyProductReportFile('2026-07-01-product-trends.txt')).toBeNull();
  });

  it('throws for non-string input', () => {
    expect(() => classifyProductReportFile(42)).toThrow(TypeError);
  });
});

describe('mergeProductsSections', () => {
  const rawSection = [
    {
      date: '2026-07-01',
      analysisJson: 'products-analysis.json',
      otherFiles: ['sources-raw.json'],
    },
    { date: '2026-06-09', analysisJson: 'products-analysis.json', otherFiles: [] },
  ];

  it('attaches reportMd and reportHtml to matching raw dates', () => {
    const merged = mergeProductsSections(rawSection, [
      '2026-07-01-product-trends.md',
      '2026-07-01-product-trends.html',
    ]);
    expect(merged[0]).toEqual({
      date: '2026-07-01',
      analysisJson: 'products-analysis.json',
      otherFiles: ['sources-raw.json'],
      reportMd: '2026-07-01-product-trends.md',
      reportHtml: '2026-07-01-product-trends.html',
    });
  });

  it('leaves raw dates without reports unchanged (no report keys)', () => {
    const merged = mergeProductsSections(rawSection, ['2026-07-01-product-trends.md']);
    const older = merged.find((entry) => entry.date === '2026-06-09');
    expect(older).toEqual(rawSection[1]);
    expect('reportMd' in older).toBe(false);
    expect('reportHtml' in older).toBe(false);
  });

  it('creates an entry for a date present only in the report source', () => {
    const merged = mergeProductsSections(rawSection, ['2026-07-05-product-trends.md']);
    expect(merged.find((entry) => entry.date === '2026-07-05')).toEqual({
      date: '2026-07-05',
      analysisJson: null,
      otherFiles: [],
      reportMd: '2026-07-05-product-trends.md',
    });
  });

  it('keeps the merged section sorted descending by date', () => {
    const merged = mergeProductsSections(rawSection, [
      '2026-07-05-product-trends.md',
      '2026-06-10-product-trends.html',
    ]);
    expect(merged.map((entry) => entry.date)).toEqual([
      '2026-07-05',
      '2026-07-01',
      '2026-06-10',
      '2026-06-09',
    ]);
  });

  it('ignores unclassifiable report files', () => {
    const merged = mergeProductsSections(rawSection, [
      'build_html.py',
      '.DS_Store',
      'product-trends.md',
    ]);
    expect(merged).toEqual(rawSection);
  });

  it('does not mutate its inputs', () => {
    const rawCopy = rawSection.map((entry) => ({ ...entry, otherFiles: [...entry.otherFiles] }));
    const reportFiles = ['2026-07-01-product-trends.md'];
    mergeProductsSections(rawCopy, reportFiles);
    expect(rawCopy).toEqual(rawSection);
    expect(reportFiles).toEqual(['2026-07-01-product-trends.md']);
  });

  it('returns an empty array for empty inputs', () => {
    expect(mergeProductsSections([], [])).toEqual([]);
  });
});
