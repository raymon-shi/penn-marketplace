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
  const selectedUser = useRef({});
  const alreadyDone = useRef(false);
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [showFollow, setShowFollow] = useState(false);
  const [showBlock, setShowBlock] = useState(false);

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
        await axios.post('/account/follow', {
          follower: userProfile,
          followedUser: selectedUser.current,
        });
        userProfile.following.push({ followingEmail: selectedUser.current.email });
      } catch (error) {
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

  function showReportBox() {

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
                    <button type="button" value={index} onClick={showReportBox}>Review</button>
                  </div>
                  <div className="table-item">
                    <button type="button" value={index} onClick={handleFollow}>Follow</button>
                  </div>
                  <div className="table-item">
                    <button type="button" value={index} onClick={handleBlock}>Block</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      <Modal show={showFollow} onHide={() => { setShowFollow(false); }} backdrop="static" keyboard={false}>
        <Modal.Header closeButton />
        <Modal.Body>
          {alreadyDone.current ? `You are already following ${selectedUser.current.name}.` : `You are now following ${selectedUser.current.name}.`}
        </Modal.Body>
      </Modal>
      <Modal show={showBlock} onHide={() => { setShowBlock(false); }} backdrop="static" keyboard={false}>
        <Modal.Header closeButton />
        <Modal.Body>
          {alreadyDone.current ? `You have already blocked this ${selectedUser.current.name}.`
            : `${selectedUser.current.name} is now blocked and you will no longer receive any messages or listings from them.`}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SearchUsers;
