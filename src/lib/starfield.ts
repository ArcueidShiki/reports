import { BufferAttribute, BufferGeometry } from 'three';

export const STAR_COUNT = 2000;
export const STAR_FIELD_RADIUS = 4;
/** Radians per second for the slow ambient rotation of the starfield. */
export const STAR_ROTATION_SPEED = 0.02;

const COMPONENTS_PER_POSITION = 3;

/**
 * Builds a point-cloud geometry with `count` stars distributed uniformly
 * inside a sphere of STAR_FIELD_RADIUS.
 */
export function createStarGeometry(count: number): BufferGeometry {
  if (!Number.isInteger(count) || count <= 0) {
    throw new RangeError(
      `Star count must be a positive integer, received: ${count}`,
    );
  }

  const positions = new Float32Array(count * COMPONENTS_PER_POSITION);

  for (let i = 0; i < count; i += 1) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    // cbrt keeps the volumetric distribution uniform instead of clumping
    // points at the centre.
    const radius = STAR_FIELD_RADIUS * Math.cbrt(Math.random());

    const offset = i * COMPONENTS_PER_POSITION;
    positions[offset] = radius * Math.sin(phi) * Math.cos(theta);
    positions[offset + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[offset + 2] = radius * Math.cos(phi);
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute(
    'position',
    new BufferAttribute(positions, COMPONENTS_PER_POSITION),
  );

  return geometry;
}
