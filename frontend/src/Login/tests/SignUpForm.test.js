/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
//import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';

describe('UI Testing for SignUpForm Component in Login', () => {
  test('Test 1: Signup Form Placeholder Text', () => {
    render(
      <BrowserRouter>
        <SignUpForm showSignUp />
      </BrowserRouter>,
    );
    const firstNameText = screen.getByPlaceholderText('First Name');
    const lastNameText = screen.getByPlaceholderText('Last Name');
    const loginEmailText = screen.getByPlaceholderText('Penn Email');
    const loginPasswordText = screen.getByPlaceholderText('Password');
    const monthText = screen.getByText('Month');
    const dayText = screen.getByText('Day');
    const yearText = screen.getByText('Year');
    const schoolText = screen.getByText('School');
    const majorText = screen.getByText('Major');
    const classyearText = screen.getByText('Class Year');

    expect(firstNameText).toBeInTheDocument();
    expect(lastNameText).toBeInTheDocument();
    expect(loginEmailText).toBeInTheDocument();
    expect(loginPasswordText).toBeInTheDocument();
    expect(monthText).toBeInTheDocument();
    expect(dayText).toBeInTheDocument();
    expect(yearText).toBeInTheDocument();
    expect(schoolText).toBeInTheDocument();
    expect(majorText).toBeInTheDocument();
    expect(classyearText).toBeInTheDocument();
  });
  test('Test 2: Signup Form Buttons', () => {
    render(
      <BrowserRouter>
        <SignUpForm showSignUp />
      </BrowserRouter>,
    );
    const createAccountButton = screen.getByText('Create Account');
    const canelButton = screen.getByText('Cancel');
    expect(createAccountButton).toBeInTheDocument();
    expect(canelButton).toBeInTheDocument();
  });
  test('Test 3: Title Text', () => {
    render(
      <BrowserRouter>
        <SignUpForm showSignUp />
      </BrowserRouter>,
    );
    const birthdayText = screen.getByText('Birthday');
    const smcyText = screen.getByText('School, Major, and Class Year');
    const headerText = screen.getByText('Create your account');
    expect(birthdayText).toBeInTheDocument();
    expect(smcyText).toBeInTheDocument();
    expect(headerText).toBeInTheDocument();
  });
});
