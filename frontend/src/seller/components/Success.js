import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Success = ({ setSuccessPage }) => {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <h1>
        Success! 🎉
        <br />
        Your listing has been posted.
      </h1>
      <div className="buttons">
        <Button type="button" className="btn-lg list-btn" onClick={() => setSuccessPage(false)}>List another item</Button>
        <Button type="button" className="btn-lg return-btn" onClick={() => navigate('/')}>Return to Homepage</Button>
      </div>
    </div>
  );
};

export default Success;
