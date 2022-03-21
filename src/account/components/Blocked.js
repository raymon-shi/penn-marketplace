import React from 'react';
import NextIcon from '../assets/Next.png';
import BackIcon from '../assets/Back.png';
import UnblockIcon from '../assets/Unblock.png';

const Blocked = ({ userData }) => {
  const i = 1;

  return (
    <div style={{ width: '100%' }}>
      <div>
        <div className="flex">
          <h1>Blocked</h1>
          <div className="flex pagination-bar">
            <img id="next-followed" src={BackIcon} alt="Back Arrow Icon" />
            &nbsp;1 - 10 of 10&nbsp;
            <img id="back-followed" src={NextIcon} alt="Next Arrow Icon" />
          </div>
        </div>
        <div className="box">
          <div style={{ padding: '1% 2%' }}>
            <div className="table-row">
              <br />
              <div>
                <br />
              </div>
              <div className="table-item">
                Unblock
              </div>
            </div>
            {userData.blocked.map((blockedUser) => (
              <div className="table-row">
                <p>
                  {blockedUser.name}
                </p>
                <div>
                  <br />
                </div>
                <div className="table-item">
                  <img src={UnblockIcon} alt="Unfollow icon" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blocked;
