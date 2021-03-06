import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../assets/Follows.css';
import { Modal } from 'react-bootstrap';
import NextIcon from '../assets/Next.png';
import BackIcon from '../assets/Back.png';
import ReviewIcon from '../assets/Review.png';
import UnfollowIcon from '../assets/Unfollow.png';

const Follows = ({ userProfile }) => {
  const [followedUsers, setFollowedUsers] = useState(userProfile.following);
  const [followers, setFollowers] = useState(userProfile.followers);
  const [followedUsersPage, setFollowedUsersPage] = useState(1);
  const [followersPage, setFollowersPage] = useState(1);
  const [showReview, setShowReview] = useState(false);
  const alreadyDone = useRef(false);
  const ratingInput = useRef();
  const reviewContent = useRef();
  const selectedUser = useRef({});
  const followedUsersItems = followedUsers.slice(
    (followedUsersPage - 1) * 10,
    followedUsersPage * 10,
  );
  const followersItems = followers.slice(
    (followersPage - 1) * 10,
    followersPage * 10,
  );

  function prevFollowedUsersPage() {
    if (followedUsersPage > 1) {
      setFollowedUsersPage(followedUsersPage - 1);
    }
  }

  function nextFollowedUsersPage() {
    if (followedUsersPage * 10 < followedUsers.length) {
      setFollowedUsersPage(followedUsersPage + 1);
    }
  }

  function prevFollowersPage() {
    if (followersPage > 1) {
      setFollowersPage(followersPage - 1);
    }
  }

  function nextFollowersPage() {
    if (followersPage * 10 < followers.length) {
      setFollowersPage(followersPage + 1);
    }
  }

  async function unfollow(e) {
    let indexToDelete;
    if (e.target.tagName === 'IMG') {
      indexToDelete = e.target.parentNode.value;
    } else {
      indexToDelete = e.target.value;
    }
    const newFollowedUsers = [...followedUsers];
    const removedFollowing = newFollowedUsers.splice(indexToDelete, 1);
    try {
      await axios.post('/account/unfollow', { removedFollowing: removedFollowing[0], newFollowList: newFollowedUsers });
      setFollowedUsers(newFollowedUsers);
      if (newFollowedUsers.length < followedUsersPage * 10 - 9 && followedUsersPage > 1) {
        setFollowedUsersPage(followedUsersPage - 1);
      }
    } catch (error) {
      throw new Error('Error unfollowing user');
    }
  }

  async function removeFollower(e) {
    let indexToDelete;
    if (e.target.tagName === 'IMG') {
      indexToDelete = e.target.parentNode.value;
    } else {
      indexToDelete = e.target.value;
    }
    const newFollowers = [...followers];
    const removedFollowing = newFollowers.splice(indexToDelete, 1);
    try {
      await axios.post('/account/unfollow', { removedFollowing: removedFollowing[0], newFollowList: newFollowers });
      setFollowers(newFollowers);
      if (newFollowers.length < followersPage * 10 - 9 && followersPage > 1) {
        setFollowersPage(followersPage - 1);
      }
    } catch (error) {
      throw new Error('Error unfollowing user');
    }
  }

  async function postReview() {
    try {
      const response = await axios.post('/account/postReview', {
        author: userProfile,
        recipient: selectedUser.current,
        reviewRating: ratingInput.current.value,
        reviewContent: reviewContent.current.value,
      });
      if (response.status === 200) {
        setShowReview(false);
      }
    } catch (error) {
      throw new Error('Error posting review.');
    }
  }

  async function showReviewBox(e) {
    let userToReview;
    if (e.target.tagName === 'IMG') {
      userToReview = followedUsers[e.target.parentNode.value];
    } else {
      userToReview = followedUsers[e.target.value];
    }
    try {
      const { data } = await axios.post('/account/findUserOnEmail', { email: userToReview.followingEmail });
      const user = data[0];
      selectedUser.current = user;
    } catch (error) {
      throw new Error('Error finding user on email.');
    }
    alreadyDone.current = false;
    for (let i = 0; i < selectedUser.current.reviews.length; i += 1) {
      if (selectedUser.current.reviews[i].authorEmail === userProfile.email) {
        alreadyDone.current = true;
        break;
      }
    }
    setShowReview(true);
  }

  return (
    <div style={{ width: '100%' }}>
      <div>
        <div className="flex">
          <h1>Followed</h1>
          {followedUsers.length === 0 ? null
            : (
              <div className="flex pagination-bar">
                <button type="button" onClick={prevFollowedUsersPage}>
                  <img src={BackIcon} alt="Back Arrow Icon" />
                </button>
                &nbsp;{(followedUsersPage - 1) * 10 + 1} -&nbsp;
                {followedUsersPage * 10 > followedUsers.length
                  ? followedUsers.length : followedUsersPage * 10}&nbsp;
                of {followedUsers.length}&nbsp;
                <button type="button" onClick={nextFollowedUsersPage}>
                  <img src={NextIcon} alt="Next Arrow Icon" />
                </button>
              </div>
            )}
        </div>
        {followedUsers.length === 0 ? <div>You are not following anyone.</div>
          : (
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
                {followedUsersItems.map((followedUser, index) => (
                  <div key={followedUser.followingEmail} className="table-row">
                    <p>
                      {followedUser.followingName}
                    </p>
                    <div className="table-item">
                      <button type="button" onClick={showReviewBox} value={index + (followedUsersPage - 1) * 10}>
                        <img src={ReviewIcon} alt="Review icon" />
                      </button>
                    </div>
                    <div className="table-item">
                      <button type="button" onClick={unfollow} value={index + (followedUsersPage - 1) * 10}>
                        <img src={UnfollowIcon} alt="Unfollow icon" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
      <div style={{ marginTop: '3%' }}>
        <div className="flex">
          <h1>Followers</h1>
          {followers.length === 0 ? null
            : (
              <div className="flex pagination-bar">
                <button type="button" onClick={prevFollowersPage}>
                  <img src={BackIcon} alt="Back Arrow Icon" />
                </button>
                {followersPage * 10 > followers.length
                  ? followers.length : followersPage * 10}&nbsp;
                of {followers.length}&nbsp;
                <button type="button" onClick={nextFollowersPage}>
                  <img src={NextIcon} alt="Next Arrow Icon" />
                </button>
              </div>
            )}
        </div>
        {followers.length === 0 ? <div>You have no followers.</div>
          : (
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
                {followersItems.map((follower, index) => (
                  <div key={follower.followerEmail} className="table-row">
                    <p>
                      {follower.followerName}
                    </p>
                    <div>
                      <br />
                    </div>
                    <div className="table-item">
                      <button type="button" onClick={removeFollower} value={index + (followersPage - 1) * 10}>
                        <img src={UnfollowIcon} alt="Remove icon" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
      <Modal show={showReview} onHide={() => { setShowReview(false); }} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Write a Review for {selectedUser.current.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alreadyDone.current ? 'You have already posted a review for this user.'
            : (
              <>
                <div>
                  Enter a rating - 1 through 5:
                  <select ref={ratingInput} style={{ marginLeft: '5%' }} required>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div style={{ marginTop: '5%' }}>
                  Write your review:
                  <br />
                  <textarea ref={reviewContent} style={{ width: '100%' }} />
                </div>
              </>
            )}
        </Modal.Body>
        {alreadyDone.current ? null
          : (
            <Modal.Footer>
              <button type="button" onClick={postReview}>Submit</button>
            </Modal.Footer>
          )}
      </Modal>
    </div>
  );
};

export default Follows;
