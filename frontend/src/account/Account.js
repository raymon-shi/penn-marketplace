import React, { useState, useEffect } from 'react';
import './assets/Account.css';
import axios from 'axios';
import Profile from './components/Profile';
import Reviews from './components/Reviews';
import Follows from './components/Follows';
import Blocked from './components/Blocked';
import SearchUsers from './components/SearchUsers';

const Account = () => {
  const [tab, setTab] = useState('Profile');
  const [userProfile, setUserProfile] = useState({});
  const [apiError, setApiError] = useState(false);

  useEffect(async () => {
    try {
      const { data } = await axios.get('/account/getUser', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setUserProfile(data.user);
    } catch (e) {
      setApiError(true);
    }
  }, []);

  function renderTab() {
    if (Object.keys(userProfile).length !== 0) {
      if (tab === 'Profile') {
        return <Profile user={userProfile} />;
      }
      if (tab === 'Reviews') {
        return <Reviews reviews={userProfile.reviews} />;
      }
      if (tab === 'Follows') {
        return <Follows followersProp={userProfile.followers} following={userProfile.following} />;
      }
      if (tab === 'Search Users') {
        return <SearchUsers userProfile={userProfile} />;
      }
      return <Blocked blocked={userProfile.blocked} />;
    }
    return null;
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
          <hr />
          <button type="button" className="side-nav-button" onClick={handleClick}>Search Users</button>
        </div>
      </div>
      <div>
        {apiError ? <div>Error retrieving user info.</div> : null }
        {renderTab()}
      </div>
    </div>
  );
};

export default Account;
