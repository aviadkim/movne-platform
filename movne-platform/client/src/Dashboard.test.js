import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

test('renders dashboard header', () => {
  render(<Dashboard />);
  const headerElement = screen.getByText(/Movne Platform – מערכת ייעוץ פיננסי/i);
  expect(headerElement).toBeInTheDocument();
});
