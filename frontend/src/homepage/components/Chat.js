import React, {
  useEffect, useState, useRef, useContext,
} from 'react';
import {
  Form, Button, Offcanvas, Modal, Alert,
} from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { SocketContext } from './Socket';

const Chat = ({ showFriends, setShowFriends }) => {
  const [friends, setFriends] = useState([]);
  const [friendError, setFriendError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [friendName, setFriendName] = useState('');
  const [friendEmail, setFriendEmail] = useState('');
  const [msgInput, setMsgInput] = useState('');
  const [msgs, setMsgs] = useState([]);
  const friendNameRef = useRef('');
  const socket = useContext(SocketContext);

  const getFollowingFriends = async () => {
    try {
      const { data } = await axios.get('/chat/followed');
      setFriends(data);
      setFriendError('');
    } catch (error) {
      setFriendError('There was an error getting followed');
    }
  };

  const sendMessage = async () => {
    try {
      await axios.post('/chat/sendMessage', { receiver: friendName, message: msgInput });
      setMsgInput('');
      socket.emit('new message', friendName);
    } catch (error) {
      alert('Error retrieving messages');
    }
  };

  const getMessages = async () => {
    try {
      const { data } = await axios.get('/chat/messages', { params: { name: friendNameRef.current } });
      setMsgs(data);
    } catch (error) {
      alert('Error getting messages');
    }
  };

  useEffect(() => {
    getFollowingFriends();
  }, []);

  useEffect(() => {
    getMessages();
  }, [friendName]);

  useEffect(() => {
    getMessages();
    const intervalID = setInterval(() => {
      getMessages();
    }, 2000);
    return () => clearInterval(intervalID);
  }, []);

  return (
    <>
      <Offcanvas show={showFriends} onHide={() => setShowFriends(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Friends</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {friendError !== '' && (
            <Alert variant="danger">
              <p>{friendError}</p>
            </Alert>
          )}
          {friends.map((entry) => (
            <Button
              key={uuidv4()}
              onClick={() => {
                setFriendName(entry.followingName);
                friendNameRef.current = entry.followingName;
                setFriendEmail(entry.followingEmail);
                setShowModal(true);
              }}
              className="btn-sm mt-2"
              style={{ backgroundColor: '#011F5B', borderColor: '#011F5B', width: '100%' }}
            >
              {entry.followingName}
            </Button>
          ))}
        </Offcanvas.Body>
      </Offcanvas>
      <Modal centered size="lg" show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{friendName}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: '50vh', overflow: 'auto' }}>
          {msgs.map((m) => (
            <div key={uuidv4()} className="message d-flex justify-content-between">
              <li key={uuidv4()} style={{ listStyle: 'none' }}>
                <b>{`${m.sender}`}</b>
                {`: ${m.message}`}
              </li>
              <span className="message-timestamp">
                <em>{`${new Date(m.createdAt).getMonth() + 1}-${new Date(m.createdAt).getDate()}-${new Date(m.createdAt).getFullYear()}`}</em> |
                {new Date(m.createdAt).toLocaleTimeString([], { hour: 'numeric', hour12: true, minute: 'numeric' })}
              </span>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer className="flex-column">
          <Form.Group className="my-3" style={{ width: '100%' }}>
            <Form.Control as="textarea" value={msgInput} onChange={(e) => setMsgInput(e.target.value)} rows={3} />
          </Form.Group>
          <Button className="align-self-end border shadow-sm" variant="light" disabled={msgInput === ''} onClick={sendMessage}>
            Send Message
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Chat;
