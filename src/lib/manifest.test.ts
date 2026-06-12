import { describe, expect, it } from 'vitest';

import { validateManifest } from './manifest';

function validManifest(): unknown {
  return {
    generatedAt: '2026-06-11T00:00:00.000Z',
    sections: {
      products: [
        { date: '2026-06-11', analysisJson: 'products-analysis.json', otherFiles: [] },
      ],
      market: [
        {
          date: '2026-06-10',
          items: [{ file: 'a.md', lang: 'en', kind: 'md', title: 'a' }],
        },
      ],
      alpha: [{ id: 'readme', title: 'Overview', file: 'README.md' }],
      signals: [
        {
          date: '2026-06-11',
          pdf: 'report_2026-06-11.pdf',
          signalsMd: 'signals_2026-06-11.md',
          csv: 'signals_2026-06-11.csv',
          calendarJson: 'calendar_2026-06-11.json',
          posters: [],
          sources: null,
        },
      ],
      gallery: { images: ['a.png'] },
      wisdom: [
        { id: 'investing-wisdom', title: 'Investing Wisdom', file: 'investing-wisdom.md' },
      ],
    },
  };
}

describe('validateManifest', () => {
  it('accepts a well-formed manifest and returns it typed', () => {
    const manifest = validateManifest(validManifest());

    expect(manifest.sections.products[0].date).toBe('2026-06-11');
    expect(manifest.sections.gallery.images).toEqual(['a.png']);
    expect(manifest.sections.wisdom).toEqual([
      { id: 'investing-wisdom', title: 'Investing Wisdom', file: 'investing-wisdom.md' },
    ]);
  });

  it('defaults sections.wisdom to an empty list when missing (older manifests)', () => {
    const data = validManifest() as { sections: Record<string, unknown> };
    const { wisdom: _omitted, ...older } = data.sections;

    const manifest = validateManifest({ ...data, sections: older });

    expect(manifest.sections.wisdom).toEqual([]);
  });

  it('rejects when sections.wisdom is present but not an array', () => {
    const data = validManifest() as { sections: Record<string, unknown> };
    const broken = {
      ...data,
      sections: { ...data.sections, wisdom: 'not-an-array' },
    };

    expect(() => validateManifest(broken)).toThrow(/wisdom.*array/i);
  });

  it('rejects non-object input', () => {
    expect(() => validateManifest(null)).toThrow(/expected an object/i);
    expect(() => validateManifest('nope')).toThrow(/expected an object/i);
  });

  it('rejects a manifest without a sections object', () => {
    expect(() => validateManifest({ generatedAt: 'x' })).toThrow(/sections/i);
  });

  it('rejects when a list section is not an array', () => {
    const data = validManifest() as { sections: Record<string, unknown> };
    const broken = {
      ...data,
      sections: { ...data.sections, market: 'not-an-array' },
    };

    expect(() => validateManifest(broken)).toThrow(/market.*array/i);
  });

  it('rejects when gallery.images is not an array', () => {
    const data = validManifest() as { sections: Record<string, unknown> };
    const broken = {
      ...data,
      sections: { ...data.sections, gallery: { images: 'nope' } },
    };

    expect(() => validateManifest(broken)).toThrow(/gallery\.images.*array/i);
  });
});
