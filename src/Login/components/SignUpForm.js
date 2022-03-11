import React, { useState } from 'react';
import {
  Form, Button, Container, Modal,
} from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import Select from 'react-select';
import { data } from '../data/index';

const SignUpForm = ({ showSignUp, setShowSignUp }) => {
  const [newUsername, setNewUsername] = useState('');
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
        <Form className="card p-3 bg-light">
          <Form.Group className="mb-3" controlId="signUpFormName">
            <Form.Control type="text" placeholder="Name" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="signUpFormPennEmail">
            <Form.Control type="email" placeholder="Penn Email" value={newPennEmail} onChange={(e) => setNewPennEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="signUpFormPassword">
            <Form.Control type="password" placeholder="Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="signUpFormBirthday">
            <Form.Label className="text-muted">Birthday</Form.Label>
            <Form.Group className="mb-3" controlId="signUpFormBirthdaySelect" style={{ display: 'flex', flexDirection: 'row' }}>
              <Select
                style={{ width: '100px' }}
                isSearchable={false}
                defaultValue={{ label: 'Month', value: 0 }}
                onChange={(e) => setNewMonth(e.value)}
                options={
                data.months.map((month) => (
                  {
                    value: month,
                    label: month,
                  }
                ))
              }
              />
              <Select
                isSearchable={false}
                defaultValue={{ label: 'Day', value: 0 }}
                onChange={(e) => setNewDay(e.value)}
                options={
                data.days.map((day) => (
                  {
                    value: day,
                    label: day,
                  }
                ))
              }
              />
              <Select
                isSearchable={false}
                defaultValue={{ label: 'Year', value: 0 }}
                onChange={(e) => setNewYear(e.value)}
                options={
                data.years.map((year) => (
                  {
                    value: year,
                    label: year,
                  }
                ))
              }
              />
            </Form.Group>
          </Form.Group>
          <Form.Group className="mb-3" controlId="signUpFormSchoolClassYear">
            <Form.Label className="text-muted">School and Class Year</Form.Label>
            <Form.Group className="mb-3" controlId="signUpFormBirthdaySelect" style={{ display: 'flex', flexDirection: 'row' }}>
              <Select
                isSearchable={false}
                defaultValue={{ label: 'School', value: 0 }}
                onChange={(e) => setNewSchool(e.value)}
                options={
                data.schools.map((school) => (
                  {
                    value: school,
                    label: school,
                  }
                ))
              }
              />
              <Select
                isSearchable={false}
                defaultValue={{ label: 'School Year', value: 0 }}
                onChange={(e) => setNewSchoolYear(e.value)}
                options={
                data.schoolYears.map((schoolYear) => (
                  {
                    value: schoolYear,
                    label: schoolYear,
                  }
                ))
              }
              />
            </Form.Group>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowSignUp(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => setShowSignUp(false)}>
          Create Account
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignUpForm;
