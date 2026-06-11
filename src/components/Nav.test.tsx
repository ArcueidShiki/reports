import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import { LanguageProvider } from '../i18n/LanguageContext';
import Nav from './Nav';

const NAV_CASES = [
  { en: 'Home', zh: '首页', href: '/' },
  { en: 'Product Analytics', zh: '产品分析', href: '/products' },
  { en: 'US Market Daily', zh: '美股日报', href: '/market' },
  { en: 'Alpha Factors', zh: 'Alpha因子', href: '/alpha' },
  { en: 'Signal Calendar', zh: '信号日历', href: '/signals' },
  { en: 'Gallery', zh: '每日图集', href: '/gallery' },
] as const;

function renderNav() {
  return render(
    <LanguageProvider>
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    </LanguageProvider>,
  );
}

describe('Nav', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders all six section links with English labels and hrefs', () => {
    renderNav();

    expect(screen.getAllByRole('link')).toHaveLength(NAV_CASES.length);

    for (const { en, href } of NAV_CASES) {
      expect(screen.getByRole('link', { name: en })).toHaveAttribute(
        'href',
        href,
      );
    }
  });

  it('switches visible labels to Chinese when the language is toggled', async () => {
    const user = userEvent.setup();
    renderNav();

    await user.click(screen.getByRole('button', { name: '中文' }));

    for (const { zh, href } of NAV_CASES) {
      expect(screen.getByRole('link', { name: zh })).toHaveAttribute(
        'href',
        href,
      );
    }
  });

  it('toggles back to English from Chinese', async () => {
    const user = userEvent.setup();
    renderNav();

    await user.click(screen.getByRole('button', { name: '中文' }));
    await user.click(screen.getByRole('button', { name: 'EN' }));

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });
});
