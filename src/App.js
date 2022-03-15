import React from 'react';
import logo from './logo.svg';
import './App.css';
import Seller from './seller/components/Seller';
import Item from './buyer/components/Item.js';
import Checkout from './buyer/components/Checkout.js';
import Login from './Login/components/Login';

const App = () => {
  return (
    <div className="App">
      <Seller />
      <Item />
      <Checkout />
      <Login />
    </div>
  );
};

export default App;
