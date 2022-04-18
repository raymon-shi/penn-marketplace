import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ResultCard from './ResultCard';
import data from '../data/index';
import SearchPagination from './SearchPagination';

const rows = Math.ceil(data.length / 3);
const items = (Array(rows).fill().map((_, rowIndex) => (
  <Row>
    {
      data.slice(rowIndex * 3, (rowIndex * 3) + 3).map((result) => (
        <Col>
          <ResultCard
            key={`${result.title} ${result.lister} ${result.image}`}
            title={result.title}
            price={result.price}
            lister={result.lister}
            image={result.image}
          />
        </Col>
      ))
    }
  </Row>
)));

const SearchResults = () => (
  <div style={{
    margin: '30px', alignContent: 'center', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', justifyItems: 'center',
  }}
  >
    <h4 style={{ textAlign: 'left' }}>{`${data.length} results for Elden Ring`}</h4>
    {items}
    <SearchPagination />
  </div>
);

export default SearchResults;
