import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Item.css';

const BidItem = () => {
  // retrieve information about the specific item (from Homepage.js when you click on a slide)
  const { state } = useLocation();
  const { itemId } = state;

  const [listing, setListing] = useState({});

  const getBidListing = async () => {
    try {
      const item = await axios.get(`/buyer/getBidListing/${itemId}`);
      setListing(item.data);
    } catch (error) {
      throw new Error(`Error with retrieving item with id ${itemId}`);
    }
  };

  useEffect(() => {
    getBidListing();
  }, []);

  const handleCart = (event) => {

  };

  return (
    <div className="item-container">
      <div className="item-col">
        <a href="/" aria-label="link to listings page">Back to listings</a>
        {listing.media && listing.media !== ''
          ? (
            <img className="item-image" src={listing.media} alt="product" />
          )
          : <div />}        <p className="item-text">Tags: {listing.tag}</p>
      </div>
      <div className="item-col">
        <h1>{listing.itemName}</h1>
        <hr className="item-solid" />
        <p className="item-text">{listing.itemDescr}</p>
        <hr className="item-solid" />
        <div>
          <p className="item-text">Current Bid: <b>US ${listing.price}</b></p>
          <input
            type="number"
            id="bid"
            name="bid"
            min={listing.price + 1}
            step="1"
            placeholder="Enter Bid"
          />
          <p>Enter ${listing.price + 1} or more!</p>
        </div>
        <a href="/checkout" className="buyButton">Place Bid Now</a>
        <a href="/cart" className="cartButton" onClick={handleCart}>Add To Cart</a>
      </div>
      <div className="item-seller">
        <h1>Seller Information</h1>
        <h4>{listing.posterName}</h4>
        <div>
          <button type="submit">Contact Seller</button>
        </div>
        <div>
          <button type="submit">Follow Seller</button>
        </div>
        <div>
          <button type="submit">Report Item</button>
        </div>
      </div>
    </div>
  );
};

export default BidItem;
