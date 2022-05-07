/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import BidListing from '../components/BidListing';

test('Test 1: Bid Listing page renders heading', () => {
  render(<BidListing />);
  const heading = screen.getByText('Bid Listing');
  expect(heading).toBeInTheDocument();
});

describe('UI Testing for Form in Bid Listing', () => {
  test('Test 2: Form Text', () => {
    render(<BidListing />);
    const productText = screen.getByText('Product');
    const imageText = screen.getByText('Image');
    const productDescrText = screen.getByText('Product Description');
    const tagText = screen.getByText('Tag');
    expect(productText).toBeInTheDocument();
    expect(imageText).toBeInTheDocument();
    expect(productDescrText).toBeInTheDocument();
    expect(tagText).toBeInTheDocument();
  });
  test('Test 3: Form Placeholder Text', () => {
    render(<BidListing />);
    const productText = screen.getByPlaceholderText('Enter product name');
    const productDescrText = screen.getByPlaceholderText('Provide some details about your product');
    expect(productText).toBeInTheDocument();
    expect(productDescrText).toBeInTheDocument();
  });
  test('Test 4: Form Tag Options', () => {
    render(<BidListing />);
    const placeholderText = screen.getByText('Select a tag');
    const option1 = screen.getByText('Textbooks');
    const option2 = screen.getByText('Services');
    const option3 = screen.getByText('Clothes');
    const option4 = screen.getByText('Housing & Furniture');
    expect(placeholderText).toBeInTheDocument();
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
    expect(option3).toBeInTheDocument();
    expect(option4).toBeInTheDocument();
  });
  test('Test 5: Form Buttons', () => {
    render(<BidListing />);
    const uploadButton = screen.getByText('Upload Image');
    const postButton = screen.getByText('Post');
    const backButton = screen.getByText('Back');
    expect(uploadButton).toBeInTheDocument();
    expect(postButton).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
  });
});
