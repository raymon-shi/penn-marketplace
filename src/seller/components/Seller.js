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

  return (
    <div className="seller-page">
      {!priceListing && !bidListing && !successPage
        && (
        <Start
          setPriceListing={() => setPriceListing(true)}
          setBidListing={() => setBidListing(true)}
        />
        )}

      {priceListing && (
      <PriceListing onSubmit={() => {
        setPriceListing(false);
        setSuccessPage(true);
      }}
      />
      )}

      {bidListing && (
      <BidListing onSubmit={() => {
        setBidListing(false);
        setSuccessPage(true);
      }}
      />
      )}

      {successPage && (
      <Success setSuccessPage={setSuccessPage} />)}
    </div>
  );
};

export default Seller;
