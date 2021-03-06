/**
* @jest-environment jsdom
*/

import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Cart from '../components/Cart';

let mockAxios;

window.setImmediate = window.setTimeout;

beforeAll(() => {
  mockAxios = new MockAdapter(axios);
  mockAxios.onGet('/buyer/cart').reply(200);
});

describe('UI Testing for Cart', () => {
  test('Test 1: Cart header text', () => {
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>,
    );
    const cartHeaderText = screen.getByText('Shopping Cart (0 items)');
    expect(cartHeaderText).toBeInTheDocument();
  });
  test('Test 2: Items', () => {
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>,
    );
    const itemsText = screen.getByText('Items (0): $0');
    expect(itemsText).toBeInTheDocument();
  });
  test('Test 3: Checkout button', () => {
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>,
    );
    const checkoutBtn = screen.getByText('Go To Checkout');
    expect(checkoutBtn).toBeInTheDocument();
  });
});
