import { describe, expect, it } from 'vitest';
import {
  SESSION_TITLES,
  classifyMarketAgentFile,
  mergeMarketAgentItems,
} from './marketAgent.mjs';

describe('SESSION_TITLES', () => {
  it('maps every session to a human-readable title', () => {
    expect(SESSION_TITLES).toEqual({
      premarket: 'Pre-Market',
      'in-market': 'In-Market',
      'close-market': 'Close',
      'post-market': 'Post-Market',
    });
  });
});

describe('classifyMarketAgentFile', () => {
  it('classifies each session markdown report', () => {
    expect(classifyMarketAgentFile('2026-07-01-premarket.md')).toEqual({
      date: '2026-07-01',
      session: 'premarket',
    });
    expect(classifyMarketAgentFile('2026-07-01-in-market.md')).toEqual({
      date: '2026-07-01',
      session: 'in-market',
    });
    expect(classifyMarketAgentFile('2026-07-01-close-market.md')).toEqual({
      date: '2026-07-01',
      session: 'close-market',
    });
    expect(classifyMarketAgentFile('2026-07-01-post-market.md')).toEqual({
      date: '2026-07-01',
      session: 'post-market',
    });
  });

  it('returns null for the raw json twins and index.json', () => {
    expect(classifyMarketAgentFile('2026-07-01-premarket.json')).toBeNull();
    expect(classifyMarketAgentFile('index.json')).toBeNull();
  });

  it('returns null for dotfiles', () => {
    expect(classifyMarketAgentFile('.write_probe')).toBeNull();
    expect(classifyMarketAgentFile('.writetest')).toBeNull();
    expect(classifyMarketAgentFile('.DS_Store')).toBeNull();
  });

  it('returns null for names without a date prefix', () => {
    expect(classifyMarketAgentFile('premarket.md')).toBeNull();
  });

  it('returns null for dated md files with an unknown session', () => {
    expect(classifyMarketAgentFile('2026-07-01-overnight.md')).toBeNull();
  });

  it('throws for non-string input', () => {
    expect(() => classifyMarketAgentFile(undefined)).toThrow(TypeError);
  });
});

describe('mergeMarketAgentItems', () => {
  const dailySection = [
    {
      date: '2026-07-01',
      items: [
        {
          file: '2026-07-01-fed-pause.md',
          lang: 'en',
          kind: 'md',
          title: 'fed pause',
        },
      ],
    },
    {
      date: '2026-06-30',
      items: [
        {
          file: '2026-06-30-小红书卡片.html',
          lang: 'zh',
          kind: 'html',
          title: '小红书卡片',
        },
      ],
    },
  ];

  it('merges session items into the matching date entry', () => {
    const merged = mergeMarketAgentItems(dailySection, ['2026-07-01-premarket.md']);
    const july1 = merged.find((group) => group.date === '2026-07-01');
    expect(july1.items).toContainEqual({
      file: '2026-07-01-premarket.md',
      lang: 'en',
      kind: 'md',
      title: 'Pre-Market',
      session: 'premarket',
    });
    expect(july1.items).toContainEqual(dailySection[0].items[0]);
  });

  it('creates a new date entry when only session reports exist for it', () => {
    const merged = mergeMarketAgentItems(dailySection, ['2026-07-02-post-market.md']);
    expect(merged.map((group) => group.date)).toEqual([
      '2026-07-02',
      '2026-07-01',
      '2026-06-30',
    ]);
    expect(merged[0].items).toEqual([
      {
        file: '2026-07-02-post-market.md',
        lang: 'en',
        kind: 'md',
        title: 'Post-Market',
        session: 'post-market',
      },
    ]);
  });

  it('sorts items within a date by file name', () => {
    const merged = mergeMarketAgentItems(dailySection, [
      '2026-07-01-premarket.md',
      '2026-07-01-close-market.md',
    ]);
    const files = merged.find((group) => group.date === '2026-07-01').items.map((i) => i.file);
    expect(files).toEqual([
      '2026-07-01-close-market.md',
      '2026-07-01-fed-pause.md',
      '2026-07-01-premarket.md',
    ]);
  });

  it('ignores unclassifiable files', () => {
    const merged = mergeMarketAgentItems(dailySection, [
      'index.json',
      '.write_probe',
      '2026-07-01-premarket.json',
    ]);
    expect(merged).toEqual(dailySection);
  });

  it('does not mutate its inputs', () => {
    const sectionCopy = dailySection.map((group) => ({
      ...group,
      items: group.items.map((item) => ({ ...item })),
    }));
    mergeMarketAgentItems(sectionCopy, ['2026-07-01-premarket.md']);
    expect(sectionCopy).toEqual(dailySection);
  });

  it('returns an empty array for empty inputs', () => {
    expect(mergeMarketAgentItems([], [])).toEqual([]);
  });
});
