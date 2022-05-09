const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const api = require('./api');

let mock;

beforeAll(() => {
  mock = new MockAdapter(axios);
});

const user = {
  email: 'raymons@sas.upenn.edu',
  name: 'Raymon Shi',
  password: 'password',
  birthday: 'October 21, 1999',
  major: 'Cognitive Science',
  school: 'School of Arts and Sciences',
  classYear: 2022,
  rating: 5,
  reviews: [],
  followers: [],
  following: [],
  blocked: [],
  transactionHistory: [],
  watchlistRegular: [],
  watchlistBid: [],
  shoppingCart: [],
  loginAttempts: 0,
  lockedOutTime: 0,
};

const userUpdated = {
  email: 'raymons@sas.upenn.edu',
  name: 'Raymon Shi',
  password: 'password',
  birthday: 'October 21, 1999',
  major: 'Cognitive Science',
  school: 'School of Arts and Sciences',
  classYear: 2022,
  rating: 5,
  reviews: [],
  followers: [],
  following: [],
  blocked: [],
  transactionHistory: [],
  watchlistRegular: [],
  watchlistBid: [],
  shoppingCart: [],
  loginAttempts: 1,
  lockedOutTime: 0,
};

const userUpdatedPassword = {
  email: 'raymons@sas.upenn.edu',
  name: 'Raymon Shi',
  password: 'newpassword',
  birthday: 'October 21, 1999',
  major: 'Cognitive Science',
  school: 'School of Arts and Sciences',
  classYear: 2022,
  rating: 5,
  reviews: [],
  followers: [],
  following: [],
  blocked: [],
  transactionHistory: [],
  watchlistRegular: [],
  watchlistBid: [],
  shoppingCart: [],
  loginAttempts: 1,
  lockedOutTime: 0,
};

test('/account/login', async () => {
  mock.onPost('/account/login').reply(200, user);
  const response = await api.login('raymon');
  expect(response).toMatchObject(user);
});

test('/account/failedLogin', async () => {
  mock.onPost('/account/failedLogin').reply(200, userUpdated);
  const response = await api.failedLogin('raymons@sas.upenn.edu');
  expect(response).toMatchObject(userUpdated);
});

test('/account/resetpassword', async () => {
  mock.onPost('/account/resetpassword').reply(200, userUpdatedPassword);
  const response = await api.resettingPassword('raymons@sas.upenn.edu', 'newpassword');
  expect(response).toMatchObject(userUpdatedPassword);
});

test('/account/signup', async () => {
  mock.onPost('/account/signup').reply(201, user);
  const response = await api.signup(
    'raymons@sas.upenn.edu',
    'Raymon',
    'Shi',
    'password',
    'October',
    '21',
    '1999',
    'Cognitive Science',
    'School of Arts and Sciences',
    2022,
  );
  expect(response).toMatchObject(user);
});
