/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';


describe('UI Testing for Header Component in Homepage', () => {
  test('Test 1: Penn Marketplace Header', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    const headerText = screen.getByText('PENN MARKETPLACE');
    expect(headerText).toBeInTheDocument();
  });
  test('Test 2: Penn Marketplace Login Button', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    const loginButton = screen.getByText('Login');
    expect(loginButton).toBeInTheDocument();
  });
  test('Test 3: Header Tags', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    const textbookText = screen.getAllByText('Textbooks')[0];
    const servicesText = screen.getAllByText('Services')[0];
    const clothesText = screen.getAllByText('Clothes')[0];
    const housingFurnitureText = screen.getAllByText('Housing & Furniture')[0];

    expect(textbookText).toBeInTheDocument();
    expect(servicesText).toBeInTheDocument();
    expect(clothesText).toBeInTheDocument();
    expect(housingFurnitureText).toBeInTheDocument();
  });
  test('Test 3: Logged In Buttons', () => {
    render(
      <BrowserRouter>
        <Header username="Raymon Shi" loggedIn />
      </BrowserRouter>,
    );
    const friendsButton = screen.getByText('Friends');
    const dashboardButton = screen.getByText('Dashboard');
    const name = screen.getByText('Raymon Shi');
    const moreButton = screen.getByText('More');

    expect(friendsButton).toBeInTheDocument();
    expect(dashboardButton).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(moreButton).toBeInTheDocument();
  });
  test('Test 4: Dropdown Menu', () => {
    render(
      <BrowserRouter>
        <Header username="Raymon Shi" loggedIn />
      </BrowserRouter>,
    );
    userEvent.click(screen.getByText('More'));
    const dashboardOption = screen.getAllByText('Dashboard')[1];
    const sellOption = screen.getByText('Sell');
    const logoutOption = screen.getByText('Logout');
    expect(dashboardOption).toBeInTheDocument();
    expect(sellOption).toBeInTheDocument();
    expect(logoutOption).toBeInTheDocument();
  });
});
