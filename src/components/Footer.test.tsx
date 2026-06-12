import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LanguageProvider, useLanguage } from '../i18n/LanguageContext';
import Footer from './Footer';

function LanguageSwitchButton() {
  const { setLang } = useLanguage();
  return <button onClick={() => setLang('zh')}>switch-to-zh</button>;
}

function renderFooter() {
  return render(
    <LanguageProvider>
      <Footer />
    </LanguageProvider>,
  );
}

describe('Footer', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('links to the GitHub profile', () => {
    renderFooter();

    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/ArcueidShiki',
    );
  });

  it('links to the contact email', () => {
    renderFooter();

    expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute(
      'href',
      'mailto:pjtpengjingtong@gmail.com',
    );
  });

  it('links to the resume site in a new tab with noopener', () => {
    renderFooter();

    const resumeLink = screen.getByRole('link', { name: 'Resume' });
    expect(resumeLink).toHaveAttribute('href', 'https://cv.arcueidshiki.uk/cv2.html');
    expect(resumeLink).toHaveAttribute('target', '_blank');
    expect(resumeLink.getAttribute('rel')).toContain('noopener');
  });

  it('translates the resume label when the language changes', async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <Footer />
        <LanguageSwitchButton />
      </LanguageProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'switch-to-zh' }));

    expect(screen.getByRole('link', { name: '简历' })).toHaveAttribute(
      'href',
      'https://cv.arcueidshiki.uk/cv2.html',
    );
  });
});
