import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { EmptyNote, ErrorNote, LoadingNote } from '../components/StatusNotes';
import { useManifest } from '../hooks/useManifest';
import { useLanguage } from '../i18n/LanguageContext';
import { contentUrl } from '../lib/contentUrl';

const GRID_VARIANTS = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
} as const;

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
} as const;

interface LightboxProps {
  readonly image: string;
  readonly onClose: () => void;
}

function Lightbox({ image, onClose }: LightboxProps) {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={image}
      onClick={onClose}
    >
      <img
        className="lightbox-image"
        src={contentUrl('gallery', image)}
        alt={image}
        onClick={(event) => event.stopPropagation()}
      />
      <button
        type="button"
        className="lightbox-close"
        aria-label={t('gallery.close')}
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
}

export default function GalleryPage() {
  const { t } = useLanguage();
  const { manifest, loading, error } = useManifest();
  const [openImage, setOpenImage] = useState<string | null>(null);

  const images = manifest?.sections.gallery.images ?? [];

  return (
    <main className="page gallery-page">
      <h1>{t('nav.gallery')}</h1>

      {loading ? <LoadingNote /> : null}
      {error ? <ErrorNote detail={error} /> : null}
      {manifest && images.length === 0 ? <EmptyNote /> : null}

      {images.length > 0 ? (
        <motion.ul
          className="gallery-grid"
          variants={GRID_VARIANTS}
          initial="hidden"
          animate="show"
        >
          {images.map((image) => (
            <motion.li key={image} variants={ITEM_VARIANTS}>
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

      {openImage ? (
        <Lightbox image={openImage} onClose={() => setOpenImage(null)} />
      ) : null}
    </main>
  );
}
