const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const api = require('./api');

let mock;

beforeAll(() => {
  mock = new MockAdapter(axios);
});

test('/item/addBidListing', async () => {
  mock.onPost('/item/addBidListing').reply(201, { message: 'Bid listing was successfully posted!' });
  const response = await api.submitBidListing('test', 'very cool', 'furniture', null, null);
  expect(response).toMatchObject({ message: 'Bid listing was successfully posted!' });
});

test('/item/addBidListing throws error', async () => {
  mock.onPost('/item/addBidListing').networkError();
  expect(api.submitBidListing('test', 'very cool', 'furniture', null, null)).rejects.toThrowError();
});

test('/item/addBidListingPic', async () => {
  function FormDataMock() {
    this.append = jest.fn();
  }
  global.FormData = FormDataMock;
  mock.onPost('/item/addBidListingPic').reply(201, { message: 'Bid listing was successfully posted!' });
  const response = await api.submitBidListing('test1', 'nice', 'furniture', 'img.jpg', null);
  expect(response).toMatchObject({ message: 'Bid listing was successfully posted!' });
});

test('/item/addBidListingPic throws error', async () => {
  mock.onPost('/item/addBidListingPic').networkError();
  expect(api.submitBidListing('test1', 'nice', 'furniture', 'img.jpg', null)).rejects.toThrowError();
});

test('/item/addRegListing', async () => {
  mock.onPost('/item/addRegListing').reply(201, { message: 'Regular listing was successfully posted!' });
  const response = await api.submitPriceListing('test2', 'super cool', 3, 'furniture', null, null);
  expect(response).toMatchObject({ message: 'Regular listing was successfully posted!' });
});

test('/item/addRegListing throws error', async () => {
  mock.onPost('/item/addRegListing').networkError();
  expect(api.submitPriceListing('test2', 'super cool', 3, 'furniture', null, null)).rejects.toThrowError();
});

test('/item/addRegListingPic', async () => {
  function FormDataMock() {
    this.append = jest.fn();
  }
  global.FormData = FormDataMock;
  mock.onPost('/item/addRegListingPic').reply(201, { message: 'Regular listing was successfully posted!' });
  const response = await api.submitPriceListing('test3', 'smells nice', 7, 'furniture', 'candle.jpg', null);
  expect(response).toMatchObject({ message: 'Regular listing was successfully posted!' });
});

test('/item/addRegListingPic throws error', async () => {
  mock.onPost('/item/addRegListingPic').networkError();
  expect(api.submitPriceListing('test3', 'smells nice', 7, 'furniture', 'candle.jpg', null)).rejects.toThrowError();
});
