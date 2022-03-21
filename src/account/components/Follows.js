import React from 'react';
import '../assets/Follows.css';
import NextIcon from '../assets/Next.png';
import BackIcon from '../assets/Back.png';
import ReviewIcon from '../assets/Review.png';
import UnfollowIcon from '../assets/Unfollow.png';

const Follows = ({ userData }) => {
  const i = 0;
  return (
    <div style={{ width: '100%' }}>
      <div>
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
            <div className="table-row">
              <br />
              <div className="table-item">
                Review
              </div>
              <div className="table-item">
                Unfollow
              </div>
            </div>
            {userData.following.map((followedUser) => (
              <div className="table-row">
                <p>
                  {followedUser.name}
                </p>
                <div className="table-item">
                  <img src={ReviewIcon} alt="Review icon" />
                </div>
                <div className="table-item">
                  <img src={UnfollowIcon} alt="Unfollow icon" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginTop: '3%' }}>
        <div className="flex">
          <h1>Followed</h1>
          <div className="flex pagination-bar">
            <img id="next-follower" src={BackIcon} alt="Back Arrow Icon" />
            &nbsp;1 - 10 of 10&nbsp;
            <img id="back-follower" src={NextIcon} alt="Next Arrow Icon" />
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
                Remove
              </div>
            </div>
            {userData.followers.map((follower) => (
              <div className="table-row">
                <p>
                  {follower.name}
                </p>
                <div>
                  <br />
                </div>
                <div className="table-item">
                  <img src={UnfollowIcon} alt="Remove icon" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Follows;
