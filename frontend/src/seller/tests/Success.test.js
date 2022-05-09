/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import { BrowserRouter } from 'react-router-dom';
import Success from '../components/Success';

test('Test 1: Success page renders heading', () => {
  render(
    <BrowserRouter>
      <Success />
    </BrowserRouter>,
  );
  const headingOne = screen.getByText('Success! 🎉');
  const headingTwo = screen.getByText('Your listing has been posted.');
  expect(headingOne).toBeInTheDocument();
  expect(headingTwo).toBeInTheDocument();
});

test('Test 2: Success page renders list button', () => {
  render(
    <BrowserRouter>
      <Success />
    </BrowserRouter>,
  );
  const listButton = screen.getByText('List another item');
  expect(listButton).toBeInTheDocument();
});

test('Test 3: Success page renders homepage button', () => {
  render(
    <BrowserRouter>
      <Success />
    </BrowserRouter>,
  );
  const homeButton = screen.getByText('Return to Homepage');
  expect(homeButton).toBeInTheDocument();
});
