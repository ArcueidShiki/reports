import { describe, expect, it } from 'vitest';

import { CONTENT_BASE, contentUrl } from './contentUrl';

describe('contentUrl', () => {
  it('exposes the content base path', () => {
    expect(CONTENT_BASE).toBe('/content');
  });

  it('joins plain ASCII segments under /content', () => {
    expect(contentUrl('products', '2026-06-11', 'products-analysis.json')).toBe(
      '/content/products/2026-06-11/products-analysis.json',
    );
  });

  it('percent-encodes Chinese filenames per segment', () => {
    expect(contentUrl('market', '2026-06-10', '2026-06-10-小红书卡片.html')).toBe(
      '/content/market/2026-06-10/2026-06-10-%E5%B0%8F%E7%BA%A2%E4%B9%A6%E5%8D%A1%E7%89%87.html',
    );
  });

  it('encodes reserved URL characters inside a segment', () => {
    expect(contentUrl('signals', 'a b#c?.md')).toBe(
      '/content/signals/a%20b%23c%3F.md',
    );
  });

  it('throws when called with no segments', () => {
    expect(() => contentUrl()).toThrow(/at least one path segment/i);
  });

  it('throws on an empty segment', () => {
    expect(() => contentUrl('market', '')).toThrow(/empty/i);
  });

  it('throws when a segment contains a slash', () => {
    expect(() => contentUrl('market/2026-06-10')).toThrow(/slash/i);
  });
});
