/* eslint-disable max-len */
import React, { useState } from 'react';
import Start from './Start';
import '../styles/Seller.css';

import PriceListing from './PriceListing';
import BidListing from './BidListing';
import Success from './Success';

const Seller = () => {
  const [priceListing, setPriceListing] = useState(false);
  const [bidListing, setBidListing] = useState(false);
  const [successPage, setSuccessPage] = useState(false);

  const renderStart = () => (
    (!priceListing && !bidListing && !successPage) ? (<Start setPriceListing={() => setPriceListing(true)} setBidListing={() => setBidListing(true)} />) : null
  );

  const renderRegListing = () => (
    priceListing ? (<PriceListing onSubmit={() => { setPriceListing(false); setSuccessPage(true); }} onBack={() => setPriceListing(false)} />) : null
  );

  const renderBidListing = () => (
    bidListing ? (<BidListing onSubmit={() => { setBidListing(false); setSuccessPage(true); }} onBack={() => setBidListing(false)} />) : null
  );

  const renderSuccess = () => (
    successPage ? (<Success setSuccessPage={setSuccessPage} />) : null
  );

  return (
    <div className="seller-page">
      {renderStart()}
      {renderRegListing()}
      {renderBidListing()}
      {renderSuccess()}
    </div>
  );
};

export default Seller;
