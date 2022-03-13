import React, { useState } from 'react';
import StartPage from './StartPage';
import '../styles/Seller.css';

import PriceListing from './PriceListing';

const Seller = () => {
  const [priceListing, setPriceListing] = useState(false);
  const [bidListing, setBidListing] = useState(false);

  return (
    <>
      {!priceListing && !bidListing
        && <StartPage setPriceListing={setPriceListing} setBidListing={setBidListing} />}
      {priceListing && (<PriceListing />)}
    </>
  );
};

export default Seller;
