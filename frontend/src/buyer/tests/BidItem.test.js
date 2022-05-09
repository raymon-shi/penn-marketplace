/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import BidItem from '../components/BidItem';

describe('UI Testing for RegularItem component', () => {
  test('Test 1: Item information', () => {
    render(
      <BrowserRouter>
        <BidItem username="user" />
      </BrowserRouter>,
    );
    const backToListings = screen.getByText('Back to listings');
    const tags = screen.getByText('Tags:');
    const bold = screen.getByText('US $0');
    const currBid = screen.getByText('Current Bid: (none)');
    const form = screen.getByPlaceholderText('Enter Bid');
    const msg = screen.getByText('Enter $1 or more!');
    expect(backToListings).toBeInTheDocument();
    expect(tags).toBeInTheDocument();
    expect(currBid).toBeInTheDocument();
    expect(bold).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(msg).toBeInTheDocument();
  });
  test('Test 2: Seller information', () => {
    render(
      <BrowserRouter>
        <BidItem username="user" />
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
        <BidItem username="user" />
      </BrowserRouter>,
    );
    const buyBtn = screen.getByText('Place Bid Now');
    const saveBtn = screen.getByText('Save Item');
    expect(buyBtn).toBeInTheDocument();
    expect(saveBtn).toBeInTheDocument();
  });
});
