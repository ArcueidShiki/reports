import { render, type RenderResult } from '@testing-library/react';
import type { ReactElement } from 'react';

import { LanguageProvider } from '../i18n/LanguageContext';

/** Renders a page inside the providers it expects (language context). */
export function renderPage(ui: ReactElement): RenderResult {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
}
