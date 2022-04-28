import { React, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Checkout.css';
import axios from 'axios';

const ItemCheckout = () => {
  const [num, setNum] = useState(0);
  const [exp, setExp] = useState('');
  const [cvc, setCVC] = useState(0);
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const { state } = useLocation();
  const { listing } = state;

  const onChangeNum = (event) => {
    setNum(event.target.value);
  };

  const onChangeExp = (event) => {
    setExp(event.target.value);
  };

  const onChangeCVC = (event) => {
    setCVC(event.target.value);
  };

  const onChangeFirst = (event) => {
    setFirst(event.target.value);
  };

  const onChangeLast = (event) => {
    setLast(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = `${first} ${last}`;
    const info = {
      name,
      num,
      exp,
      cvc,
      first,
      last,
    };
  };

  return (
    <div className="background">
      <h2 className="checkout">Item Checkout</h2>
      <div className="checkout-container">
        <div className="checkout-item">
          <div>
            {listing.media && listing.media !== ''
              ? (
                <img className="checkout-image" src={listing.media} alt="product" />
              )
              : <div />}
            <p className="checkout-text">Tags: {listing.tag}</p>
          </div>
          <div className="checkout-itemInfo">
            <h1>{listing.itemName}</h1>
            <hr className="checkout-solid" />
            <p className="checkout-text">{listing.itemDescr}</p>
            <hr className="checkout-solid" />
            <p className="checkout-text">Highest Bid: <b>US ${listing.price}</b></p>
            <p className="checkout-text">Your Bid: <b>US ${listing.price}</b></p>
          </div>
        </div>
        <div className="checkout-info">
          <div className="checkout-card">
            <h3>Pay With</h3>
            <form className="checkout-center" onSubmit={handleSubmit} id="ccinfo">
              <input type="number" placeholder="Card Number" onChange={onChangeNum} />
              <div>
                <input type="month" placeholder="Exp. Date" onChange={onChangeExp} />
                <input type="number" placeholder="CVC" onChange={onChangeCVC} />
              </div>
              <div>
                <input type="text" placeholder="First Name" onChange={onChangeFirst} />
                <input type="text" placeholder="Last Name" onChange={onChangeLast} />
              </div>
            </form>
          </div>
          <div className="checkout-confirm">
            <p style={
              {
                width: '100%', textAlign: 'center', fontWeight: 'bolder', fontSize: '20pt',
              }
            }
            >
              Total: ${listing.price}
            </p>
            <hr className="checkout-solid" />
            <div className="checkout-center">
              <input className="payButton" form="ccinfo" type="submit" value="Confirm and Pay" />
            </div>
          </div>
        </div>
      </div>
    </div>
    /*
    <div className="background">
      <h2 className="checkout">Checkout</h2>
      <div className="checkout-container">
        <div className="checkout-item">
          <div className="checkout-itemInfo">
            <h3>Review Item</h3>
            <p className="checkout-text">
              Seller:
              {sellerName}
              {' '}
              (
              {sellerRating}
              %)
            </p>
            <img className="checkout-image" src={chair} alt="product" />
            <p className="checkout-text">Tags: {tags}</p>
          </div>
          <div className="checkout-itemInfo">
            <h4>{productName}</h4>
            <hr className="checkout-solid" />
            {isBid
              ? (
                <div>
                  <p className="checkout-text">Current Bid: <b>US ${price}</b></p>
                  <p className="checkout-text">Your Bid: <b>US ${bid}</b></p>
                </div>
              )
              : <p className="checkout-text">Price: <b>US ${price}</b></p>}
            <hr className="checkout-solid" />
            <p className="checkout-text">{desc}</p>
          </div>
        </div>
        <div className="checkout-info">
          <div className="checkout-card">
            <h3>Pay With</h3>
            <form className="checkout-center" onSubmit={handleSubmit} id="ccinfo">
              <input type="number" placeholder="Card Number" onChange={onChangeNum} />
              <div>
                <input type="month" placeholder="Exp. Date" onChange={onChangeExp} />
                <input type="number" placeholder="CVC" onChange={onChangeCVC} />
              </div>
              <div>
                <input type="text" placeholder="First Name" onChange={onChangeFirst} />
                <input type="text" placeholder="Last Name" onChange={onChangeLast} />
              </div>
            </form>
          </div>
          <div className="checkout-confirm">
            {isBid ? <h2>Your Bid: {bid}</h2>
              : (
                <div>
                  <p style={{ textAlign: 'center', width: '100%' }}>Subtotal (1 item): ${price} </p>
                  <p style={{ textAlign: 'center', width: '100%' }}>Discount: $0.00 </p>
                  <p style={{ textAlign: 'center', width: '100%' }}>Tax: $0.00 </p>
                </div>
              )}
            <hr className="checkout-solid" />
            {isBid ? <b>Order total: ${bid}</b> : <b>Order total: ${price}</b>}
            <div className="checkout-center">
              <input className="payButton" form="ccinfo" type="submit" value="Confirm and Pay" />
            </div>
          </div>
        </div>
      </div>
    </div>
    */
  );
};

export default ItemCheckout;
