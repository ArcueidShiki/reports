import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import PageHeader from '../components/PageHeader';
import { EmptyNote, ErrorNote, LoadingNote } from '../components/StatusNotes';
import { useManifest } from '../hooks/useManifest';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useLanguage } from '../i18n/LanguageContext';
import { contentUrl } from '../lib/contentUrl';
import { riseVariants, staggerVariants } from '../lib/motion';

const THUMB_STAGGER_S = 0.045;
const THUMB_RISE_PX = 18;
const LIGHTBOX_SPRING = { type: 'spring', stiffness: 280, damping: 26 } as const;
const OVERLAY_FADE_S = 0.2;

interface LightboxProps {
  readonly image: string;
  readonly reducedMotion: boolean;
  readonly onClose: () => void;
}

function Lightbox({ image, reducedMotion, onClose }: LightboxProps) {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={image}
      onClick={onClose}
      initial={{ opacity: reducedMotion ? 1 : 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: reducedMotion ? 1 : 0 }}
      transition={{ duration: reducedMotion ? 0 : OVERLAY_FADE_S }}
    >
      <motion.img
        className="lightbox-image"
        src={contentUrl('gallery', image)}
        alt={image}
        onClick={(event) => event.stopPropagation()}
        initial={
          reducedMotion ? { scale: 1, y: 0 } : { scale: 0.88, y: 24 }
        }
        animate={{ scale: 1, y: 0 }}
        exit={reducedMotion ? { scale: 1, y: 0 } : { scale: 0.94, y: 12 }}
        transition={reducedMotion ? { duration: 0 } : LIGHTBOX_SPRING}
      />
      <button
        type="button"
        className="lightbox-close"
        aria-label={t('gallery.close')}
        onClick={onClose}
      >
        ×
      </button>
    </motion.div>
  );
}

export default function GalleryPage() {
  const { t } = useLanguage();
  const { manifest, loading, error } = useManifest();
  const reducedMotion = usePrefersReducedMotion();
  const [openImage, setOpenImage] = useState<string | null>(null);

  const images = manifest?.sections.gallery.images ?? [];

  return (
    <main className="page gallery-page">
      <PageHeader
        index={6}
        kicker={t('page.kicker.gallery')}
        title={t('nav.gallery')}
      />

      {loading ? <LoadingNote /> : null}
      {error ? <ErrorNote detail={error} /> : null}
      {manifest && images.length === 0 ? <EmptyNote /> : null}

      {images.length > 0 ? (
        <motion.ul
          className="gallery-grid"
          variants={staggerVariants(reducedMotion, {
            staggerS: THUMB_STAGGER_S,
          })}
          initial="hidden"
          animate="visible"
        >
          {images.map((image) => (
            <motion.li
              key={image}
              variants={riseVariants(reducedMotion, {
                distancePx: THUMB_RISE_PX,
              })}
            >
              <button
                type="button"
                className="gallery-thumb"
                onClick={() => setOpenImage(image)}
              >
                <img
                  src={contentUrl('gallery', image)}
                  alt={image}
                  loading="lazy"
                />
              </button>
            </motion.li>
          ))}
        </motion.ul>
      ) : null}

      <AnimatePresence>
        {openImage ? (
          <Lightbox
            image={openImage}
            reducedMotion={reducedMotion}
            onClose={() => setOpenImage(null)}
          />
        ) : null}
      </AnimatePresence>
    </main>
  );
}
