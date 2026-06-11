import { describe, expect, it } from 'vitest';
import { detectLang } from './lang.mjs';

describe('detectLang', () => {
  it('returns zh when the name contains CJK characters', () => {
    expect(detectLang('2026-06-04-美股日报-科技股杀跌道指独涨芯片板块重挫.md')).toBe('zh');
  });

  it('returns zh for mixed ASCII and CJK names', () => {
    expect(detectLang('2026-06-10-小红书卡片.html')).toBe('zh');
  });

  it('returns en for pure ASCII names', () => {
    expect(detectLang('2026-06-04-tech-rotation-broadcom-miss-dow-decouples.md')).toBe('en');
  });

  it('returns en for the empty string', () => {
    expect(detectLang('')).toBe('en');
  });

  it('throws a TypeError for non-string input', () => {
    expect(() => detectLang(undefined)).toThrow(TypeError);
    expect(() => detectLang(123)).toThrow(TypeError);
  });
});
