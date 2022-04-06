import { Button, Container } from 'react-bootstrap';
import React from 'react';
import nextButton from '../assets/next-button-icon.png';
import backButton from '../assets/back-button-icon.png';

// const styles = StyleSheet.create({
//   container: {
//     display: 'flex',
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

const SearchPagination = () => (
  <div style={{ margin: 'auto', justifyContent: 'center', backgroundColor: 'white' }}>
    <input type="image" alt="next" src={backButton} height="20px" width="20px" style={{ backgroundColor: 'white' }} />
    <h1 style={{ textAlign: 'center' }}> 1 of 2 </h1>
    <input type="image" alt="next" src={nextButton} height="20px" width="20px" alignSelf="center" />
  </div>
);

export default SearchPagination;
