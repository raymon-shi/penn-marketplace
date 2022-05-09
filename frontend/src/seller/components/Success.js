import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Success = ({ setSuccessPage }) => {
  const navigate = useNavigate();

  const onClickListHandler = () => {
    setSuccessPage(false);
  };

  const onClickReturnHandler = () => {
    navigate('/');
  };

  return (
    <div className="success-page">
      <h1 className="mb-0 pb-1"> Success! 🎉 </h1>
      <h1> Your listing has been posted. </h1>
      <div className="buttons">
        <Button type="button" className="btn-lg list-btn" onClick={onClickListHandler}>List another item</Button>
        <Button type="button" className="btn-lg return-btn" onClick={onClickReturnHandler}>Return to Homepage</Button>
      </div>
    </div>
  );
};

export default Success;
