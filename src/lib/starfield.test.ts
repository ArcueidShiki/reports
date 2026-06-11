import { BufferGeometry } from 'three';
import { describe, expect, it } from 'vitest';

import { createStarGeometry, STAR_COUNT, STAR_FIELD_RADIUS } from './starfield';

describe('createStarGeometry', () => {
  it('creates a buffer geometry with one 3D position per star', () => {
    const geometry = createStarGeometry(STAR_COUNT);

    expect(geometry).toBeInstanceOf(BufferGeometry);

    const position = geometry.getAttribute('position');
    expect(position.count).toBe(STAR_COUNT);
    expect(position.itemSize).toBe(3);
  });

  it('places every star inside the field radius', () => {
    const geometry = createStarGeometry(200);
    const position = geometry.getAttribute('position');

    for (let i = 0; i < position.count; i += 1) {
      const distance = Math.hypot(
        position.getX(i),
        position.getY(i),
        position.getZ(i),
      );
      expect(distance).toBeLessThanOrEqual(STAR_FIELD_RADIUS);
    }
  });

  it('returns a fresh geometry on every call', () => {
    const first = createStarGeometry(10);
    const second = createStarGeometry(10);

    expect(first).not.toBe(second);
    expect(first.getAttribute('position')).not.toBe(
      second.getAttribute('position'),
    );
  });

  it('rejects non-positive or fractional star counts', () => {
    expect(() => createStarGeometry(0)).toThrow(RangeError);
    expect(() => createStarGeometry(-5)).toThrow(RangeError);
    expect(() => createStarGeometry(1.5)).toThrow(RangeError);
  });
});
