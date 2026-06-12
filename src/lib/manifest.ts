/**
 * Types and defensive validation for /content/manifest.json,
 * the index produced by scripts/ingest.mjs.
 */

export interface ProductsEntry {
  readonly date: string;
  /** null when the source day has raw data but no analysis yet. */
  readonly analysisJson: string | null;
  readonly otherFiles: readonly string[];
}

export interface MarketItem {
  readonly file: string;
  readonly lang: string;
  readonly kind: string;
  readonly title: string;
}

export interface MarketEntry {
  readonly date: string;
  readonly items: readonly MarketItem[];
}

export interface AlphaDoc {
  readonly id: string;
  readonly title: string;
  readonly file: string;
}

export interface SignalsSources {
  readonly images: readonly string[];
  readonly provenanceMd: string | null;
  readonly officialJson: string | null;
}

export interface SignalsEntry {
  readonly date: string;
  readonly pdf: string;
  readonly signalsMd: string;
  readonly csv: string;
  readonly calendarJson: string;
  readonly posters: readonly string[];
  readonly sources: SignalsSources | null;
}

export interface GallerySection {
  readonly images: readonly string[];
}

export interface WisdomDoc {
  readonly id: string;
  readonly title: string;
  readonly file: string;
}

export interface ManifestSections {
  readonly products: readonly ProductsEntry[];
  readonly market: readonly MarketEntry[];
  readonly alpha: readonly AlphaDoc[];
  readonly signals: readonly SignalsEntry[];
  readonly gallery: GallerySection;
  readonly wisdom: readonly WisdomDoc[];
}

export interface Manifest {
  readonly generatedAt: string;
  readonly sections: ManifestSections;
}

const LIST_SECTIONS = ['products', 'market', 'alpha', 'signals'] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Validates the raw manifest JSON. Throws an Error with a clear message
 * when the shape is wrong instead of letting pages crash on bad data.
 */
export function validateManifest(data: unknown): Manifest {
  if (!isRecord(data)) {
    throw new Error('manifest: expected an object at the top level');
  }

  const sections = data.sections;
  if (!isRecord(sections)) {
    throw new Error('manifest: missing "sections" object');
  }

  for (const key of LIST_SECTIONS) {
    if (!Array.isArray(sections[key])) {
      throw new Error(`manifest: sections.${key} must be an array`);
    }
  }

  const gallery = sections.gallery;
  if (!isRecord(gallery) || !Array.isArray(gallery.images)) {
    throw new Error('manifest: sections.gallery.images must be an array');
  }

  // Older cached manifests predate the wisdom section: default it to an
  // empty list instead of hard-failing, but reject malformed values.
  const wisdom = sections.wisdom;
  if (wisdom !== undefined && !Array.isArray(wisdom)) {
    throw new Error('manifest: sections.wisdom must be an array when present');
  }

  const base = data as unknown as Manifest;
  return {
    ...base,
    sections: {
      ...base.sections,
      wisdom: (wisdom ?? []) as readonly WisdomDoc[],
    },
  };
}
