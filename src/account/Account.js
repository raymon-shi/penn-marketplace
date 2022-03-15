import React, { useState } from 'react';
import './assets/Account.css';
import Profile from './components/Profile';
import Reviews from './components/Reviews';
import user from './assets/testUser.json';

const Account = () => {
  const [tab, setTab] = useState('Profile');

  function renderTab() {
    if (tab === 'Profile') {
      return <Profile userData={user.user} />;
    }
    return <Reviews userData={user.user} />;
  }

  function handleClick(e) {
    let buttons = document.getElementsByClassName('side-nav-button');
    buttons = [...buttons];
    for (let i = 0; i < buttons.length; i += 1) {
      if (buttons[i].innerText === tab) {
        buttons[i].style = `
          background-color: none;
          color: #000000;
        `;
        break;
      }
    }
    setTab(e.target.innerText);
    e.target.style = `
      background-color: #011F5B;
      color: #FFFFFF;
    `;
  }

  return (
    <div className="container">
      <div id="side-nav">
        <div style={{ width: '40%' }}>
          <button type="button" className="side-nav-button" onClick={handleClick}>Profile</button>
          <hr />
          <button type="button" className="side-nav-button" onClick={handleClick}>Reviews</button>
          <hr />
          <button type="button" className="side-nav-button" onClick={handleClick}>Follows</button>
          <hr />
          <button type="button" className="side-nav-button" onClick={handleClick}>Blocked</button>
        </div>
      </div>
      <div>
        {renderTab()}
      </div>
    </div>
  );
};

export default Account;