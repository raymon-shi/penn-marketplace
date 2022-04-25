import React from 'react';
import {
  Container, Card,
} from 'react-bootstrap';
import eldenRing from '../assets/elden-ring.png';

const ResultCard = ({
  title, price, lister, image,
}) => (
  <Container style={{ backgroundColor: 'white' }}>
    <img alt="result-alt" key={image} src={eldenRing} style={{ width: 100, height: 100, margin: '8px' }} />
    <div style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
      <h3 style={{ marginTop: '3px' }}>
        {title}
      </h3>
      <h3>
        {price}
      </h3>
      <p style={{ marginLeft: '80px', opacity: '60%' }}>
        {`Listed by ${lister}`}
      </p>
    </div>
  </Container>
);

export default ResultCard;
