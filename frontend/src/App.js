import { Route, Routes, useNavigate } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
// import './App.css';
import axios from 'axios';
import Seller from './seller/components/Seller';
import Item from './buyer/components/Item';
import Checkout from './buyer/components/Checkout';
import Login from './Login/components/Login';
import Account from './account/Account';
import Homepage from './homepage/components/Homepage';
import Header from './homepage/components/Header';
import Cart from './buyer/components/Cart';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  // check the user is logged in via the cookies
  const checkUserLoggedIn = async () => {
    try {
      const user = await axios.get('/account/user');
      if (Object.keys(user.data).length > 0) {
        setLoggedIn(true);
      }
    } catch (error) {
      Error('There was an error with getting the user information');
    }
  };

  // logs the user out
  const userLoggedOut = async () => {
    try {
      const user = await axios.post('/account/logout');
      if (user) {
        setLoggedIn(false);
        navigate('/login');
      }
    } catch (error) {
      Error('There was an error with logging out');
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  });

  return (
    <div className="App">
      <Header loggedIn={loggedIn} userLoggedOut={userLoggedOut} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/seller" element={<Seller />} />
        <Route path="/item" element={<Item />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </div>
  );
};

export default App;
