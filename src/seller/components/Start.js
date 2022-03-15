import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const StartPage = ({ setPriceListing, setBidListing }) => (
  <div className="start-page">
    <h1>Create a New Listing</h1>
    <div className="buttons mt-5">
      <Button type="button" className="btn-lg shadow-sm" onClick={() => setPriceListing()}>
        List for a set price
        <i className="fa-solid fa-tag my-auto" />
      </Button>
      <Button type="button" className="btn-lg shadow-sm" onClick={() => setBidListing()}>
        List as a bid
        <i className="fa-solid fa-gavel my-auto" />
      </Button>
    </div>
  </div>
);

export default StartPage;
