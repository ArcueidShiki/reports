import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { LanguageProvider } from '../i18n/LanguageContext';
import PdfFrame from './PdfFrame';

const PDF_SRC = '/content/signals/2026-06-11/report_2026-06-11.pdf';

function renderPdfFrame() {
  return render(
    <LanguageProvider>
      <PdfFrame src={PDF_SRC} title="report_2026-06-11.pdf" />
    </LanguageProvider>,
  );
}

describe('PdfFrame', () => {
  it('renders an un-sandboxed object embed with the pdf src and type', () => {
    renderPdfFrame();

    const embed = screen.getByTitle('report_2026-06-11.pdf');
    expect(embed.tagName).toBe('OBJECT');
    expect(embed).toHaveAttribute('data', PDF_SRC);
    expect(embed).toHaveAttribute('type', 'application/pdf');
    expect(embed).not.toHaveAttribute('sandbox');
  });

  it('renders a fallback open-in-new-tab link with the pdf href', () => {
    renderPdfFrame();

    const link = screen.getByRole('link', {
      name: 'Open the PDF in a new tab',
    });
    expect(link).toHaveAttribute('href', PDF_SRC);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(
      screen.getByText('Your browser cannot display the PDF inline.'),
    ).toBeInTheDocument();
  });
});
