/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import {
  Navbar, Nav, Container, Form, FormControl, Button, InputGroup, NavDropdown,
} from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import pennLogo from '../assets/UniversityofPennsylvania_Shield_RGB.png';
import '../styles/Header.css';
import Searchbar from '../../searchbar/components/Searchbar';
import Chat from './Chat';

const Header = ({ username, loggedIn, userLoggedOut }) => {
  const [showFriends, setShowFriends] = useState(false);

  const navigate = useNavigate();

  const onClickHandler = () => {
    setShowFriends(true);
  };

  const renderFriends = () => (
    showFriends ? (<Chat showFriends={showFriends} setShowFriends={setShowFriends} username={username} />) : null
  );

  const navigateTextbooks = () => {
    navigate('/results', { state: { query: '', category: 'Textbooks' } });
  };

  const navigateServices = () => {
    navigate('/results', { state: { query: '', category: 'Services' } });
  };

  const navigateClothes = () => {
    navigate('/results', { state: { query: '', category: 'Clothes' } });
  };

  const navigateHousing = () => {
    navigate('/results', { state: { query: '', category: 'housing' } });
  };

  const deleteUser = async () => {
    try {
      await axios.post('/account/deleteuser', { name: username });
      window.location.href = 'http://localhost:3000/login';
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert('There was an error deleting the user!');
    }
  };

  return (
    <Navbar className="header flex-column py-0" variant="dark" fixed="top">
      <Container className="m-0 top py-0" style={{ flexWrap: 'wrap', maxWidth: 'none' }}>
        <div style={{ display: 'flex' }}>
          {/* <img src={pennLogo} alt="penn logo" className="me-2 my-auto" width="25px" height="100%" /> */}
          <Navbar.Brand href="/">PENN MARKETPLACE</Navbar.Brand>
        </div>
        <Searchbar />
        <div className="right-side">
          {/* <a className="profile btn me-3" href="/account" aria-label="link to account page">Account</a> */}

          {loggedIn ? (
            <>
              <Button className="friends me-2 btn-sm" variant="primary" onClick={onClickHandler}>Friends</Button>
              {renderFriends()}
              <Button className="login me-2 btn-sm" onClick={() => navigate('/account')}>Dashboard</Button>
              <p
                className="ms-2 me-3"
                style={{
                  height: '40px', paddingTop: '9px', fontSize: '.875rem', color: 'white', margin: 'auto 0',
                }}
              >
                {username}
              </p>
              <a className="shopping-cart" target="_self" href="/cart" aria-label="link to shopping cart">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="25" height="25"><path style={{ fill: 'white' }} d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" /></svg>
              </a>
              <NavDropdown title="More" id="basic-nav-dropdown">
                <NavDropdown.Item id="dashboard" href="/account">Dashboard</NavDropdown.Item>
                <NavDropdown.Item href="/seller">Sell</NavDropdown.Item>
                <NavDropdown.Item
                  id="delete-user"
                  onClick={() => {
                    deleteUser();
                    userLoggedOut();
                  }}
                >Delete Account
                </NavDropdown.Item>
                <NavDropdown.Item
                  id="log-out"
                  onClick={userLoggedOut}
                >Logout
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <Button className="login me-2 btn-sm" onClick={() => navigate('/login')}>Login</Button>
          )}

        </div>
      </Container>
      <Container className="m-0 bottom" style={{ maxWidth: 'none' }}>
        <Nav className="m-0 bottom" style={{ flexWrap: 'wrap' }}>
          <Button active variant="light" onClick={navigateTextbooks}>Textbooks</Button>
          <Button active variant="light" onClick={navigateServices}>Services</Button>
          <Button active variant="light" onClick={navigateClothes}>Clothes</Button>
          <Button active variant="light" onClick={navigateHousing}>Housing &amp; Furniture</Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
