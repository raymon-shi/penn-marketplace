import { React, useState, useEffect } from 'react';
import '../styles/Checkout.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Checkout = () => {
  const [num, setNum] = useState(0);
  const [exp, setExp] = useState('');
  const [cvc, setCVC] = useState(0);
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [cart, setCart] = useState([]);

  const getCart = async () => {
    try {
      const userCart = await axios.get('/buyer/cart');
      setCart(userCart.data);
    } catch (error) {
      throw new Error('Error with loading cart');
    }
  };

  useEffect(() => {
    getCart();
  }, []);

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

  const listItems = cart.map((d) => (
    <li className="cart-list" key={d._id}>
      <div className="cart-leftPaneItem">
        <h3 style={{ paddingTop: '10px' }}>Seller: {d.posterName} </h3>
        <hr className="cart-solid" />
        {d.media && d.media !== ''
          ? (
            <div className="cart-image">
              <img src={d.media} alt="product" width="200" height="200" />
            </div>
          )
          : <div />}
        <div style={{ float: 'right', paddingRight: '50px' }}>
          {d.bidHistory ? (<p>Your bid: ${d.price}</p>) : <p>Price: ${d.price}</p>}
        </div>
        <div style={{ marginLeft: '210px' }}>
          <h4>{d.itemName}</h4>
          <p>{d.itemDescr}</p>
        </div>
      </div>
    </li>
  ));

  const subTotal = cart.map((item) => item.price).reduce((prev, curr) => prev + curr, 0);

  return (
    <div className="background">
      <h2 className="cart">Checkout ({cart.length} items)</h2>
      <div className="cart-splitScreen">
        <div className="cart-leftPane">
          {listItems}
        </div>
        <div className="cart-rightPane">
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
              Total ({cart.length} items): ${subTotal}
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

export default Checkout;
