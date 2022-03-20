import React from 'react';
import '../assets/Follows.css';
import NextIcon from '../assets/Next.png';
import BackIcon from '../assets/Back.png';

const Follows = (userData) => {
  const i = 0;
  return (
    <div style={{ width: '100%' }}>
      <div className="flex">
        <h1>Followed</h1>
        <div className="flex pagination-bar">
          <img id="next-followed" src={BackIcon} alt="Back Arrow Icon" />
          &nbsp;1 - 10 of 10&nbsp;
          <img id="back-followed" src={NextIcon} alt="Next Arrow Icon" />
        </div>
      </div>
      <div className="box">
        <div style={{ padding: '1% 2%' }}>
          <div className="flex">
            s
          </div>
        </div>
      </div>
    </div>
  );
};

export default Follows;
