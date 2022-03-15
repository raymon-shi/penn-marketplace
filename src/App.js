import React from 'react';
import logo from './logo.svg';
import './App.css';
import Seller from './seller/components/Seller';
import Item from './buyer/components/Item.js';
import Checkout from './buyer/components/Checkout.js';

const App = () => {
  return (
    <div className="App">
      <Seller />
      <Item />
      <Checkout />
    </div>
  );
};

export default App;
