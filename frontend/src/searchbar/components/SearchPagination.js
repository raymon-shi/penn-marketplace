import { Button, Container } from 'react-bootstrap';
import React from 'react';
import nextButton from '../assets/next-button-icon.png';
import backButton from '../assets/back-button-icon.png';

const SearchPagination = () => (
  <div style={{
    marginTop: '20px', display: 'flex', justifyContent: 'center', alignContent: 'center',
  }}
  >
    <input type="image" alt="next" src={backButton} height="20px" width="20px" style={{ marginTop: '5px', backgroundColor: 'white' }} />
    <h4 style={{ textAlign: 'center' }}> 1 of 2 </h4>
    <input type="image" alt="next" src={nextButton} height="20px" width="20px" style={{ marginTop: '5px' }} />
  </div>
);

export default SearchPagination;
