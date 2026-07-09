import { useLanguage } from '../i18n/LanguageContext';

interface PdfFrameProps {
  readonly src: string;
  readonly title: string;
}

/**
 * Un-sandboxed <object> embed for PDF reports. PDFs must NOT go through
 * the sandboxed ContentFrame: sandboxing disables plugins, and Chromium's
 * built-in PDF viewer is plugin-gated, so a sandboxed embed renders blank.
 */
export default function PdfFrame({ src, title }: PdfFrameProps) {
  const { t } = useLanguage();

  return (
    <object
      className="content-frame content-frame--pdf"
      data={src}
      type="application/pdf"
      title={title}
    >
      <p className="pdf-fallback">
        {t('pdf.fallback')}{' '}
        <a href={src} target="_blank" rel="noopener noreferrer">
          {t('pdf.open')}
        </a>
      </p>
    </object>
  );
}
