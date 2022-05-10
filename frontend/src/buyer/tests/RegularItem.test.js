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
import { act } from 'react-test-renderer';

import RegularItem from '../components/RegularItem';

let mockAxios;

window.setImmediate = window.setTimeout;

beforeAll(() => {
  mockAxios = new MockAdapter(axios);
  mockAxios.onGet('/buyer/getRegListing/0').reply(200);
});

describe('UI Testing for RegularItem component', () => {
  test('Test 1: Item information', () => {
    act(() => {
      render(
        <BrowserRouter>
          <RegularItem username="user" />
        </BrowserRouter>,
      );
    });
    const backToListings = screen.getByText('Back to listings');
    const tags = screen.getByText('Tags:');
    const price = screen.getByText('Price:');
    const bold = screen.getByText('US $0');
    expect(backToListings).toBeInTheDocument();
    expect(tags).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(bold).toBeInTheDocument();
  });
  test('Test 2: Seller information', () => {
    act(() => {
      render(
        <BrowserRouter>
          <RegularItem username="user" />
        </BrowserRouter>,
      );
    });
    const seller = screen.getByText('Seller Information');
    const follow = screen.getByText('Follow Seller');
    const report = screen.getByText('Report Item');
    expect(seller).toBeInTheDocument();
    expect(follow).toBeInTheDocument();
    expect(report).toBeInTheDocument();
  });
  test('Test 3: Buttons', () => {
    act(() => {
      render(
        <BrowserRouter>
          <RegularItem username="user" />
        </BrowserRouter>,
      );
    });
    const buyBtn = screen.getByText('Buy It Now');
    const cartBtn = screen.getByText('Add To Cart');
    const saveBtn = screen.getByText('Save to Watchlist');
    expect(buyBtn).toBeInTheDocument();
    expect(cartBtn).toBeInTheDocument();
    expect(saveBtn).toBeInTheDocument();
  });
});
