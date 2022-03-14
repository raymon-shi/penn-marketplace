import '../styles/Checkout.css';
import chair from '../assets/chair.png';
import { useState } from 'react';

function Checkout() {
    const [num, setNum] = useState(0);
    const [exp, setExp] = useState('');
    const [cvc, setCVC] = useState(0);
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');

    // temp variables for product and seller information
    const productName = "Product Name";
    const desc = "Product description: some details about the prodcut here.";
    const price = 159.99;
    const tags = "Gaming, Housing & Furniture";
    const sellerName = "Raymon Shi";
    const sellerRating = 90;
    const bid = 160.99;
    const isBid = false;

    const onChangeNum = (event) => {
        setNum({num: event.target.value});
    }

    const onChangeExp = (event) => {
        setExp({exp: event.target.value});
    }

    const onChangeCVC = (event) => {
        setCVC({cvc: event.target.value});
    }

    const onChangeFirst = (event) => {
        setFirst({first: event.target.value});
    }

    const onChangeLast = (event) => {
        setLast({last: event.target.value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const info = {
            num: num,
            exp: exp,
            cvc: cvc,
            first: first,
            last: last
          };
          localStorage.setItem(first.first + ' ' + last.last, JSON.stringify(info));
    }

    return (
        <div className="background">
            <h2 className="checkout">Checkout</h2>
            <div className="checkout-splitScreen">
                <div className="checkout-leftPane">
                    <h3>Review Item</h3>
                    <p>Seller: {sellerName} ({sellerRating}%)</p>
                    <img className="checkout-image" src={chair} alt="product image" width="350" height="350" />
                    <h4>{productName}</h4>
                    {isBid ?
                    <div>
                        <p>Current Bid: <b>US ${price}</b></p>
                        <p>Your Bid: <b>US ${bid}</b></p>
                    </div>
                    :
                    <p>Price: <b>US ${price}</b></p>
                    }
                    <p>{desc}</p>
                    <p>Tags: {tags}</p>
                </div>
                <div className="checkout-rightPane">
                    <div className="checkout-topRightPane">
                        <h3>Pay With</h3>
                        <form className="checkout-center" onSubmit={handleSubmit} id='ccinfo'>
                            <input type="number" placeholder='Card Number' onChange={onChangeNum}/>
                            <div>
                                <input type="month" placeholder='Exp. Date' onChange={onChangeExp}/>
                                <input type="number" placeholder='CVC' onChange={onChangeCVC}/>
                            </div>
                            <div>
                                <input type="text" placeholder='First Name' onChange={onChangeFirst}/>
                                <input type="text" placeholder='Last Name' onChange={onChangeLast}/>
                            </div>
                        </form>
                    </div>
                    <div className="checkout-botRightPane">
                        {isBid ? <h2>Your Bid: {bid}</h2>
                        : <p>
                            Subtotal (1 item): ${price} <br/>
                            Discount: $0.00 <br/>
                            Tax: $0.00
                        </p>
                        }
                        <hr className="checkout-solid" />
                        {isBid ? <b>Order total: ${bid}</b> : <b>Order total: ${price}</b>}
                        <div className="checkout-center">
                            <input className="payButton" form='ccinfo' type="submit" value='Confirm and Pay'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
