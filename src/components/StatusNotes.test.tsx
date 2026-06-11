import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { renderPage } from '../test/renderPage';
import { ErrorNote, LoadingNote } from './StatusNotes';

describe('StatusNotes', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('LoadingNote renders a status with the loading text', () => {
    renderPage(<LoadingNote />);

    expect(screen.getByRole('status')).toHaveTextContent('Loading…');
  });

  it('ErrorNote renders an alert with the friendly message and detail', () => {
    renderPage(<ErrorNote detail="HTTP 500" />);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Something went wrong.');
    expect(alert).toHaveTextContent('HTTP 500');
  });
});
