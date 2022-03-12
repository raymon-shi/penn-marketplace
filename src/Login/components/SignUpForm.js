import React, { useState } from 'react';
import {
  Form, Button, Container, Modal,
} from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { apiData, data } from '../data/index';

const SignUpForm = ({ showSignUp, setShowSignUp }) => {
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newPennEmail, setNewPennEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newMonth, setNewMonth] = useState('');
  const [newDay, setNewDay] = useState(0);
  const [newYear, setNewYear] = useState(0);
  const [newSchool, setNewSchool] = useState('');
  const [newSchoolYear, setNewSchoolYear] = useState(0);

  return (
    <Modal show={showSignUp} onHide={() => setShowSignUp(false)}>
      <Modal.Header closeButton>
        <Modal.Title>
          Create your account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          className="card p-3 bg-light"
          id="signup-form"
          onSubmit={() => {
            setShowSignUp(false);
          }}
        >
          <Form.Group
            className="mb-3"
            controlId="signUpFormName"
            style={{ display: 'flex', flexDirection: 'row' }}
          >
            <Form.Control
              type="text"
              placeholder="First Name"
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
              required
            />
            <Form.Control
              type="text"
              placeholder="Last Name"
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="signUpFormPennEmail"
          >
            <Form.Control
              type="email"
              placeholder="Penn Email"
              value={newPennEmail}
              onChange={(e) => setNewPennEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="signUpFormPassword"
          >
            <Form.Control
              type="password"
              placeholder="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="signUpFormBirthday"
          >
            <Form.Label
              className="text-muted"
            >
              Birthday
            </Form.Label>
            <Form.Group
              className="mb-3"
              controlId="signUpFormBirthdaySelect"
              style={{ display: 'flex', flexDirection: 'row' }}
            >
              <Form.Select
                required
                defaultValue="Month"
                value={newMonth}
                onChange={(e) => setNewMonth(e.target.value)}
              >
                <option value="">Month</option>
                {data.months.map(
                  (month) => <option key={uuidv4()} value={{ month }}>{month}</option>,
                )}
              </Form.Select>
              <Form.Select
                required
                defaultValue="Day"
                value={newDay}
                onChange={(e) => setNewDay(e.target.value)}
              >
                <option value="">Day</option>
                {data.days.map(
                  (day) => <option key={uuidv4()} value={{ day }}>{day}</option>,
                )}
              </Form.Select>
              <Form.Select
                required
                defaultValue="Year"
                value={newYear}
                onChange={(e) => setNewYear(e.target.value)}
              >
                <option value="">Year</option>
                {data.years.map(
                  (year) => <option key={uuidv4()} value={{ year }}>{year}</option>,
                )}
              </Form.Select>
            </Form.Group>
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="signUpFormSchoolClassYear"
          >
            <Form.Label
              className="text-muted"
            >
              School and Class Year
            </Form.Label>
            <Form.Group
              className="mb-3"
              controlId="signUpFormSchoolSelect"
              style={{ display: 'flex', flexDirection: 'row' }}
            >
              <Form.Select
                required
                defaultValue="School"
                value={newSchool}
                onChange={(e) => setNewSchool(e.target.value)}
              >
                <option value="">School</option>
                {data.schools.map(
                  (school) => <option key={uuidv4()} value={{ school }}>{school}</option>,
                )}
              </Form.Select>
              <Form.Select
                required
                defaultValue="Class Year"
                value={newSchoolYear}
                onChange={(e) => setNewSchoolYear(e.target.value)}
              >
                <option value="">Class Year</option>
                {data.years.map(
                  (year) => <option key={uuidv4()} value={{ year }}>{year}</option>,
                )}
              </Form.Select>
            </Form.Group>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowSignUp(false)}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          type="submit"
          form="signup-form"
        >
          Create Account
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignUpForm;
