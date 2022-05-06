/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import ResetPassword from '../components/ResetPassword';

describe('UI Testing for ResetPassword Component in Login', () => {
  test('Test 1: Reset Password Form Placeholder Text', () => {
    render(
      <BrowserRouter>
        <ResetPassword showResetPassword />
      </BrowserRouter>,
    );
    const loginEmailText = screen.getByPlaceholderText('Penn Email');
    const loginPasswordText = screen.getByPlaceholderText('Password');

    expect(loginEmailText).toBeInTheDocument();
    expect(loginPasswordText).toBeInTheDocument();
  });
  test('Test 2: Reset Password Form Buttons', () => {
    render(
      <BrowserRouter>
        <ResetPassword showResetPassword />
      </BrowserRouter>,
    );
    const closeButton = screen.getByText('Close');
    const resetPasswordButton = screen.getByText('Reset Password');

    expect(closeButton).toBeInTheDocument();
    expect(resetPasswordButton).toBeInTheDocument();
  });
});
