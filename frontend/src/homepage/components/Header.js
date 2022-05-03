/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import {
  Navbar, Nav, Container, Form, FormControl, Button, InputGroup, NavDropdown,
} from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import pennLogo from '../assets/UniversityofPennsylvania_Shield_RGB.png';
import '../styles/Header.css';
import Searchbar from '../../searchbar/components/Searchbar';
import Chat from './Chat';

const Header = ({ username, loggedIn, userLoggedOut }) => {
  const [search, setSearch] = useState('');
  const [showFriends, setShowFriends] = useState(false);

  const navigate = useNavigate();

  return (
    <Navbar className="header flex-column py-0" variant="dark" fixed="top">
      <Container className="m-0 top py-0" style={{ flexWrap: 'wrap', maxWidth: 'none' }}>
        <div style={{ display: 'flex' }}>
          <img src={pennLogo} alt="penn logo" className="me-2 my-auto" width="25px" height="100%" />
          <Navbar.Brand href="/">PENN MARKETPLACE</Navbar.Brand>
        </div>
        <Searchbar />
        {/* <Form
          className="d-flex"
          style={{ width: '40%', minWidth: '250px' }}
          onSubmit={(e) => {
            e.preventDefault();
            setSearch('');
          }}
        >
          <InputGroup>
            <InputGroup.Text>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18" height="18"><path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" /></svg>
            </InputGroup.Text>
            <FormControl
              type="search"
              className="border-0"
              placeholder="Explore the Penn Marketplace"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Form> */}
        <div className="right-side">
          {/* <a className="profile btn me-3" href="/account" aria-label="link to account page">Account</a> */}

          {loggedIn ? (
            <>
              <Button
                className="friends me-2 btn-sm"
                variant="primary"
                onClick={() => {
                  setShowFriends(true);
                }}
              >Friends
              </Button>
              {showFriends && <Chat showFriends={showFriends} setShowFriends={setShowFriends} username={username} />}
              <Button className="login me-2 btn-sm" onClick={() => navigate('/account')}>Account</Button>
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
                <NavDropdown.Item href="/account">Account</NavDropdown.Item>
                <NavDropdown.Item href="/seller">Sell</NavDropdown.Item>
                <NavDropdown.Item onClick={userLoggedOut}>Logout</NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <Button className="login me-2 btn-sm" onClick={() => navigate('/login')}>Login</Button>
          )}

        </div>
      </Container>
      <Container className="m-0 bottom" style={{ maxWidth: 'none' }}>
        <Nav className="m-0 bottom" style={{ flexWrap: 'wrap' }}>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="">Saved</Nav.Link>
          <Nav.Link href="">Textbooks</Nav.Link>
          <Nav.Link href="">Services</Nav.Link>
          <Nav.Link href="">Clothes</Nav.Link>
          <Nav.Link href="">Housing &amp; Furniture</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Header;
