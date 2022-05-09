/**
 * @jest-environment jsdom
 */

 import { render, screen } from '@testing-library/react';
 import React from 'react';
 import '@testing-library/jest-dom';
 import '@testing-library/jest-dom/extend-expect';
 import { BrowserRouter } from 'react-router-dom';
 import Searchbar from '../components/Searchbar';
 import userEvent from '@testing-library/user-event';

 describe('UI Testing for SearchBar component', () => {
  test('Test 1: Filter Options and Submit Button', () => {
    render(
      <BrowserRouter>
       <Searchbar />
      </BrowserRouter>
    );
    const filterSelect = screen.getByText('All');
    const filterOption1 = screen.getByText('Textbooks');
    const filterOption2 = screen.getByText('Services');
    const filterOption3 = screen.getByText('Clothes');
    const filterOption4 = screen.getByText('Housing & Furniture');
    
    const submitBtn = screen.getByRole('button');
    const queryForm = screen.getByRole('form', {name: 'queryForm'});

    expect(filterSelect).toBeInTheDocument();
    expect(filterOption1).toBeInTheDocument();
    expect(filterOption2).toBeInTheDocument();
    expect(filterOption3).toBeInTheDocument();
    expect(filterOption4).toBeInTheDocument();

    expect(submitBtn).toBeInTheDocument();
    expect(queryForm).toBeInTheDocument();
  });
});

 describe('UI Testing for SearchBar component', () => {
  test('Test 2: Query Input', () => {
      render(
        <BrowserRouter>
          <Searchbar />
        </BrowserRouter>
      );

      const searchInput = screen.getByPlaceholderText("Explore the Penn Marketplace");
      userEvent.type(screen.getByPlaceholderText("Explore the Penn Marketplace"), 'haha');

      expect(searchInput).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Explore the Penn Marketplace")).toHaveValue('haha');
  });
});
