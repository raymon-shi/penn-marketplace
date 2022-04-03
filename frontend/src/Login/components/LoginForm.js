import React, { useState } from 'react';
import {
  Form, Button, Container, Modal, Alert,
} from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SignUpForm from './SignUpForm';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);

  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    try {
      const response = await axios.post('/account/login', {
        email, password,
      }).then(() => {
        navigate('/');
      });
    } catch (error) {
      setErrorMessage('Your email or password is incorrect! Please try again!');
    }
  };

  return (
    <div>
      {errorMessage ? <Alert variant="danger">{`There was an error ${errorMessage}`}</Alert> : null}
      <Form className="card p-3 bg-light" style={{ justifyContent: 'center', width: '600px' }}>
        <Form.Group className="mb-3" controlId="loginFormPennEmail">
          <Form.Control type="email" placeholder="Penn Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-4" controlId="loginFormPassword">
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <Form.Group style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Button variant="primary" className="w-75" onClick={login}>
            Login
          </Button>
          <hr />
          <Button variant="danger" className="w-50" onClick={() => setShowSignUp(true)}>
            Sign Up
          </Button>
        </Form.Group>
      </Form>
      {showSignUp ? <SignUpForm showSignUp={showSignUp} setShowSignUp={setShowSignUp} /> : ''}
    </div>
  );
};

export default LoginForm;
