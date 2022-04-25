import React from 'react';
import {
  Container, Card,
} from 'react-bootstrap';

const ResultCard = ({
  key, title, price, lister, tag, image,
}) => (
  <Container style={{ backgroundColor: 'white' }}>
    <img alt="result-alt" key={image} src={image} style={{ width: 100, height: 100, margin: '8px' }} />
    <div style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
      <h3 style={{ marginTop: '3px' }}>
        {title}
      </h3>
      <h3>
        {price}
      </h3>
      <p style={{ marginLeft: '285px', opacity: '60%' }}>
        {`Listed by ${lister}`}
      </p>
    </div>
  </Container>
);

export default ResultCard;
