import React from 'react';
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

  const handleCart = (event) => {

  };

  return (
    <div className="background">
      <a className="item-back" href="/" aria-label="link to listings page">Back to listings</a>
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
              <a href="/checkout" className="buyButton">Buy It Now</a>
            </div>
            <div>
              <a href="/cart" className="cartButton" onClick={handleCart}>Add To Cart</a>
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
