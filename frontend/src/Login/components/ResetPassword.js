import axios from 'axios';
import React, { useState } from 'react';
import {
  Modal, Button, Form, Alert,
} from 'react-bootstrap';

const ResetPassword = ({ showResetPassword, setShowResetPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const resettingPassword = async () => {
    try {
      const { data } = await axios.post('/account/resetpassword', { email, password });
    } catch (error) {
      setErrorMessage('There was an issue resetting your password! Check the username and password');
    }
  };

  return (
    <Modal show={showResetPassword} onHide={() => setShowResetPassword(false)}>
      {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : null}
      <Modal.Header closeButton>
        <Modal.Title>Reset Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          className="card p-3 bg-light"
          id="signup-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <Form.Group className="mb-3" controlId="signUpFormPennEmail">
            <Form.Control type="email" placeholder="Penn Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="signUpFormPassword">
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
        </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowResetPassword(false)}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            resettingPassword();
            setShowResetPassword(false);
          }}
        >
          Reset Password
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResetPassword;
