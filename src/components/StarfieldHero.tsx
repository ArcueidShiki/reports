import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { PointsMaterial, type Points } from 'three';

import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import {
  createStarGeometry,
  STAR_COUNT,
  STAR_ROTATION_SPEED,
} from '../lib/starfield';

const STAR_COLOR = '#9ecbff';
const STAR_SIZE = 0.025;
const STAR_OPACITY = 0.8;
const CAMERA_POSITION: [number, number, number] = [0, 0, 2.5];
const CAMERA_FOV = 60;

function Starfield() {
  const pointsRef = useRef<Points>(null);

  const geometry = useMemo(() => createStarGeometry(STAR_COUNT), []);
  const material = useMemo(
    () =>
      new PointsMaterial({
        color: STAR_COLOR,
        size: STAR_SIZE,
        sizeAttenuation: true,
        transparent: true,
        opacity: STAR_OPACITY,
        depthWrite: false,
      }),
    [],
  );

  // Free the GPU resources when the hero unmounts.
  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame((_, delta) => {
    const points = pointsRef.current;
    if (points) {
      points.rotation.y += delta * STAR_ROTATION_SPEED;
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

/**
 * Decorative slowly rotating particle starfield rendered behind the hero.
 * Skipped entirely when the user prefers reduced motion.
 */
export default function StarfieldHero() {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className="starfield-hero" aria-hidden="true" data-testid="starfield-hero">
      <Canvas
        camera={{ position: CAMERA_POSITION, fov: CAMERA_FOV }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'low-power', alpha: true }}
      >
        <Starfield />
      </Canvas>
    </div>
  );
}
