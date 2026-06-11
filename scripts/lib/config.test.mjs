import { describe, expect, it } from 'vitest';
import { validateIngestConfig } from './config.mjs';

const VALID_CONFIG = {
  products: '/abs/product-analytics/raw',
  market: '/abs/stay-in-the-market/daily-reports/2026',
  alpha: '/abs/stay-in-the-market/alpha-factors',
  signals: '/abs/signal-calendar/reports',
  gallery: '/abs/comfyui/output',
  outputDir: 'public/content',
};

describe('validateIngestConfig', () => {
  it('accepts a complete config and returns a frozen copy', () => {
    const result = validateIngestConfig(VALID_CONFIG);
    expect(result).toEqual(VALID_CONFIG);
    expect(result).not.toBe(VALID_CONFIG);
    expect(Object.isFrozen(result)).toBe(true);
  });

  it('throws a clear error naming the missing key', () => {
    const { signals: _omitted, ...incomplete } = VALID_CONFIG;
    expect(() => validateIngestConfig(incomplete)).toThrow(/signals/);
  });

  it('throws when a value is not a non-empty string', () => {
    expect(() => validateIngestConfig({ ...VALID_CONFIG, gallery: '' })).toThrow(/gallery/);
    expect(() => validateIngestConfig({ ...VALID_CONFIG, market: 42 })).toThrow(/market/);
  });

  it('throws for non-object input', () => {
    expect(() => validateIngestConfig(null)).toThrow(/object/i);
    expect(() => validateIngestConfig('nope')).toThrow(/object/i);
  });
});
