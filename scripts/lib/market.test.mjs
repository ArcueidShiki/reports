import { describe, expect, it } from 'vitest';
import { buildMarketSection, classifyMarketFile } from './market.mjs';

describe('classifyMarketFile', () => {
  it('classifies an English markdown report', () => {
    expect(
      classifyMarketFile('2026-06-04-tech-rotation-broadcom-miss-dow-decouples.md'),
    ).toEqual({
      date: '2026-06-04',
      lang: 'en',
      kind: 'md',
      title: 'tech rotation broadcom miss dow decouples',
    });
  });

  it('classifies a Chinese markdown report', () => {
    expect(classifyMarketFile('2026-06-05-提词器-深度解读.md')).toEqual({
      date: '2026-06-05',
      lang: 'zh',
      kind: 'md',
      title: '提词器 深度解读',
    });
  });

  it('classifies an html card', () => {
    expect(classifyMarketFile('2026-06-10-小红书卡片.html')).toEqual({
      date: '2026-06-10',
      lang: 'zh',
      kind: 'html',
      title: '小红书卡片',
    });
  });

  it('returns null for excluded extensions', () => {
    expect(classifyMarketFile('2026-06-05-ai-trade-unwind.srt')).toBeNull();
    expect(classifyMarketFile('2026-06-08-run-tts.sh')).toBeNull();
    expect(classifyMarketFile('.DS_Store')).toBeNull();
  });

  it('returns null for non-md/html extensions', () => {
    expect(classifyMarketFile('2026-06-10-notes.txt')).toBeNull();
  });

  it('returns null for names without a date prefix', () => {
    expect(classifyMarketFile('notes.md')).toBeNull();
  });
});

describe('buildMarketSection', () => {
  const fileNames = [
    '2026-06-04-tech-rotation-broadcom-miss-dow-decouples.md',
    '2026-06-04-美股日报-科技股杀跌道指独涨芯片板块重挫.md',
    '2026-06-05-ai-trade-unwind-trillion-dollar-wipeout.md',
    '2026-06-05-ai-trade-unwind-trillion-dollar-wipeout.srt',
    '2026-06-08-run-tts.sh',
    '2026-06-10-小红书卡片.html',
    '2026-06-10-通胀破4美伊冲突升级道指失守5万点.md',
    '.DS_Store',
  ];

  it('groups classified files by date, sorted descending', () => {
    const section = buildMarketSection(fileNames);
    expect(section.map((group) => group.date)).toEqual([
      '2026-06-10',
      '2026-06-05',
      '2026-06-04',
    ]);
  });

  it('excludes srt, sh, and junk files from items', () => {
    const section = buildMarketSection(fileNames);
    const allFiles = section.flatMap((group) => group.items.map((item) => item.file));
    expect(allFiles).not.toContain('2026-06-05-ai-trade-unwind-trillion-dollar-wipeout.srt');
    expect(allFiles).not.toContain('2026-06-08-run-tts.sh');
    expect(allFiles).not.toContain('.DS_Store');
  });

  it('includes file, lang, kind, and title on each item', () => {
    const section = buildMarketSection(fileNames);
    const june10 = section.find((group) => group.date === '2026-06-10');
    expect(june10.items).toContainEqual({
      file: '2026-06-10-小红书卡片.html',
      lang: 'zh',
      kind: 'html',
      title: '小红书卡片',
    });
  });

  it('returns an empty array for no classifiable files', () => {
    expect(buildMarketSection(['.DS_Store', 'notes.txt'])).toEqual([]);
  });

  it('does not mutate the input array', () => {
    const input = [...fileNames];
    buildMarketSection(input);
    expect(input).toEqual(fileNames);
  });
});
