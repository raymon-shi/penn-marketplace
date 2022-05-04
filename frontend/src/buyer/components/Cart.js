import React, { useEffect, useState } from 'react';
import '../styles/Cart.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
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

  const handleRemoveReg = async (id) => {
    try {
      await axios.post(`/buyer/removeCartRegItem/${id}`);
      getCart();
    } catch (error) {
      throw new Error(`Error with removing item with id:${id} from cart`);
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    navigate('/CartCheckout');
  };

  useEffect(() => {
    getCart();
  }, []);

  const listItems = cart.map((d) => (
    <li className="cart-list" key={d._id || d.item._id}>
      <div className="cart-leftPaneItem">
        <div>
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
            <p>Price: ${d.price}</p>
          </div>
          <div style={{ marginLeft: '210px' }}>
            <h4>{d.itemName}</h4>
            <p className="w-100">{d.itemDescr}</p>
            <button className="removeButton" type="button" onClick={() => handleRemoveReg(d._id)}>Remove from Cart</button>
          </div>
        </div>
      </div>
    </li>
  ));

  const subTotal = cart.map((item) => item.price).reduce((prev, curr) => prev + curr, 0);
  let btn = false;
  if (subTotal <= 0) {
    btn = true;
  }

  return (
    <div className="background">
      <h2 className="cart">Shopping Cart ({cart.length} items)</h2>
      <div className="cart-splitScreen">
        <div className="cart-leftPane">
          {listItems}
        </div>
        <div className="cart-rightPane">
          <p style={{ textAlign: 'center', width: '100%' }}><b>Items ({cart.length}): ${subTotal}</b></p>
          <div className="cart-center">
            <button className="checkoutButton" type="submit" onClick={handleCheckout} disabled={btn}>Go To Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
