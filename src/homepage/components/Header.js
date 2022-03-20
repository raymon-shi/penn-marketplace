import React, { useState } from 'react';
import {
  Navbar, Nav, Container, Form, FormControl, Button, InputGroup,
} from 'react-bootstrap';
import pennLogo from '../assets/UniversityofPennsylvania_Shield_RGB.png';
import '../styles/Header.css';

const Header = () => {
  const [search, setSearch] = useState('');

  return (
    <Navbar className="header flex-column py-0" variant="dark" fixed="top">
      <Container className="m-0 top py-0" style={{ flexWrap: 'wrap', maxWidth: 'none' }}>
        <div style={{ display: 'flex' }}>
          <img src={pennLogo} alt="penn logo" className="me-2 my-auto" width="25px" height="100%" />
          <Navbar.Brand href="/">PENN MARKETPLACE</Navbar.Brand>
        </div>
        <Form
          className="d-flex"
          style={{ width: '40%', minWidth: '250px' }}
          onSubmit={(e) => {
            e.preventDefault();
            setSearch('');
          }}
        >
          <InputGroup>
            <InputGroup.Text>
              <i className="fa fa-search" />
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
        </Form>
        <div>
          <Button className="login me-2 btn-sm">Login</Button>
          <Button className="sign-up btn-sm">Sign Up</Button>
        </div>
      </Container>
      <Container className="m-0 bottom" style={{ maxWidth: 'none' }}>
        <Nav className="m-0 bottom" style={{ flexWrap: 'wrap' }}>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/">Saved</Nav.Link>
          <Nav.Link href="/">Textbooks</Nav.Link>
          <Nav.Link href="/">Services</Nav.Link>
          <Nav.Link href="/">Clothes</Nav.Link>
          <Nav.Link href="/">Housing &amp; Furniture</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Header;
