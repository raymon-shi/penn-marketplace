/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import Start from '../components/Start';

test('Test 1: Start page renders list regular listing button', () => {
  render(<Start />);
  const regButton = screen.getByText('List for a set price');
  expect(regButton).toBeInTheDocument();
});

test('Test 2: Start page renders list bid listing button', () => {
  render(<Start />);
  const bidButton = screen.getByText('List as a bid');
  expect(bidButton).toBeInTheDocument();
});

test('Test 3: Start page renders heading', () => {
  render(<Start />);
  const heading = screen.getByText('Create a New Listing');
  expect(heading).toBeInTheDocument();
});
