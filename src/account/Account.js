import React from 'react';
import './assets/Account.css';
import Profile from './components/Profile';

const Account = () => {
  const i = 0;

  return (
    <div className="container">
      <div id="side-nav" className="flex">
        <div>
          <button type="button" className="side-nav-button">Profile</button>
          <hr />
          <button type="button" className="side-nav-button">Reviews</button>
          <hr />
          <button type="button" className="side-nav-button">Follows</button>
          <hr />
          <button type="button" className="side-nav-button">Blocked</button>
        </div>
      </div>
      <div className="flex">
        <Profile />
      </div>
    </div>
  );
};

export default Account;
