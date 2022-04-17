import React from 'react';
import Header from './Header';
import LoginForm from './LoginForm';

const Login = ({ setLoggedIn }) => (
  <div style={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
    <Header />
    <LoginForm setLoggedIn={setLoggedIn} />
  </div>
);

export default Login;
