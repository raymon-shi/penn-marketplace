import React, { useState } from 'react';
import NextIcon from '../assets/Next.png';
import BackIcon from '../assets/Back.png';
import UnblockIcon from '../assets/Unblock.png';

const Blocked = ({ userData }) => {
  const [blockedUsers, setBlockedUsers] = useState(userData.blocked);
  const [page, setPage] = useState(1);

  function handleBackClick() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function handleNextClick() {
    if (page * 10 < blockedUsers.length) {
      setPage(page + 1);
    }
  }

  function handleUnblock(e) {
    // Insert API call here
    let indexToDelete;
    if (e.target.tagName === 'IMG') {
      indexToDelete = e.target.parentNode.value;
    } else {
      indexToDelete = e.target.value;
    }
    setBlockedUsers(blockedUsers.splice(indexToDelete, 1));
  }

  return (
    <div style={{ width: '100%' }}>
      <div>
        <div className="flex">
          <h1>Blocked</h1>
          <div className="flex pagination-bar">
            <button type="button" onClick={handleBackClick}>
              <img src={BackIcon} alt="Back Arrow Icon" />
            </button>
            &nbsp;{(page - 1) * 10 + 1} -&nbsp;
            {page * 10 > blockedUsers.length ? blockedUsers.length : page * 10}&nbsp;
            of {blockedUsers.length}&nbsp;
            <button type="button" onClick={handleNextClick}>
              <img src={NextIcon} alt="Next Arrow Icon" />
            </button>
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
            {blockedUsers.map((blockedUser, index) => (
              <div key={blockedUser.pennID} className="table-row">
                <p>
                  {blockedUser.name}
                </p>
                <div>
                  <br />
                </div>
                <div className="table-item">
                  <button type="button" onClick={handleUnblock} value={index}>
                    <img src={UnblockIcon} alt="Unblock Icon" />
                  </button>
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
