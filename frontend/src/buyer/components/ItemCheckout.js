import { React, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Checkout.css';
import axios from 'axios';

const ItemCheckout = () => {
  const [num, setNum] = useState(0);
  const [exp, setExp] = useState('');
  const [cvc, setCVC] = useState(0);
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const { state } = useLocation();
  const {
    listing, bid, currBid, isBidItem,
  } = state;
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (bid) {
      setTotal(bid);
    } else {
      setTotal(listing.price);
    }
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
    if (listing.bidHistory) {
      // add bid to listing -> create transaction -> add transaction to user history
      await axios.post(`/buyer/addBid/${listing._id}`, { bid });
      // const purchase = await axios.post(
      //   '/buyer/bidTransaction',
      //   {
      //     sellerName: listing.posterName,
      //     listingBid: listing._id,
      //     totalCost: bid,
      //     info,
      //   },
      // );
      // console.log(purchase.data);
      // await axios.post('/buyer/addTransaction', { transaction: purchase.data });
      navigate('/');
    } else {
      // create reg item transaction -> add transaction to user history
      const purchase = await axios.post(
        '/buyer/regTransaction',
        {
          sellerName: listing.posterName,
          listingRegular: listing,
          totalCost: listing.price,
          info,
        },
      );
      await axios.post('/buyer/addTransaction', { transaction: purchase.data });
      navigate('/');
    }
  };

  return (
    <div className="background">
      <h2 className="checkout">{isBidItem ? 'Confirm Bid' : 'Item Checkout'}</h2>
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
            <p className="checkout-text">Listed by: {listing.posterName}</p>
            <p className="checkout-text">{listing.itemDescr}</p>
            <hr className="checkout-solid" />
            {listing.bidHistory
              ? (
                <div>
                  <p className="checkout-text">Highest Bid: <b>US ${currBid}</b></p>
                  <p className="checkout-text">Your Bid: <b>US ${bid}</b></p>
                </div>
              )
              : <p className="checkout-text">Price: <b>US ${listing.price}</b></p>}
          </div>
        </div>
        <div className="checkout-info">
          <div className="checkout-card">
            <h3>Pay With</h3>
            <form className="checkout-center" onSubmit={handleSubmit} id="ccinfo">
              <input type="number" placeholder="Card Number" onChange={onChangeNum} required />
              <div>
                <input type="month" placeholder="Exp. Date" onChange={onChangeExp} required />
                <input type="number" placeholder="CVC" onChange={onChangeCVC} required />
              </div>
              <div>
                <input type="text" placeholder="First Name" onChange={onChangeFirst} required />
                <input type="text" placeholder="Last Name" onChange={onChangeLast} required />
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
              Total: ${total}
            </p>
            <hr className="checkout-solid" />
            <div className="checkout-center">
              <input className="payButton" form="ccinfo" type="submit" value={isBidItem ? 'Confirm Bid' : 'Confirm and Pay'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCheckout;
