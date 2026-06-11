import { describe, expect, it } from 'vitest';
import { buildGallerySection } from './gallery.mjs';

describe('buildGallerySection', () => {
  it('keeps only png files, sorted ascending', () => {
    const section = buildGallerySection([
      'yr_hero_concert_00001_.png',
      'ComfyUI_00002_.png',
      'ComfyUI_00001_.png',
      'notes.txt',
      '.DS_Store',
    ]);
    expect(section).toEqual({
      images: ['ComfyUI_00001_.png', 'ComfyUI_00002_.png', 'yr_hero_concert_00001_.png'],
    });
  });

  it('returns an empty images list for no files', () => {
    expect(buildGallerySection([])).toEqual({ images: [] });
  });

  it('does not mutate the input', () => {
    const input = ['b.png', 'a.png'];
    buildGallerySection(input);
    expect(input).toEqual(['b.png', 'a.png']);
  });
});
