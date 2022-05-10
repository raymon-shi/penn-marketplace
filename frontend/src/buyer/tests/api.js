const axios = require('axios');

const getRegListing = async (itemId) => {
  try {
    const { data } = await axios.get(`/buyer/getRegListing/${itemId}`);
    return data;
  } catch (error) {
    throw new Error(`Error with retrieving item with id ${itemId}`);
  }
};

const getBidListing = async (itemId) => {
  try {
    const { data } = await axios.get(`/buyer/getBidListing/${itemId}`);
    return data;
  } catch (error) {
    throw new Error(`Error with retrieving item with id ${itemId}`);
  }
};

const getCart = async () => {
  try {
    const { data } = await axios.get('/buyer/cart');
    return data;
  } catch (error) {
    throw new Error('Error with loading cart');
  }
};

const addCart = async (itemId) => {
  try {
    const { data } = await axios.post(`/buyer/addCartRegItem/${itemId}`);
    return data;
  } catch (error) {
    throw new Error('Error with loading cart');
  }
};

const saveReg = async (itemId) => {
  try {
    const { data } = await axios.post(`/buyer/addWatchRegItem/${itemId}`);
    return data;
  } catch (error) {
    throw new Error('Error with saving item');
  }
};

const saveBid = async (itemId) => {
  try {
    const { data } = await axios.post(`/buyer/addWatchBidItem/${itemId}`);
    return data;
  } catch (error) {
    throw new Error('Error with saving item');
  }
};

const handleRemoveReg = async (id) => {
  try {
    const { data } = await axios.post(`/buyer/removeCartRegItem/${id}`);
    return data;
  } catch (error) {
    throw new Error(`Error with removing item with id:${id} from cart`);
  }
};

const addBid = async (itemId, bid) => {
  try {
    const { data } = await axios.post(`/buyer/addBid/${itemId}`, { bid });
    return data;
  } catch (error) {
    throw new Error('Error in adding bid');
  }
};

const acceptBid = async (listing, currBid) => {
  try {
    const { data } = await axios.post(
      '/seller/acceptBid',
      {
        buyerName: listing.bidHistory[listing.bidHistory.length - 1].bidderName,
        listingBid: listing,
        totalCost: currBid,
      },
    );
    return data;
  } catch (error) {
    throw new Error('Error in accepting bid');
  }
};

const regTransaction = async (item, info) => {
  try {
    const { data } = await axios.post(
      '/buyer/regTransaction',
      {
        sellerName: item.posterName,
        listingRegular: item,
        totalCost: item.price,
        info,
      },
    );
    return data;
  } catch (error) {
    throw new Error('Error in processing transaction');
  }
};

const addTransaction = async (transaction) => {
  try {
    const { data } = await axios.post('/seller/addTransaction', { transaction });
    return data;
  } catch (error) {
    throw new Error('Error in adding transaction');
  }
};

module.exports = {
  getRegListing,
  getBidListing,
  getCart,
  addCart,
  saveReg,
  saveBid,
  handleRemoveReg,
  addBid,
  acceptBid,
  regTransaction,
  addTransaction,
};
