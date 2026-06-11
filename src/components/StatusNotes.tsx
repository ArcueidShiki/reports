import { useLanguage } from '../i18n/LanguageContext';

/** Localized loading indicator shared by all content pages. */
export function LoadingNote() {
  const { t } = useLanguage();

  return (
    <p role="status" className="status-note">
      {t('common.loading')}
    </p>
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
