/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import CartCheckout from '../components/CartCheckout';

describe('UI Testing for ItemCheckout Component', () => {
  test('Test 1: Header', () => {
    render(
      <BrowserRouter>
        <CartCheckout />
      </BrowserRouter>,
    );
    const pageHeader = screen.getByText('Cart Checkout (0 items)');
    expect(pageHeader).toBeInTheDocument();
  });
  test('Test 2: Pay with form', () => {
    render(
      <BrowserRouter>
        <CartCheckout />
      </BrowserRouter>,
    );
    const payWith = screen.getByText('Pay With');
    const payCardText = screen.getByPlaceholderText('Card Number');
    const payCVCText = screen.getByPlaceholderText('CVC');
    const payFirstText = screen.getByPlaceholderText('First Name');
    const payLastText = screen.getByPlaceholderText('Last Name');
    expect(payWith).toBeInTheDocument();
    expect(payCardText).toBeInTheDocument();
    expect(payCVCText).toBeInTheDocument();
    expect(payFirstText).toBeInTheDocument();
    expect(payLastText).toBeInTheDocument();
  });
  test('Test 3: Confirm and Pay', () => {
    render(
      <BrowserRouter>
        <CartCheckout />
      </BrowserRouter>,
    );
    const confirmBtn = screen.getByText('Confirm and Pay');
    const total = screen.getByText('Total (0 items): $0');
    expect(confirmBtn).toBeInTheDocument();
    expect(total).toBeInTheDocument();
  });
});
