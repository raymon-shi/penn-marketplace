const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const api = require('./api');

let mock;

beforeAll(() => {
  mock = new MockAdapter(axios);
});

const regListing = {
  _id: "6249153f00dd4eb3213d55f8",
  posterName: "Damon Luong",
  itemName: "xD2",
  itemDescr: "xDescr2",
  price: 11,
  tag: "Services",
};

const bidListing = {
  _id: "6249d5930152fbb6d1bd87e0",
  posterNAme: 'Harrison Ly',
  itemName: 'lampagain',
  itemDescr: 'lighting',
  price: 51,
  bidHistory: [],
  tag: 'Housing & Furniture',
};

const updatedBidListing = {
  _id: "6249d5930152fbb6d1bd87e0",
  posterNAme: 'Harrison Ly',
  itemName: 'lampagain',
  itemDescr: 'lighting',
  price: 60,
  bidHistory: [{ bidAmount: 60, bidderName: 'Damon Luong' }],
  tag: 'Housing & Furniture',
};

const cart = {
  shoppingCart: [regListing],
}

const savedReg = {
  watchlistRegular: [regListing],
}

const savedbid = {
  watchlistBid: [bidListing],
};

const info = {
  name: 'Damon Luong',
  num: 12345678910,
  exp: 412,
  cvc: 123,
};

const transaction = {
  seller: 'Harrison Ly',
  buyer: 'Damon Luong',
  listingRegular: regListing,
  totalCost: regListing.price,
  info,
};

test('/buyer/getRegListing/:id', async () => {
  mock.onGet(`/buyer/getRegListing/${regListing._id}`).reply(200, regListing);
  const response = await api.getRegListing(regListing._id);
  expect(response).toMatchObject(regListing);
});

test('/buyer/getBidListing:id', async () => {
  mock.onGet(`/buyer/getBidListing/${bidListing._id}`).reply(200, bidListing);
  const response = await api.getBidListing(bidListing._id);
  expect(response).toMatchObject(bidListing);
});

test('/buyer/cart', async () => {
  mock.onGet('/buyer/cart').reply(200, cart);
  const response = await api.getCart();
  expect(response).toMatchObject(cart);
});

test('/buyer/addCartRegItem/:id', async () => {
  mock.onPost(`/buyer/addCartRegItem/${regListing._id}`).reply(200, cart);
  const response = await api.addCart(regListing._id);
  expect(response).toMatchObject(cart);
});

test('/buyer/addWatchRegItem/:id', async () => {
  mock.onPost(`/buyer/addWatchRegItem/${regListing._id}`).reply(200, savedReg);
  const response = await api.saveReg(regListing._id);
  expect(response).toMatchObject(savedReg);
});

test('/buyer/addWatchBidItem/:id', async () => {
  mock.onPost(`/buyer/addWatchBidItem/${bidListing._id}`).reply(200, savedbid);
  const response = await api.saveBid(bidListing._id);
  expect(response).toMatchObject(savedbid);
});

test('/buyer/removeCartRegItem/:id', async () => {
  mock.onPost(`/buyer/removeCartRegItem/${regListing._id}`).reply(200, { shoppingCart: []});
  const response = await api.handleRemoveReg(regListing._id);
  expect(response).toMatchObject({ shoppingCart: [] });
});

test('/buyer/addBid/:id', async () => {
  mock.onPost(`/buyer/addBid/${bidListing._id}`).reply(200, updatedBidListing);
  const response = await api.addBid(bidListing._id, 51);
  expect(response).toMatchObject(updatedBidListing);
});

test('/seller/acceptBid', async () => {
  mock.onPost('/seller/acceptBid').reply(200, updatedBidListing);
  const response = await api.acceptBid(updatedBidListing, updatedBidListing.price);
  expect(response).toMatchObject(updatedBidListing);
});

test('/buyer/regTransaction', async () => {
  mock.onPost('/buyer/regTransaction').reply(200, transaction);
  const response = await api.regTransaction(regListing, info);
  expect(response).toMatchObject(transaction);
});

test('/seller/addTransaction', async () => {
  mock.onPost('/seller/addTransaction').reply(200, transaction);
  const response = await api.addTransaction(transaction);
  expect(response).toMatchObject(transaction);
});
