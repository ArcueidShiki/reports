import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { riseVariants } from '../lib/motion';

const VIEWPORT_MARGIN = '0px 0px -48px 0px';

interface RevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delayS?: number;
}

/**
 * Scroll-triggered fade-and-rise wrapper. Content reveals once when it
 * enters the viewport; under reduced motion it renders statically.
 */
export default function Reveal({ children, className, delayS }: RevealProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      variants={riseVariants(reducedMotion, { delayS })}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: VIEWPORT_MARGIN }}
    >
      {children}
    </motion.div>
  );
}
