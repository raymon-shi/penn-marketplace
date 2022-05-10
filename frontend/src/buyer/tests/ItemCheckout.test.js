// /**
//  * @jest-environment jsdom
//  */

// import { render, screen } from '@testing-library/react';
// import React from 'react';
// import '@testing-library/jest-dom';
// import '@testing-library/jest-dom/extend-expect';
// import { BrowserRouter } from 'react-router-dom';
// import ItemCheckout from '../components/ItemCheckout';

// window.setImmediate = window.setTimeout;

// describe('UI Testing for ItemCheckout component', () => {
//   test('Test 1: Header', () => {
//     render(
//       <BrowserRouter>
//         <ItemCheckout />
//       </BrowserRouter>,
//     );
//     const header = screen.getByText('Item Checkout');
//     expect(header).toBeInTheDocument();
//   });
//   test('Test 2: Item info', () => {
//     render(
//       <BrowserRouter>
//         <ItemCheckout />
//       </BrowserRouter>,
//     );
//     const seller = screen.getByText('Listed by:');
//     const tags = screen.getByText('Tags:');
//     const price = screen.getByText('Price:');
//     const bold = screen.getByText('US $0');
//     expect(seller).toBeInTheDocument();
//     expect(tags).toBeInTheDocument();
//     expect(price).toBeInTheDocument();
//     expect(bold).toBeInTheDocument();
//   });
//   test('Test 3: Pay with', () => {
//     render(
//       <BrowserRouter>
//         <ItemCheckout />
//       </BrowserRouter>,
//     );
//     const payWith = screen.getByText('Pay With');
//     const payCardText = screen.getByPlaceholderText('Card Number');
//     const payCVCText = screen.getByPlaceholderText('CVC');
//     const payFirstText = screen.getByPlaceholderText('First Name');
//     const payLastText = screen.getByPlaceholderText('Last Name');
//     expect(payWith).toBeInTheDocument();
//     expect(payCardText).toBeInTheDocument();
//     expect(payCVCText).toBeInTheDocument();
//     expect(payFirstText).toBeInTheDocument();
//     expect(payLastText).toBeInTheDocument();
//   });
//   test('Test 4: Confirm and Pay', () => {
//     render(
//       <BrowserRouter>
//         <ItemCheckout />
//       </BrowserRouter>,
//     );
//     const confirmBtn = screen.getByText('Confirm and Pay');
//     const total = screen.getByText('Total: $0');
//     expect(confirmBtn).toBeInTheDocument();
//     expect(total).toBeInTheDocument();
//   });
// });
