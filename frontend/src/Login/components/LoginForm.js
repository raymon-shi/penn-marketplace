import React, { useState } from 'react';
import {
  Form, Button, Container, Modal, Alert,
} from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import ResetPassword from './ResetPassword';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [failedLogin, setFailedLogin] = useState(0);
  const [accountLockedError, setAccountLockedError] = useState('');
  const [lockedOutTime, setLockedOutTime] = useState(0);

  const navigate = useNavigate();

  // login route
  const login = async (event) => {
    event.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    try {
      await axios.post('/account/login', {
        email, password,
      }, config).then(() => navigate('/'));
    } catch (error) {
      const { data } = await axios.post('/account/failedLogin', { email });
      setFailedLogin(data.loginAttempts);
      setLockedOutTime(data.lockedOutTime);
      setAccountLockedError(`You have failed to log in too many times! Account unlocked at: ${new Date(Date.parse(lockedOutTime)).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} `);
      setErrorMessage('Your email or password is incorrect! Please try again!');
    }
  };

  return (
    <div>
      {failedLogin ? <Alert variant="warning">{`You have failed to log in ${failedLogin} times!`}</Alert> : null}
      {failedLogin > 3 ? <Alert variant="warning">{`${accountLockedError}`}</Alert> : null}
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
          <Button variant="success" className="w-75" onClick={() => setShowResetPassword(true)}>
            Reset Password
          </Button>
          <hr />
          <Button variant="danger" className="w-50" onClick={() => setShowSignUp(true)}>
            Sign Up
          </Button>
        </Form.Group>
      </Form>
      {showSignUp ? <SignUpForm showSignUp={showSignUp} setShowSignUp={setShowSignUp} /> : ''}
      {setShowResetPassword
        ? (
          <ResetPassword
            showResetPassword={showResetPassword}
            setShowResetPassword={setShowResetPassword}
          />
        )
        : null}
    </div>
  );
};

export default LoginForm;
