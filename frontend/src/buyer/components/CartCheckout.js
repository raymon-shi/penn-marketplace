import { React, useState, useEffect } from 'react';
import '../styles/Checkout.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartCheckout = () => {
  const [num, setNum] = useState(0);
  const [exp, setExp] = useState('');
  const [cvc, setCVC] = useState(0);
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

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
    const results = [];
    cart.map(async (item) => {
      const purchase = await axios.post(
        '/buyer/regTransaction',
        {
          sellerName: item.posterName,
          listingRegular: item,
          totalCost: item.price,
          info,
        },
      );
      await axios.post('/buyer/addTransaction', { transaction: purchase.data });
      await axios.post(`/buyer/removeCartRegItem/${item._id}`);
    });
    navigate('/');
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
          <p className="w-100">{d.itemDescr}</p>
        </div>
      </div>
    </li>
  ));

  const subTotal = cart.map((item) => item.price).reduce((prev, curr) => prev + curr, 0);

  return (
    <div className="background">
      <h2 className="cart">Cart Checkout ({cart.length} items)</h2>
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
  );
};

export default CartCheckout;
