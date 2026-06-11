/**
 * Defensive parsing for products/<date>/products-analysis.json.
 * Returns a discriminated result instead of throwing across the
 * page boundary, so callers handle bad data explicitly.
 */

export interface Product {
  readonly name: string;
  readonly category: string | null;
  readonly url: string | null;
  readonly ph: string | null;
  readonly businessModel: string | null;
  readonly successFactors: readonly string[];
}

export interface ProductsAnalysis {
  readonly scrapeDate: string | null;
  readonly note: string | null;
  readonly products: readonly Product[];
}

export type ProductsParseResult =
  | { readonly ok: true; readonly value: ProductsAnalysis }
  | { readonly ok: false; readonly error: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function optionalString(value: unknown): string | null {
  return typeof value === 'string' && value !== '' ? value : null;
}

function stringList(value: unknown): readonly string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string');
}

function toProduct(raw: unknown, index: number): Product {
  if (!isRecord(raw)) {
    throw new Error(`products[${index}] is not an object`);
  }
  if (typeof raw.name !== 'string' || raw.name === '') {
    throw new Error(`products[${index}] is missing a string "name"`);
  }

  return {
    name: raw.name,
    category: optionalString(raw.category),
    url: optionalString(raw.url),
    ph: optionalString(raw.ph),
    businessModel: optionalString(raw.business_model),
    successFactors: stringList(raw.success_factors),
  };
}

export function parseProductsAnalysis(text: string): ProductsParseResult {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    return { ok: false, error: `products-analysis: invalid JSON (${detail})` };
  }

  if (!isRecord(data) || !Array.isArray(data.products)) {
    return {
      ok: false,
      error: 'products-analysis: "products" must be an array',
    };
  }

  try {
    const products = data.products.map(toProduct);
    return {
      ok: true,
      value: {
        scrapeDate: optionalString(data.scrape_date),
        note: optionalString(data.note),
        products,
      },
    };
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    return { ok: false, error: `products-analysis: ${detail}` };
  }
}
