/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';

describe('UI Testing for Header Component in Login', () => {
  test('Test 1: Penn Marketplace Header', () => {
    render(<Header />);
    const headerText = screen.getByText('Penn Marketplace');
    expect(headerText).toBeInTheDocument();
  });
  test('Test 2: Penn Marketplace Caption', () => {
    render(<Header />);
    const captionText = screen.getByText(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    );
    expect(captionText).toBeInTheDocument();
  });
});
