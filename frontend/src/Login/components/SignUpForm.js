import React, { useEffect, useState } from 'react';
import {
  Form, Button, Modal, Alert,
} from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { data } from '../data/index';

const SignUpForm = ({ showSignUp, setShowSignUp }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState(0);
  const [year, setYear] = useState(0);
  const [school, setSchool] = useState('');
  const [classYear, setClassYear] = useState(0);
  const [major, setMajor] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const checkValidNameHandler = () => {
    if ((firstName && !firstName.match(/^[a-zA-Z]+$/)) || (lastName && !lastName.match(/^[a-zA-Z]+$/))) {
      return (
        <Alert variant="danger">
          Please enter an alphabetic name only!
        </Alert>
      );
    }
    return null;
  };

  const checkStrongPassword = () => {
    if (password && password.length < 8) {
      return (
        <Alert variant="danger">
          Your password must be at least 8 characters long!
        </Alert>
      );
    }
    return null;
  };

  const signup = async (event) => {
    event.preventDefault();
    console.log(`${email} | ${firstName} ${lastName} | ${password} | ${month} | ${day} | ${year} | ${major} | ${school} | ${classYear}`);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    try {
      const response = await axios.post(
        'http://localhost:8080/account/signup',
        {
          email,
          firstName,
          lastName,
          password,
          month,
          day,
          year,
          major,
          school,
          classYear,
        },
        config,
      ).then(() => navigate('/'));
    } catch (error) {
      setErrorMessage(`Your first and last name only contains letters, 
      You are using a Penn email that doesn't already have an account, 
      You selected the correct school, major, and class year`);
    }
  };

  return (
    <Modal show={showSignUp} onHide={() => setShowSignUp(false)}>
      <Modal.Header closeButton>
        <Modal.Title>
          Create your account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage ? (
          <Alert variant="danger">
            There was an error with creating your account. Please check the following:
            <ul>
              {errorMessage.split(', \n').map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
          </Alert>
        ) : null}
        {checkValidNameHandler()}
        {checkStrongPassword()}
        <Form
          className="card p-3 bg-light"
          id="signup-form"
          onSubmit={signup}
        >
          <Form.Group className="mb-3" controlId="signUpFormName" style={{ display: 'flex', flexDirection: 'row' }}>
            <Form.Control type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            <Form.Control type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="signUpFormPennEmail">
            <Form.Control type="email" placeholder="Penn Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="signUpFormPassword">
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="signUpFormBirthday">
            <Form.Label className="text-muted">Birthday</Form.Label>
            <Form.Group className="mb-3" controlId="signUpFormBirthdaySelect" style={{ display: 'flex', flexDirection: 'row' }}>
              <Form.Select value={month} onChange={(e) => setMonth(e.target.value)} required>
                <option value="">Month</option>
                {data.months.map((m) => <option key={uuidv4()}>{m}</option>)}
              </Form.Select>
              <Form.Select value={day} onChange={(e) => setDay(e.target.value)} required>
                <option value="">Day</option>
                {data.days.map((d) => <option key={uuidv4()}>{d}</option>)}
              </Form.Select>
              <Form.Select value={year} onChange={(e) => setYear(e.target.value)} required>
                <option value="">Year</option>
                {data.years.map((y) => <option key={uuidv4()}>{y}</option>)}
              </Form.Select>
            </Form.Group>
          </Form.Group>
          <Form.Group className="mb-3" controlId="signUpFormSchoolAndYear">
            <Form.Label className="text-muted">School, Major, and Class Year</Form.Label>
            <Form.Group className="mb-3" controlId="signUpFormSchoolAndYearSelect" style={{ display: 'flex', flexDirection: 'row' }}>
              <Form.Select
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                required
              >
                <option value="">School</option>
                {data.schools.map((s) => <option key={uuidv4()}>{s}</option>)}
              </Form.Select>
              <Form.Select
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                required
              >
                <option value="">Major</option>
                {data.majors.map((m) => <option key={uuidv4()}>{m.name}</option>)}
              </Form.Select>
              <Form.Select
                value={classYear}
                onChange={(e) => setClassYear(e.target.value)}
                required
              >
                <option value="">Class Year</option>
                {data.schoolYears.map((cy) => <option key={uuidv4()}>{cy}</option>)}
              </Form.Select>
            </Form.Group>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowSignUp(false)}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" form="signup-form" disabled={(!firstName.match(/^[a-zA-Z]+$/)) || (lastName && !lastName.match(/^[a-zA-Z]+$/)) || (password.length < 8)}>
          Create Account
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignUpForm;
