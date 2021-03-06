import React, { useRef, useState, useContext } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
// import { SocketContext } from '../../homepage/components/Socket';

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
  const selectedUser = useRef({});
  const alreadyDone = useRef(false);
  const reportContent = useRef();
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [showFollow, setShowFollow] = useState(false);
  const [showBlock, setShowBlock] = useState(false);
  // const socket = useContext(SocketContext);

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

  async function handleFollow(e) {
    selectedUser.current = matchedUsers[e.target.value];
    alreadyDone.current = false;
    for (let i = 0; i < userProfile.following.length; i += 1) {
      if (userProfile.following[i].followingEmail === selectedUser.current.email) {
        alreadyDone.current = true;
        break;
      }
    }
    if (!alreadyDone.current) {
      try {
        // socket.emit('new follow', selectedUser.current.name);
        await axios.post('/account/follow', {
          follower: userProfile,
          followedUser: selectedUser.current,
        });
        userProfile.following.push({ followingEmail: selectedUser.current.email });
      } catch (error) {
        // let's not throw errors in the frontend!
        throw new Error('Error following user.');
      }
    }
    setShowFollow(true);
  }

  async function handleBlock(e) {
    selectedUser.current = matchedUsers[e.target.value];
    alreadyDone.current = false;
    for (let i = 0; i < userProfile.blocked.length; i += 1) {
      if (userProfile.blocked[i].blockedUserEmail === selectedUser.current.email) {
        alreadyDone.current = true;
        break;
      }
    }
    if (!alreadyDone.current) {
      try {
        await axios.post('/account/block', {
          blocker: userProfile,
          blockedUser: selectedUser.current,
        });
        userProfile.blocked.push({ blockedUserEmail: selectedUser.current.email });
      } catch (error) {
        throw new Error('Error blocking user.');
      }
    }
    setShowBlock(true);
  }

  async function showReportBox(e) {
    try {
      const { data } = await axios.post('/account/findUserOnEmail', { email: matchedUsers[e.target.value].email });
      const user = data[0];
      selectedUser.current = user;
    } catch (error) {
      throw new Error('Error finding user on email.');
    }
    alreadyDone.current = false;
    for (let i = 0; i < selectedUser.current.reports.length; i += 1) {
      if (selectedUser.current.reports[i].authorEmail === userProfile.email) {
        alreadyDone.current = true;
        break;
      }
    }
    setShowReport(true);
  }

  async function reportUser() {
    if (!reportContent.current) {
      throw new Error('You must type a reason for reporting this user.');
    }
    try {
      const response = await axios.post('/account/postReport', { recipient: selectedUser.current, reportContent: reportContent.current.value });
      if (response.status === 200) {
        setShowReport(false);
      }
    } catch (error) {
      throw new Error('Error reporting user.');
    }
  }

  function findAverageRating(reviews) {
    const sum = reviews.reduce((acc, curr) => acc + Number(curr.reviewRating), 0);
    return sum / reviews.length;
  }

  return (
    <div>
      Search for user(s) by name, and give them a review, follow them, or block them.
      <div>
        <input type="text" id="search-user-input" style={inputStyle} placeholder="Search for users..." ref={searchInput} />
        <button id="search-user-button" type="submit" style={searchButtonStyle} onClick={searchUsers}>Search</button>
      </div>
      {matchedUsers.length === 0 ? null
        : (
          <div className="box" style={{ marginTop: '2%' }}>
            <div style={{ padding: '1% 2%' }}>
              {matchedUsers.map((user, index) => (
                <div key={user.email} style={tableRow}>
                  <p>
                    {user.name}
                    -
                    {Number.isNaN(findAverageRating(user.reviews))
                      ? 0 : findAverageRating(user.reviews)} stars
                  </p>
                  <div className="table-item">
                    <button type="button" value={index} onClick={showReportBox}>Report</button>
                  </div>
                  <div className="table-item">
                    <button id="search-user-follow" type="button" value={index} onClick={handleFollow}>Follow</button>
                  </div>
                  <div className="table-item">
                    <button type="button" value={index} onClick={handleBlock}>Block</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      <Modal show={showFollow} onHide={() => { setShowFollow(false); }}>
        <Modal.Header id="modal-header" closeButton />
        <Modal.Body>
          {alreadyDone.current ? `You are already following ${selectedUser.current.name}.` : `You are now following ${selectedUser.current.name}.`}
        </Modal.Body>
      </Modal>
      <Modal show={showBlock} onHide={() => { setShowBlock(false); }} backdrop="static" keyboard={false}>
        <Modal.Header closeButton />
        <Modal.Body>
          {alreadyDone.current ? `You have already blocked ${selectedUser.current.name}.`
            : `${selectedUser.current.name} is now blocked and you will no longer receive any messages or listings from them.`}
        </Modal.Body>
      </Modal>
      <Modal show={showReport} onHide={() => { setShowReport(false); }} backdrop="static" keyboard={false}>
        <Modal.Header closeButton />
        <Modal.Body>
          {alreadyDone.current ? `You have already reported ${selectedUser.current.name}.`
            : (
              <div>
                Why are you reporting this user?
                <br />
                <textarea ref={reportContent} style={{ width: '100%' }} />
              </div>
            )}
        </Modal.Body>
        {alreadyDone.current ? null
          : (
            <Modal.Footer>
              <button type="button" onClick={reportUser}>Report</button>
            </Modal.Footer>
          )}
      </Modal>
    </div>
  );
};

export default SearchUsers;
