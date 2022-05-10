/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import RegularItem from '../components/RegularItem';

window.setImmediate = window.setTimeout;

describe('UI Testing for RegularItem component', () => {
  test('Test 1: Item information', () => {
    render(
      <BrowserRouter>
        <RegularItem username="user" />
      </BrowserRouter>,
    );
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
    render(
      <BrowserRouter>
        <RegularItem username="user" />
      </BrowserRouter>,
    );
    const seller = screen.getByText('Seller Information');
    const follow = screen.getByText('Follow Seller');
    const report = screen.getByText('Report Item');
    expect(seller).toBeInTheDocument();
    expect(follow).toBeInTheDocument();
    expect(report).toBeInTheDocument();
  });
  test('Test 3: Buttons', () => {
    render(
      <BrowserRouter>
        <RegularItem username="user" />
      </BrowserRouter>,
    );
    const buyBtn = screen.getByText('Buy It Now');
    const cartBtn = screen.getByText('Add To Cart');
    const saveBtn = screen.getByText('Save to Watchlist');
    expect(buyBtn).toBeInTheDocument();
    expect(cartBtn).toBeInTheDocument();
    expect(saveBtn).toBeInTheDocument();
  });
});
