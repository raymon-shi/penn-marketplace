import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import ResultCard from './ResultCard';
import SearchPagination from './SearchPagination';

const SearchResults = () => {
  const { state } = useLocation();
  const { query } = state;
  const [listings, setListings] = useState([]);
  async function getListings() {
    try {
      const { data } = await axios.post('/item/search', {
        filter: query,
      });
      if (data && data.length > 0) {
        setListings(data.reverse());
      }
    } catch (error) {
      throw new Error('Error searching for items');
    }
  }

  useEffect(() => {
    getListings();
  }, []);

  const rows = Math.ceil(listings.length / 3);
  const items = (Array(rows).fill().map((_, rowIndex) => (
    <Row>
      {
        listings.slice(rowIndex * 3, (rowIndex * 3) + 3).map((result) => (
          <Col>
            <ResultCard
              key={result.id}
              title={result.itemName}
              price={result.price}
              lister={result.posterName}
              tag={result.tag}
              image={result.media}
            />
          </Col>
        ))
      }
    </Row>
  )));

  return (
    <div style={{
      margin: '30px', alignContent: 'center', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', justifyItems: 'center',
    }}
    >
      <h4 style={{ textAlign: 'left' }}>{`${listings.length} results for ${query}`}</h4>
      {items}
      <SearchPagination />
    </div>
  );
};

export default SearchResults;
