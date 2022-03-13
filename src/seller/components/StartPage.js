import React, { useState } from 'react';
import PriceListing from './PriceListing';

const StartPage = ({ setPriceListing, setBidListing }) => {
  const x = 1;

  return (
    <>
      <h1>Create a New Listing</h1>
      <button type="button" onClick={() => setPriceListing(true)}>List for a set price</button>
      <button type="button" onClick={() => setBidListing(true)}>List as a bid</button>
    </>
  );
};

export default StartPage;
