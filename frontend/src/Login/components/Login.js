import React from 'react';
import Header from './Header';
import LoginForm from './LoginForm';

const Login = () => (
  <div style={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
    <Header />
    <LoginForm />
  </div>
);

export default Login;
