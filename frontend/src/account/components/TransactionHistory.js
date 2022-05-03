import React, { useState } from 'react';

const TransactionHistory = ({ userProfile }) => {
  const [dashboard, setDashboard] = useState('');
  return (
    <>
      <h1 className="mb-5">Transaction History</h1>
      <div className="transactions-box" style={{ height: '350px', overflow: 'auto' }}>
        {userProfile.transactionHistory.map((transaction, idx) => (
          <div key={transaction._id} id="profile">
            <div style={{ padding: '1% 2%' }}>
              <h3>{`#${idx + 1}`}</h3>
              <div>
                <img src={transaction.listingRegular && transaction.listingRegular.media ? transaction.listingRegular.media : transaction.listingBid && transaction.listingBid.media} alt="transaction item pic" width="50px" height="50px" style={{ objectFit: 'cover' }} />
              </div>
              <div>
                <p className="w-100"><b>Buyer</b>{`: ${transaction.buyer && transaction.buyer.name}`}</p>
              </div>
              <div>
                <p className="w-100"><b>Seller</b>{`: ${transaction.buyer && transaction.seller.name}`}</p>
              </div>
              <div>
                <p className="w-100"><b>Item Name</b>{`: ${transaction.listingRegular && transaction.listingRegular.itemName ? transaction.listingRegular.itemName : transaction.listingBid.itemName}`}</p>
              </div>
              <div>
                <p className="w-100"><b>Item Price</b>{`: ${transaction.listingRegular && transaction.listingRegular.price ? transaction.listingRegular.price : transaction.listingBid.price}`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TransactionHistory;
