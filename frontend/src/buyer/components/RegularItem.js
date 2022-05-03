import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Item.css';

const RegularItem = ({ username }) => {
  // retrieve information about the specific item (from Homepage.js when you click on a slide)
  const { state } = useLocation();
  const { itemId, posterName } = state;

  const [listing, setListing] = useState({});
  const navigate = useNavigate();

  const getRegListing = async () => {
    try {
      const item = await axios.get(`/buyer/getRegListing/${itemId}`);
      setListing(item.data);
    } catch (error) {
      throw new Error(`Error with retrieving item with id ${itemId}`);
    }
  };

  useEffect(() => {
    getRegListing();
  }, []);

  const handleCart = async (event) => {
    event.preventDefault();
    await axios.post(`/buyer/addCartRegItem/${itemId}`);
    navigate('/cart');
  };

  const handleSave = async (event) => {
    event.preventDefault();
    await axios.post(`/buyer/addWatchRegItem/${itemId}`);
    navigate('/');
  };

  const handleCheckout = (event) => {
    event.preventDefault();
    navigate('/ItemCheckout', { state: { listing, isBidItem: false } });
  };

  return (
    <div className="item-container">
      <div className="item-col">
        <a href="/" aria-label="link to listings page">Back to listings</a>
        {listing.media && listing.media !== ''
          ? (
            <img className="item-image" src={listing.media} alt="product" />
          )
          : <div />}
        <p className="item-text">Tags: {listing.tag}</p>
      </div>
      <div className="item-col">
        <h1>{listing.itemName}</h1>
        <hr className="item-solid" />
        <p className="item-text">{listing.itemDescr}</p>
        <hr className="item-solid" />
        <p className="item-text">Price: <b>US ${listing.price}</b></p>
        { posterName !== username ? (
          <>
            <a href="/ItemCheckout" className="buyButton" onClick={handleCheckout}>Buy It Now</a>
            <a href="/cart" className="cartButton" onClick={handleCart}>Add To Cart</a>
            <a href="/" className="saveButton" onClick={handleSave}>Save to Watchlist</a>
          </>
        ) : (
          null
        )}

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

export default RegularItem;
