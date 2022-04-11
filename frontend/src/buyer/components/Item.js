import React from 'react';
import { useLocation } from 'react-router-dom';
import chair from '../assets/chair.png';
import '../styles/Item.css';

const Item = () => {
  // temp variables for product and seller information
  const productName = 'Product Name';
  const desc = 'Product description: some details about the prodcut here.';
  const price = 159.99;
  const tags = 'Gaming, Housing & Furniture';
  const sellerName = 'Raymon Shi';
  const sellerRating = 90;
  let button = '';
  const isBid = false;

  // retrieve information about the specific item
  const { state } = useLocation();
  const { itemId } = state;
  console.log(itemId);

  if (isBid) {
    button = 'Place Bid';
  } else {
    button = 'Buy It Now';
  }

  const bid = (
    <div>
      <input type="number" id="bid" name="bid" min={price} />
    </div>
  );

  const handleBuy = (event) => {
    event.preventDefault();
    console.log('Buy!');
  };

  const handleCart = (event) => {
    event.preventDefault();
    console.log('Added to Cart!');
  };

  return (
    <div className="background">
      <button type="submit" className="item-back">‹ Back to listings</button>
      <div className="item-splitScreen">
        <div className="item-leftPane">
          <div className="item-leftPaneCol">
            <img className="item-image" src={chair} alt="product" />
            <p>Tags: {tags}</p>
          </div>
          <div className="item-leftPaneCol">
            <h1>{productName}</h1>
            <hr className="item-solid" />
            <p>{desc}</p>
            <hr className="item-solid" />
            {isBid
              ? (
                <div>
                  <p className="item-desc">Current Bid: <b>US ${price}</b></p>
                  <input type="number" id="bid" name="bid" min={price + 1} step="1" placeholder="Enter Bid" />
                  <p>Enter ${price + 1} or more</p>
                </div>
              )
              : <p className="item-desc">Price: <b>US ${price}</b></p>}
            <div>
              <button type="submit" className="buyButton" onClick={handleBuy}>Buy It Now</button>
            </div>
            <div>
              <button type="submit" className="cartButton" onClick={handleCart}>Add To Cart</button>
            </div>
          </div>
        </div>
        <div className="item-rightPane">
          <h1>Seller Information</h1>
          <p>{sellerName} ({sellerRating}%)</p>
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
    </div>
  );
};

export default Item;
