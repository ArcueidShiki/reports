import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders the site heading', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Arcueid Daily Reports' }),
    ).toBeInTheDocument();
  });
});
