import { React, useState } from 'react';
import '../styles/Cart.css';
import chair from '../assets/chair.png';

const Cart = () => {
  const item1 = {
    productName: 'item 1',
    productDesc: 'info about product here',
    productImage: chair,
    price: 160.99,
    tags: 'Gaming',
    sellerName: 'Seller Name',
    sellerRating: 90,
  };

  const item2 = {
    productName: 'item 2',
    productDesc: 'info about product here',
    productImage: chair,
    price: 200.00,
    tags: 'Furniture',
    sellerName: 'Seller Name',
    sellerRating: 10,
  };

  const cart = [item1, item2];

  const listItems = cart.map((d) => (
    <li className="cart-list" key={d.productName}>
      <div className="cart-leftPaneItem">
        <h3>Seller: {d.sellerName} ({d.sellerRating}%)</h3>
        <hr className="cart-solid" />
        <div className="cart-image">
          <img src={d.productImage} alt="product" width="200" height="200" />
        </div>
        <div style={{ float: 'right', paddingRight: '50px' }}>
          <p>${d.price}</p>
        </div>
        <div style={{ marginLeft: '210px' }}>
          <h4>{d.productName}</h4>
          <p>{d.productDesc}</p>
        </div>
      </div>
    </li>
  ));

  const subTotal = cart.map((item) => item.price).reduce((prev, curr) => prev + curr, 0);

  return (
    <div className="background">
      <h2 className="cart">Shopping Cart ({cart.length} items)</h2>
      <div className="cart-splitScreen">
        <div className="cart-leftPane">
          {listItems}
        </div>
        <div className="cart-rightPane">
          <p style={{ float: 'left' }}>Items ({cart.length}):</p>
          <p style={{ float: 'right' }}>${subTotal}</p>
          <div className="cart-center">
            <input className="payButton" form="ccinfo" type="submit" value="Go to Checkout" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
