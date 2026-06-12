import { describe, expect, it } from 'vitest';
import { buildWisdomSection } from './wisdom.mjs';

describe('buildWisdomSection', () => {
  it('builds one entry per markdown file with slug id and de-dashed title', () => {
    expect(buildWisdomSection(['investing-wisdom.md'])).toEqual([
      {
        id: 'investing-wisdom',
        title: 'Investing Wisdom',
        file: 'investing-wisdom.md',
      },
    ]);
  });

  it('keeps only .md files and ignores junk files', () => {
    const section = buildWisdomSection([
      'notes.txt',
      '.DS_Store',
      'trading-rules.md',
      'cover.png',
    ]);
    expect(section).toEqual([
      { id: 'trading-rules', title: 'Trading Rules', file: 'trading-rules.md' },
    ]);
  });

  it('sorts entries by file name ascending', () => {
    const section = buildWisdomSection(['b-second.md', 'a-first.md']);
    expect(section.map((entry) => entry.id)).toEqual(['a-first', 'b-second']);
  });

  it('returns an empty array for no files', () => {
    expect(buildWisdomSection([])).toEqual([]);
  });

  it('does not mutate the input', () => {
    const input = ['z.md', 'a.md'];
    buildWisdomSection(input);
    expect(input).toEqual(['z.md', 'a.md']);
  });
});
