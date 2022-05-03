import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Item.css';

const BidItem = ({ username }) => {
  // retrieve information about the specific item (from Homepage.js when you click on a slide)
  const { state } = useLocation();
  const { itemId, posterName } = state;
  const navigate = useNavigate();

  const [listing, setListing] = useState({});
  const [bid, setBid] = useState(0);
  const [currBid, setCurrBid] = useState(0);

  const getBidListing = async () => {
    try {
      const item = await axios.get(`/buyer/getBidListing/${itemId}`);
      setListing(item.data);
      if (item.data.bidHistory && item.data.bidHistory.length > 0) {
        setCurrBid(item.data.price);
      }
    } catch (error) {
      throw new Error(`Error with retrieving item with id ${itemId}`);
    }
  };

  const acceptBid = async () => {
    try {
      const { data } = await axios.post('/seller/acceptBid', { buyerName: listing.bidHistory.at(-1).bidderName, listingBid: listing, totalCost: currBid });
      await axios.post('/seller/addTransaction', { transaction: data });
    } catch (error) {
      console.log(error);
      console.log('Error in accepting bid');
    }
  };

  useEffect(() => {
    getBidListing();
  }, []);

  const onChangeBid = (event) => {
    setBid(event.target.value);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    await axios.post(`/buyer/addWatchBidItem/${itemId}`);
    navigate('/');
  };

  const handleCheckout = (event) => {
    event.preventDefault();
    navigate('/ItemCheckout', {
      state: {
        listing,
        bid,
        currBid,
        isBidItem: true,
      },
    });
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
        <p className="item-text">Current Bid: <b>US ${currBid}</b> {`(${listing.bidHistory && listing.bidHistory.length > 0 ? listing.bidHistory.at(-1).bidderName : 'none'})`}</p>
        {posterName !== username ? (
          <>
            <div>
              <form id="bidForm" onSubmit={handleCheckout}>
                <input
                  type="number"
                  id="bid"
                  name="bid"
                  min={currBid + 1}
                  step="1"
                  value={bid}
                  placeholder="Enter Bid"
                  onChange={onChangeBid}
                />
              </form>
              <p style={{ width: '100%' }}>Enter ${currBid + 1} or more!</p>
            </div>
            <button className="buyButton" form="bidForm" type="submit" onSubmit={handleCheckout} disabled={!bid}>Place Bid Now</button>
            <button className="cartButton" type="submit" onClick={handleSave}>Save Item</button>
          </>
        ) : (
          <button
            className="buyButton"
            type="button"
            onClick={
            () => {
              acceptBid();
              navigate('/account');
            }
            }
          >Accept Bid
          </button>
        )}
      </div>
      <div className="item-seller">
        <h1>Seller Information</h1>
        <h4>{listing.posterName}</h4>
        <div>
          <button type="button">Follow Seller</button>
        </div>
        <div>
          <button type="button">Report Item</button>
        </div>
      </div>
    </div>
  );
};

export default BidItem;
