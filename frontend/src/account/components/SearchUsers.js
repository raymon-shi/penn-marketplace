import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

const inputStyle = {
  padding: '5px',
  border: '1px solid black',
  borderRadius: '5px',
  width: '80%',
  marginTop: '2%',
};

const searchButtonStyle = {
  backgroundColor: '#011F5B',
  color: 'white',
  borderRadius: '5px',
  marginLeft: '5%',
  padding: '5px 10px',
};

const tableRow = {
  display: 'grid',
  gridTemplateColumns: '3fr 1fr 1fr 1fr',
  whiteSpace: 'nowrap',
};

const SearchUsers = ({ userProfile }) => {
  const searchInput = useRef();
  const ratingInput = useRef();
  const reviewContent = useRef();
  const userToReview = useRef({});
  const alreadyReviewed = useRef(false);
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [showReview, setShowReview] = useState(false);

  async function searchUsers() {
    try {
      const { data } = await axios.post('/account/findUsersOnName', {
        name: searchInput.current.value,
      });
      setMatchedUsers(data);
    } catch (error) {
      throw new Error(`Error searching for users: ${error}`);
    }
  }

  async function postReview() {
    try {
      const response = await axios.post('/account/postReview', {
        author: userProfile,
        recipient: userToReview.current,
        reviewRating: ratingInput.current.value,
        reviewContent: reviewContent.current.value,
      });
      if (response.status === 200) {
        setShowReview(false);
      }
    } catch (error) {
      throw new Error(`Error posting review ${error}`);
    }
  }

  function showReviewBox(e) {
    userToReview.current = matchedUsers[e.target.value];
    for (let i = 0; i < userToReview.current.reviews.length; i += 1) {
      if (userToReview.current.reviews[i].author === userProfile.email) {
        alreadyReviewed.current = true;
        break;
      }
    }
    setShowReview(true);
  }

  return (
    <div>
      Search for user(s) by name, and give them a review, follow them, or block them.
      <div>
        <input type="text" style={inputStyle} placeholder="Search for users..." ref={searchInput} />
        <button type="submit" style={searchButtonStyle} onClick={searchUsers}>Search</button>
      </div>
      {matchedUsers.length === 0 ? null
        : (
          <div className="box" style={{ marginTop: '2%' }}>
            <div style={{ padding: '1% 2%' }}>
              {matchedUsers.map((user, index) => (
                <div key={user.email} style={tableRow}>
                  <p>{user.name}</p>
                  <div className="table-item">
                    <button type="button" value={index} onClick={showReviewBox}>Review</button>
                  </div>
                  <div className="table-item">
                    <button type="button">Follow</button>
                  </div>
                  <div className="table-item">
                    <button type="button">Block</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      <Modal show={showReview} onHide={() => { setShowReview(false); }} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Write a Review for {userToReview.current.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alreadyReviewed.current ? 'You have already posted a review for this user.'
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
        {alreadyReviewed.current ? null
          : (
            <Modal.Footer>
              <button type="button" onClick={postReview}>Submit</button>
            </Modal.Footer>
          )}
      </Modal>
    </div>
  );
};

export default SearchUsers;
