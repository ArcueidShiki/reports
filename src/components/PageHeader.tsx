import { motion } from 'framer-motion';

import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { riseVariants, staggerVariants } from '../lib/motion';

const KICKER_RISE_PX = 14;
const TITLE_RISE_PX = 30;
const HEADER_STAGGER_S = 0.1;

interface PageHeaderProps {
  /** 1-based position of the section in the site index. */
  readonly index: number;
  /** Short editorial label rendered above the title, e.g. "Daily Briefing". */
  readonly kicker: string;
  readonly title: string;
}

/** Zero-pads a 1-based section index for the ledger-style kicker, e.g. "02". */
export function formatSectionIndex(index: number): string {
  if (!Number.isInteger(index) || index <= 0) {
    throw new RangeError(
      `Section index must be a positive integer, received: ${index}`,
    );
  }

  return String(index).padStart(2, '0');
}

/**
 * Editorial page masthead: mono kicker with the section number, an
 * oversized serif title, and a hairline rule that draws itself in.
 */
export default function PageHeader({ index, kicker, title }: PageHeaderProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.header
      className="page-header"
      variants={staggerVariants(reducedMotion, { staggerS: HEADER_STAGGER_S })}
      initial="hidden"
      animate="visible"
    >
      <motion.p
        className="page-kicker"
        variants={riseVariants(reducedMotion, { distancePx: KICKER_RISE_PX })}
      >
        <span className="page-kicker-no">{formatSectionIndex(index)}</span>
        <span className="page-kicker-sep" aria-hidden="true">
          /
        </span>
        {kicker}
      </motion.p>
      <motion.h1
        className="page-title"
        variants={riseVariants(reducedMotion, { distancePx: TITLE_RISE_PX })}
      >
        {title}
      </motion.h1>
      <motion.div
        className="page-rule"
        aria-hidden="true"
        variants={riseVariants(reducedMotion, { distancePx: 0 })}
      />
    </motion.header>
  );
}
