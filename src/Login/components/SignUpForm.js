import React, { useEffect, useState } from 'react';
import {
  Form, Button, Modal, Alert,
} from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { data } from '../data/index';

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
  const [validFirstName, setValidFirstName] = useState(false);
  const [validLastName, setValidLastName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [formError, setFormError] = useState(false);

  const baseURL = `https://esb.isc-seo.upenn.edu/8091/open_data/directory?first_name=${newFirstName}&last_name=${newLastName}&email=${newPennEmail}`;
  const proxy = 'https://cors-anywhere.herokuapp.com/';

  const init = {
    method: 'GET',
    headers: {
      'Authorization-Bearer': 'UPENN_OD_enPs_1005844',
      'Authorization-Token': 'gi2md86hljr7tgm7fcbp79np2n',
    },
  };

  const lookupPennUser = async () => {
    const response = await fetch(new Request(proxy + baseURL), init);
    const userInfo = await response.json();
    if (userInfo.result_data.length) {
      // set true
      console.log('Valid User');
    } else {
      // set false
      console.log('Invalid User');
    }
  };

  const checkValidNameHandler = () => {
    if ((newFirstName && !newFirstName.match(/^[a-zA-Z]+$/)) || (newLastName && !newLastName.match(/^[a-zA-Z]+$/))) {
      return (
        <Alert variant="danger">
          Please enter an alphabetic name only!
        </Alert>
      );
    }
    return null;
  };

  const checkStrongPassword = () => {
    // if (newPassword && newPassword.search([/[A-Z]/i]) < 1) {
    //   return (
    //     <Alert variant="danger">
    //       Your password must contain a capital letter!
    //     </Alert>
    //   );
    // }
    // if (newPassword && newPassword.search([/[~!@#$%^&*()-=_+?>]/i]) < 0) {
    //   return (
    //     <Alert variant="danger">
    //       Your password must contain a special character from: [~!@#$%^&*()-=_+?&gt;
    //     </Alert>
    //   );
    // }
    if (newPassword && newPassword.length < 8) {
      return (
        <Alert variant="danger">
          Your password must be at least 8 characters long!
        </Alert>
      );
    }
    return null;
  };

  return (
    <Modal show={showSignUp} onHide={() => setShowSignUp(false)}>
      <Modal.Header closeButton>
        <Modal.Title>
          Create your account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {checkValidNameHandler()}
        {checkStrongPassword()}
        <Form
          className="card p-3 bg-light"
          id="signup-form"
          onSubmit={() => {
            setShowSignUp(false);
            lookupPennUser();
          }}
        >
          <Form.Group className="mb-3" controlId="signUpFormName" style={{ display: 'flex', flexDirection: 'row' }}>
            <Form.Control type="text" placeholder="First Name" value={newFirstName} onChange={(e) => setNewFirstName(e.target.value)} required />
            <Form.Control type="text" placeholder="Last Name" value={newLastName} onChange={(e) => setNewLastName(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="signUpFormPennEmail">
            <Form.Control type="email" placeholder="Penn Email" value={newPennEmail} onChange={(e) => setNewPennEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="signUpFormPassword">
            <Form.Control type="password" placeholder="Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="signUpFormBirthday">
            <Form.Label className="text-muted">Birthday</Form.Label>
            <Form.Group className="mb-3" controlId="signUpFormBirthdaySelect" style={{ display: 'flex', flexDirection: 'row' }}>
              <Form.Select value={newMonth} onChange={(e) => setNewMonth(e.target.value)} required>
                <option value="">Month</option>
                {data.months.map((month) => <option key={uuidv4()}>{month}</option>)}
              </Form.Select>
              <Form.Select value={newDay} onChange={(e) => setNewDay(e.target.value)} required>
                <option value="">Day</option>
                {data.days.map((day) => <option key={uuidv4()}>{day}</option>)}
              </Form.Select>
              <Form.Select value={newYear} onChange={(e) => setNewYear(e.target.value)} required>
                <option value="">Year</option>
                {data.years.map((year) => <option key={uuidv4()}>{year}</option>)}
              </Form.Select>
            </Form.Group>
          </Form.Group>
          <Form.Group className="mb-3" controlId="signUpFormSchoolAndYear">
            <Form.Label className="text-muted">School and Class Year</Form.Label>
            <Form.Group className="mb-3" controlId="signUpFormSchoolAndYearSelect" style={{ display: 'flex', flexDirection: 'row' }}>
              <Form.Select
                value={newSchool}
                onChange={(e) => setNewSchool(e.target.value)}
                required
              >
                <option value="">School</option>
                {data.schools.map((school) => <option key={uuidv4()}>{school}</option>)}
              </Form.Select>
              <Form.Select
                value={newSchoolYear}
                onChange={(e) => setNewSchoolYear(e.target.value)}
                required
              >
                <option value="">Class Year</option>
                {data.schoolYears.map((schoolYear) => <option key={uuidv4()}>{schoolYear}</option>)}
              </Form.Select>
            </Form.Group>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowSignUp(false)}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" form="signup-form" disabled={checkValidNameHandler() || checkStrongPassword()}>
          Create Account
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignUpForm;
