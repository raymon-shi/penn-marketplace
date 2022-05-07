/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
//import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/Login';

describe('UI Testing for Login Component in Login', () => {
  test('Test 1: Login Form Placeholder Text', () => {
    render(
      <BrowserRouter>
        <Login />
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
        <Login />
      </BrowserRouter>,
    );
    const loginButton = screen.getByText('Login');
    const ressetPasswordButton = screen.getByText('Reset Password');
    const signupButton = screen.getByText('Sign Up');

    expect(loginButton).toBeInTheDocument();
    expect(ressetPasswordButton).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
  });
  test('Test 3: Penn Marketplace Header', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    const headerText = screen.getByText('Penn Marketplace');
    expect(headerText).toBeInTheDocument();
  });
  test('Test 4: Penn Marketplace Caption', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    const captionText = screen.getByText(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    );
    expect(captionText).toBeInTheDocument();
  });
});
