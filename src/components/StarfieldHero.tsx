import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { PointsMaterial, type Points } from 'three';

import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { createStarGeometry, STAR_COUNT } from '../lib/starfield';

const CAMERA_POSITION: [number, number, number] = [0, 0, 2.5];
const CAMERA_FOV = 60;

/** Two depths of night sky: champagne dust and a sparser bullion layer. */
interface StarLayer {
  readonly count: number;
  readonly color: string;
  readonly size: number;
  readonly opacity: number;
  /** Radians per second around Y; sign flips layer direction. */
  readonly rotationSpeed: number;
  /** Amplitude of the slow vertical breathing drift, in radians. */
  readonly driftAmplitude: number;
}

const STAR_LAYERS: readonly StarLayer[] = [
  {
    count: STAR_COUNT,
    color: '#e8d2a0',
    size: 0.022,
    opacity: 0.7,
    rotationSpeed: 0.016,
    driftAmplitude: 0.03,
  },
  {
    count: Math.round(STAR_COUNT / 5),
    color: '#d8a548',
    size: 0.042,
    opacity: 0.5,
    rotationSpeed: -0.009,
    driftAmplitude: 0.05,
  },
];

const DRIFT_FREQUENCY = 0.12;

function Starfield({ layer }: { readonly layer: StarLayer }) {
  const pointsRef = useRef<Points>(null);

  const geometry = useMemo(() => createStarGeometry(layer.count), [layer]);
  const material = useMemo(
    () =>
      new PointsMaterial({
        color: layer.color,
        size: layer.size,
        sizeAttenuation: true,
        transparent: true,
        opacity: layer.opacity,
        depthWrite: false,
      }),
    [layer],
  );

  // Free the GPU resources when the hero unmounts.
  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame(({ clock }, delta) => {
    const points = pointsRef.current;
    if (points) {
      points.rotation.y += delta * layer.rotationSpeed;
      points.rotation.x =
        Math.sin(clock.elapsedTime * DRIFT_FREQUENCY) * layer.driftAmplitude;
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

/**
 * Decorative drifting two-layer particle field behind the hero: warm
 * champagne dust plus sparse gold motes counter-rotating beneath it.
 * Skipped entirely when the user prefers reduced motion.
 */
export default function StarfieldHero() {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      className="starfield-hero"
      aria-hidden="true"
      data-testid="starfield-hero"
    >
      <Canvas
        camera={{ position: CAMERA_POSITION, fov: CAMERA_FOV }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'low-power', alpha: true }}
      >
        {STAR_LAYERS.map((layer) => (
          <Starfield key={layer.color} layer={layer} />
        ))}
      </Canvas>
    </div>
  );
}
