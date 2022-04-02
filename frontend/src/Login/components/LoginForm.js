import React, { useState } from 'react';
import {
  Form, Button, Container, Modal,
} from 'react-bootstrap';
import SignUpForm from './SignUpForm';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div>
      <Form className="card p-3 bg-light" style={{ justifyContent: 'center' }}>
        <Form.Group className="mb-3" controlId="loginFormPennEmail">
          <Form.Control type="email" placeholder="Penn Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-4" controlId="loginFormPassword">
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <Form.Group style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Button variant="primary" className="w-75">
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
