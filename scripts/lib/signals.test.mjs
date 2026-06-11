import { describe, expect, it } from 'vitest';
import { buildSignalsSection } from './signals.mjs';

const JUNE_10 = {
  date: '2026-06-10',
  files: [
    'calendar_2026-06-10.json',
    'report_2026-06-10.pdf',
    'signals_2026-06-10.csv',
    'signals_2026-06-10.md',
    'xhs_post_2026-06-10.txt',
  ],
  sources: [
    'cpi_fred.png',
    'core_cpi_fred.png',
    'official_2026-06-10.json',
    'provenance_2026-06-10.md',
    '.DS_Store',
    '.gitkeep',
  ],
};

const JUNE_11 = {
  date: '2026-06-11',
  files: [
    'calendar_2026-06-11.json',
    'poster_2026-06-11_2.png',
    'poster_2026-06-11_1.png',
    'poster_2026-06-11_3.png',
    'report_2026-06-11.pdf',
    'signals_2026-06-11.csv',
    'signals_2026-06-11.md',
  ],
  sources: null,
};

describe('buildSignalsSection', () => {
  it('sorts entries descending by date', () => {
    const section = buildSignalsSection([JUNE_10, JUNE_11]);
    expect(section.map((entry) => entry.date)).toEqual(['2026-06-11', '2026-06-10']);
  });

  it('maps the core report files', () => {
    const [entry] = buildSignalsSection([JUNE_11]);
    expect(entry.pdf).toBe('report_2026-06-11.pdf');
    expect(entry.signalsMd).toBe('signals_2026-06-11.md');
    expect(entry.csv).toBe('signals_2026-06-11.csv');
    expect(entry.calendarJson).toBe('calendar_2026-06-11.json');
  });

  it('collects posters sorted, or an empty array when absent', () => {
    const section = buildSignalsSection([JUNE_10, JUNE_11]);
    expect(section[0].posters).toEqual([
      'poster_2026-06-11_1.png',
      'poster_2026-06-11_2.png',
      'poster_2026-06-11_3.png',
    ]);
    expect(section[1].posters).toEqual([]);
  });

  it('builds the sources object, skipping junk files', () => {
    const [entry] = buildSignalsSection([JUNE_10]);
    expect(entry.sources).toEqual({
      images: ['core_cpi_fred.png', 'cpi_fred.png'],
      provenanceMd: 'provenance_2026-06-10.md',
      officialJson: 'official_2026-06-10.json',
    });
  });

  it('sets sources to null when the sources dir is absent', () => {
    const [entry] = buildSignalsSection([JUNE_11]);
    expect(entry.sources).toBeNull();
  });

  it('sets missing core files to null', () => {
    const [entry] = buildSignalsSection([{ date: '2026-06-12', files: [], sources: null }]);
    expect(entry).toEqual({
      date: '2026-06-12',
      pdf: null,
      signalsMd: null,
      csv: null,
      calendarJson: null,
      posters: [],
      sources: null,
    });
  });

  it('does not mutate the input', () => {
    const input = [{ ...JUNE_11, files: [...JUNE_11.files] }];
    buildSignalsSection(input);
    expect(input[0].files).toEqual(JUNE_11.files);
  });
});
