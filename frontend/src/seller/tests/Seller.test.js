/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import Seller from '../components/Seller';

test('Test 1: Seller page renders list regular listing button', () => {
  render(<Seller />);
  const regButton = screen.getByText('List for a set price');
  expect(regButton).toBeInTheDocument();
});

test('Test 2: Seller page renders list bid listing button', () => {
  render(<Seller />);
  const bidButton = screen.getByText('List as a bid');
  expect(bidButton).toBeInTheDocument();
});

test('Test 3: Seller page renders heading', () => {
  render(<Seller />);
  const heading = screen.getByText('Create a New Listing');
  expect(heading).toBeInTheDocument();
});
