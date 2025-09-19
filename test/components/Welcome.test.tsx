import { ReactTestingLibrary, renderComponent } from '@kurocado-studio/qa';
import React from 'react';

import { Demo } from 'src/components/Demo';

const { screen } = ReactTestingLibrary;

describe('Demo component', () => {
  beforeEach(() => renderComponent(<Demo />));

  test('renders welcome component properly', () => {
    expect(
      screen.getByText('Kurocado Studio React 19 starter template'),
    ).toBeInTheDocument();
  });

  test('renders a tag pointing to the YouTrack documentation', () => {
    const linkElement = screen.getByRole('link', { name: 'Learn more' });

    expect(linkElement).toBeInTheDocument();

    expect(linkElement).toHaveAttribute(
      'href',
      'https://kurocado-studio.github.io/platform/case-study.html',
    );
  });

  test('renders a tag pointing to the GitHub repository', () => {
    const linkElement = screen.getByRole('link', { name: 'View on GitHub' });

    expect(linkElement).toBeInTheDocument();

    expect(linkElement).toHaveAttribute(
      'href',
      'https://github.com/Kurocado-Studio/styleguide-react-template',
    );
  });
});
