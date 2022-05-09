const axios = require('axios');

const getRegListingsApi = async () => {
  try {
    const { data } = await axios.get('/item/getRegListings');
    return data.reverse();
  } catch (err) {
    throw new Error('There was an error with /getRegListings');
  }
};

const getBidListingsApi = async () => {
  try {
    const { data } = await axios.get('/item/getBidListings');
    return data.reverse();
  } catch (err) {
    throw new Error('There was an error with /getBidListings');
  }
};

const getSavedRegListingsApi = async () => {
  try {
    const { data } = await axios.get('/item/getSavedReg');
    return data.reverse();
  } catch (err) {
    throw new Error('There was an error with /getSavedReg');
  }
};

const getSavedBidListingsApi = async () => {
  try {
    const { data } = await axios.get('/item/getSavedBid');
    return data.reverse();
  } catch (err) {
    throw new Error('There was an error with /getSavedBid');
  }
};

module.exports = {
  getRegListingsApi,
  getBidListingsApi,
  getSavedRegListingsApi,
  getSavedBidListingsApi,
};
