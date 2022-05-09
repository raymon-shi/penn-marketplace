/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

describe('UI Testing for LoginForm Component in Login', () => {
  test('Test 1: Login Form Placeholder Text', () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );
    const loginEmailText = screen.getByPlaceholderText('Penn Email');
    const loginPasswordText = screen.getByPlaceholderText('Password');
    expect(loginEmailText).toBeInTheDocument();
    expect(loginPasswordText).toBeInTheDocument();
  });
  test('Test 2: Login Form Buttons', () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );
    const loginButton = screen.getByText('Login');
    const ressetPasswordButton = screen.getByText('Reset Password');
    const signupButton = screen.getByText('Sign Up');

    expect(loginButton).toBeInTheDocument();
    expect(ressetPasswordButton).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
  });
});
