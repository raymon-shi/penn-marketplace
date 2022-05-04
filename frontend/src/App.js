import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'react-bootstrap';

import React, { useEffect, useState } from 'react';
// import './App.css';
import axios from 'axios';
import { SocketContext, socket } from './homepage/components/Socket';

import Seller from './seller/components/Seller';
import RegularItem from './buyer/components/RegularItem';
import BidItem from './buyer/components/BidItem';
import CartCheckout from './buyer/components/CartCheckout';
import ItemCheckout from './buyer/components/ItemCheckout';
import Login from './Login/components/Login';
import Account from './account/Account';
import Homepage from './homepage/components/Homepage';
import Header from './homepage/components/Header';
import Cart from './buyer/components/Cart';
import SearchResults from './searchbar/components/SearchResults';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // check the user is logged in via the cookies
  const checkUserLoggedIn = async () => {
    try {
      const user = await axios.get('/account/user');
      if (Object.keys(user.data).length > 0) {
        setUsername(user.data.name);
        setLoggedIn(true);
      }
    } catch (error) {
      Error('There was an error with getting the user information');
    }
  };

  // logs the user out
  const userLoggedOut = async () => {
    try {
      socket.emit('leave room');
      const user = await axios.post('/account/logout');
      if (user) {
        setLoggedIn(false);
        navigate('/login');
        setUsername('');
      }
    } catch (error) {
      Error('There was an error with logging out');
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  });

  useEffect(() => {
    if (username !== '') {
      socket.emit('join room', username);
    }
  }, [username]);

  useEffect(() => {
    socket.on('new message', (data) => {
      toast(`${data} has messaged you!`, { position: 'bottom-right' });
    });

    socket.on('new follow', (data) => {
      toast(`${data} has followed you!`, { position: 'bottom-right' });
    });

    socket.on('item purchased', (data) => {
      toast(`${data} has been sold!`, { position: 'bottom-right' });
    });

    socket.on('bid accepted', (data) => {
      toast(`Your bid for ${data} has been accepted!`, { position: 'bottom-right' });
    });
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <div className="App">
        <Header username={username} loggedIn={loggedIn} userLoggedOut={userLoggedOut} />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/Regularitem" element={<RegularItem username={username} />} />
          <Route path="/bidItem" element={<BidItem username={username} />} />
          <Route path="/CartCheckout" element={<CartCheckout />} />
          <Route path="/ItemCheckout" element={<ItemCheckout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/results" element={<SearchResults />} />
        </Routes>
      </div>
    </SocketContext.Provider>
  );
};

export default App;
