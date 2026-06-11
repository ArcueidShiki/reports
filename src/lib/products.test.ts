import { describe, expect, it } from 'vitest';

import { parseProductsAnalysis } from './products';

const VALID_JSON = JSON.stringify({
  scrape_date: '2026-06-11',
  note: 'daily gather',
  products: [
    {
      name: 'Publora',
      category: 'Social publishing API',
      url: 'https://publora.com',
      ph: '#1 on 2026-06-10',
      business_model: 'Freemium SaaS',
      success_factors: ['MCP-native', 'Low entry price'],
    },
    { name: 'Bare Minimum Product' },
  ],
});

describe('parseProductsAnalysis', () => {
  it('parses a valid analysis document', () => {
    const result = parseProductsAnalysis(VALID_JSON);

    if (!result.ok) throw new Error(`expected ok, got: ${result.error}`);
    expect(result.value.products).toHaveLength(2);
    expect(result.value.products[0].name).toBe('Publora');
    expect(result.value.products[0].successFactors).toEqual([
      'MCP-native',
      'Low entry price',
    ]);
    expect(result.value.products[1]).toEqual({
      name: 'Bare Minimum Product',
      category: null,
      url: null,
      ph: null,
      businessModel: null,
      successFactors: [],
    });
  });

  it('fails on malformed JSON with a clear message', () => {
    const result = parseProductsAnalysis('{nope');

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error).toMatch(/JSON/i);
  });

  it('fails when products is missing or not an array', () => {
    const result = parseProductsAnalysis(JSON.stringify({ products: 'x' }));

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error).toMatch(/products.*array/i);
  });

  it('fails when a product has no string name', () => {
    const result = parseProductsAnalysis(
      JSON.stringify({ products: [{ url: 'https://x.test' }] }),
    );

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error).toMatch(/name/i);
  });
});
