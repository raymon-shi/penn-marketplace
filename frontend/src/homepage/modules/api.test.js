const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const api = require('./api');

let mock;

beforeAll(() => {
  mock = new MockAdapter(axios);
});

const regListings = [
  {
    posterName: 'Cindy Chen',
    itemName: 'candle',
    itemDescr: 'smells nice',
    price: 7,
  },
  {
    posterName: 'Cindy Chen',
    itemName: 'cat',
    itemDescr: 'cute cat',
    price: 50,
  },
];

const bidListings = [
  {
    posterName: 'Cindy Chen',
    itemName: 'apple',
    itemDescr: 'red',
    price: 0,
  },
  {
    posterName: 'Cindy Chen',
    itemName: 'mango',
    itemDescr: 'orange',
    price: 0,
  },
];

test('/item/getRegListings', async () => {
  mock.onGet('/item/getRegListings').reply(200, regListings);
  const response = await api.getRegListingsApi();
  expect(response).toMatchObject(regListings.reverse());
});

test('/item/getRegListings throws error', async () => {
  mock.onGet('/item/getRegListings').networkError();
  expect(api.getRegListingsApi()).rejects.toThrowError();
});

test('/item/getBidListings', async () => {
  mock.onGet('/item/getBidListings').reply(200, bidListings);
  const response = await api.getBidListingsApi();
  expect(response).toMatchObject(bidListings.reverse());
});

test('/item/getBidListings throws error', async () => {
  mock.onGet('/item/getBidListings').networkError();
  expect(api.getBidListingsApi()).rejects.toThrowError();
});

test('/item/getSavedReg', async () => {
  mock.onGet('/item/getSavedReg').reply(200, regListings);
  const response = await api.getSavedRegListingsApi();
  expect(response).toMatchObject(regListings.reverse());
});

test('/item/getSavedReg throws error', async () => {
  mock.onGet('/item/getSavedReg').networkError();
  expect(api.getSavedRegListingsApi()).rejects.toThrowError();
});

test('/item/getSavedBid', async () => {
  mock.onGet('/item/getSavedBid').reply(200, bidListings);
  const response = await api.getSavedBidListingsApi();
  expect(response).toMatchObject(bidListings.reverse());
});

test('/item/getSavedBid throws error', async () => {
  mock.onGet('/item/getSavedBid').networkError();
  expect(api.getSavedBidListingsApi()).rejects.toThrowError();
});
