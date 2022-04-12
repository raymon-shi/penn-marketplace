import React from 'react';
import '../assets/Profile.css';
import ExclamationIcon from '../assets/exclamation-mark.png';
import DarkModeOffIcone from '../assets/dark-mode-off.png';

const Profile = ({ user }) => (
  <div style={{ width: '100%' }}>
    <div className="flex">
      <h1>Profile</h1>
      <button id="edit-btn" type="button">Edit</button>
      <div className="flex" id="reports">
        <img src={ExclamationIcon} alt="Exclamation mark symbolizing warning." width="18px" height="18px" />
        &nbsp;3 other users have reported you.
      </div>
    </div>
    <div id="profile">
      <div style={{ padding: '1% 2%' }}>
        <div className="flex">
          <p>Name</p>
          <p>{user.name}</p>
        </div>
        <div className="flex">
          <p>Email</p>
          <p>{user.email}</p>
        </div>
        <div className="flex">
          <p>Dark Mode</p>
          <button id="dark-mode-btn" type="button">
            <img src={DarkModeOffIcone} alt="Dark mode icon: off" style={{ verticalAlign: 'top' }} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Profile;
