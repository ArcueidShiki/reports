import { useLanguage } from '../i18n/LanguageContext';

const SKELETON_LINE_COUNT = 3;

/**
 * Localized loading indicator shared by all content pages: shimmering
 * skeleton lines with the loading text kept for screen readers.
 */
export function LoadingNote() {
  const { t } = useLanguage();

  return (
    <div role="status" className="status-note skeleton">
      <span className="visually-hidden">{t('common.loading')}</span>
      {Array.from({ length: SKELETON_LINE_COUNT }, (_, line) => (
        <span key={line} className="skeleton-line" aria-hidden="true" />
      ))}
    </div>
  );
}

interface ErrorNoteProps {
  readonly detail?: string;
}

/** Localized friendly error message with optional technical detail. */
export function ErrorNote({ detail }: ErrorNoteProps) {
  const { t } = useLanguage();

  return (
    <p role="alert" className="status-note status-note-error">
      {t('common.error')}
      {detail ? <span className="status-note-detail"> {detail}</span> : null}
    </p>
  );
}

/** Localized empty-state message for sections without content. */
export function EmptyNote() {
  const { t } = useLanguage();

  return <p className="status-note">{t('common.empty')}</p>;
}
