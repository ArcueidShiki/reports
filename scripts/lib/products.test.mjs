import { describe, expect, it } from 'vitest';
import { buildProductsSection } from './products.mjs';

describe('buildProductsSection', () => {
  const dateDirs = [
    { date: '2026-06-09', files: ['products-analysis.json', 'sources-raw.json'] },
    {
      date: '2026-06-11',
      files: ['products-analysis.json', 'raw-data.json', 'sources-raw.json'],
    },
  ];

  it('sorts entries descending by date', () => {
    const section = buildProductsSection(dateDirs);
    expect(section.map((entry) => entry.date)).toEqual(['2026-06-11', '2026-06-09']);
  });

  it('separates the analysis json from other files', () => {
    const section = buildProductsSection(dateDirs);
    expect(section[0]).toEqual({
      date: '2026-06-11',
      analysisJson: 'products-analysis.json',
      otherFiles: ['raw-data.json', 'sources-raw.json'],
    });
  });

  it('sets analysisJson to null when missing', () => {
    const section = buildProductsSection([{ date: '2026-06-09', files: ['sources-raw.json'] }]);
    expect(section[0].analysisJson).toBeNull();
    expect(section[0].otherFiles).toEqual(['sources-raw.json']);
  });

  it('filters junk files out of otherFiles', () => {
    const section = buildProductsSection([
      { date: '2026-06-09', files: ['.DS_Store', 'products-analysis.json'] },
    ]);
    expect(section[0].otherFiles).toEqual([]);
  });

  it('returns an empty array for no date dirs', () => {
    expect(buildProductsSection([])).toEqual([]);
  });

  it('does not mutate the input', () => {
    const input = dateDirs.map((entry) => ({ ...entry, files: [...entry.files] }));
    buildProductsSection(input);
    expect(input).toEqual(dateDirs);
  });
});
