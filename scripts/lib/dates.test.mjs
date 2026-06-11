import { describe, expect, it } from 'vitest';
import { parseDateFromName } from './dates.mjs';

describe('parseDateFromName', () => {
  it('extracts a YYYY-MM-DD prefix from a file name', () => {
    expect(
      parseDateFromName('2026-06-04-tech-rotation-broadcom-miss-dow-decouples.md'),
    ).toBe('2026-06-04');
  });

  it('extracts the date when the name is exactly a date (directory name)', () => {
    expect(parseDateFromName('2026-06-10')).toBe('2026-06-10');
  });

  it('handles Chinese slugs after the date prefix', () => {
    expect(parseDateFromName('2026-06-10-小红书卡片.html')).toBe('2026-06-10');
  });

  it('returns null when the date is not a prefix', () => {
    expect(parseDateFromName('signals_2026-06-10.md')).toBeNull();
  });

  it('returns null for names without any date', () => {
    expect(parseDateFromName('README.md')).toBeNull();
  });

  it('returns null for the empty string', () => {
    expect(parseDateFromName('')).toBeNull();
  });

  it('returns null for implausible month or day values', () => {
    expect(parseDateFromName('2026-13-01-bad-month.md')).toBeNull();
    expect(parseDateFromName('2026-06-32-bad-day.md')).toBeNull();
    expect(parseDateFromName('2026-00-10-bad-month.md')).toBeNull();
  });

  it('throws a TypeError for non-string input', () => {
    expect(() => parseDateFromName(null)).toThrow(TypeError);
    expect(() => parseDateFromName(42)).toThrow(TypeError);
  });
});
