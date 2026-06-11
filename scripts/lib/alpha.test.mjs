import { describe, expect, it } from 'vitest';
import { ALPHA_SOURCES, buildAlphaSection } from './alpha.mjs';

const ALL_FILES = [
  'README.md',
  'technical-factors.md',
  'value-factors.md',
  'sentiment-factors.md',
];

describe('ALPHA_SOURCES', () => {
  it('declares the four fixed alpha documents with source paths', () => {
    expect(ALPHA_SOURCES.map((entry) => entry.id)).toEqual([
      'readme',
      'technical',
      'value',
      'sentiment',
    ]);
    expect(ALPHA_SOURCES.map((entry) => entry.sourcePath)).toEqual([
      'README.md',
      'technical/technical-factors.md',
      'fundamental/value-factors.md',
      'sentiment/sentiment-factors.md',
    ]);
  });
});

describe('buildAlphaSection', () => {
  it('returns the fixed list when all files are available', () => {
    expect(buildAlphaSection(ALL_FILES)).toEqual([
      { id: 'readme', title: 'Alpha Factors Overview', file: 'README.md' },
      { id: 'technical', title: 'Technical Factors', file: 'technical-factors.md' },
      { id: 'value', title: 'Value Factors', file: 'value-factors.md' },
      { id: 'sentiment', title: 'Sentiment Factors', file: 'sentiment-factors.md' },
    ]);
  });

  it('omits entries whose file is not available', () => {
    const section = buildAlphaSection(['README.md', 'value-factors.md']);
    expect(section.map((entry) => entry.id)).toEqual(['readme', 'value']);
  });

  it('returns an empty array when nothing is available', () => {
    expect(buildAlphaSection([])).toEqual([]);
  });

  it('does not mutate the input', () => {
    const input = [...ALL_FILES];
    buildAlphaSection(input);
    expect(input).toEqual(ALL_FILES);
  });
});
