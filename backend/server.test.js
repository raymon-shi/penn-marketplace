const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./server');
const User = require('./models/User');
const ItemBid = require('./models/ItemBid');

const mongodbUsername = 'penn-marketplace';
const mongodbPassword = 'hL7OprFhSxfJ6Sst';
const mongodbDatabaseName = 'Penn-Marketplace';

const MONGO_URI =
  process.env.MONGODB_URI ||
  `mongodb+srv://${mongodbUsername}:${mongodbPassword}@penn-marketplace.6si5d.mongodb.net/${mongodbDatabaseName}?retryWrites=true&w=majority`;

beforeAll(async () => {
  app.listen();
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// login tests
describe('/signup and then delete', () => {
  test('/signup status code 201', async () =>
    request(app)
      .post('/account/signup')
      .send({
        email: 'ddwang@seas.upenn.edu',
        firstName: 'David',
        lastName: 'Wang',
        password: 'password',
        month: 'January',
        day: '1',
        year: '1990',
        major: 'Computer Science',
        school: 'School of Engineering and Applied Sciences',
        classYear: 2022,
      })
      .expect(201)
      .then((resp) => expect(resp.text).toContain('was successfully created!'))
      .then(() => User.findOneAndDelete({ email: 'ddwang@seas.upenn.edu' })));
});

describe('/signup and error', () => {
  test('/signup status code 201', async () =>
    request(app)
      .post('/account/signup')
      .send({
        email: 'ddwang@seas.upenn.edu',
        firstName: 'David',
        lastName: 'Wang',
        password: 'password',
        month: 'January',
        day: '1',
        year: '1990',
        major: 'Computer Science',
        school: 'School of Engineering and Applied Sciences',
        classYear: 2022,
      })
      .expect(201)
      .then((resp) => expect(resp.text).toContain('was successfully created!')));

  test('/signup status code 500', async () =>
    request(app)
      .post('/account/signup')
      .send({
        email: 'ddwang@seas.upenn.edu',
        firstName: 'David',
        lastName: 'Wang',
        password: 'password',
        month: 'January',
        day: '1',
        year: '1990',
        major: 'Computer Science',
        school: 'School of Engineering and Applied Sciences',
        classYear: 2022,
      })
      .expect(500)
      .then((resp) => expect(resp.text).toContain('There was an error with error message: Error: Error inside /signup with error message:'))
      .then(() => User.findOneAndDelete({ email: 'ddwang@seas.upenn.edu' })));
});

describe('/signup, /login, and then delete', () => {
  test('/signup status code 201', async () =>
    request(app)
      .post('/account/signup')
      .send({
        email: 'ddwang@seas.upenn.edu',
        firstName: 'David',
        lastName: 'Wang',
        password: 'password',
        month: 'January',
        day: '1',
        year: '1990',
        major: 'Computer Science',
        school: 'School of Engineering and Applied Sciences',
        classYear: 2022,
      })
      .expect(201)
      .then((resp) => expect(resp.text).toContain('was successfully created!')));

  test('/login status code 200', async () =>
    request(app)
      .post('/account/login')
      .send({
        email: 'ddwang@seas.upenn.edu',
        password: 'password',
      })
      .expect(200)
      .then(() => User.findOneAndDelete({ email: 'ddwang@seas.upenn.edu' })));
});

describe('/login error', () => {
  test('/signup status code 201', async () =>
    request(app)
      .post('/account/signup')
      .send({
        email: 'ddwang@seas.upenn.edu',
        firstName: 'David',
        lastName: 'Wang',
        password: 'password',
        month: 'January',
        day: '1',
        year: '1990',
        major: 'Computer Science',
        school: 'School of Engineering and Applied Sciences',
        classYear: 2022,
      })
      .expect(201)
      .then((resp) => expect(resp.text).toContain('was successfully created!')));

  test('/login status code 500', async () =>
    request(app)
      .post('/account/login')
      .send({
        email: 'ddwang@seas.upenn.edu',
        password: 'passwordx',
      })
      .expect(500)
      .then((resp) => expect(resp.text).toContain('There was not a match'))
      .then(() => User.findOneAndDelete({ email: 'ddwang@seas.upenn.edu' })));
});

describe('/login error 2', () => {
  test('/signup status code 201', async () =>
    request(app)
      .post('/account/signup')
      .send({
        email: 'ddwang@seas.upenn.edu',
        firstName: 'David',
        lastName: 'Wang',
        password: 'password',
        month: 'January',
        day: '1',
        year: '1990',
        major: 'Computer Science',
        school: 'School of Engineering and Applied Sciences',
        classYear: 2022,
      })
      .expect(201)
      .then((resp) => expect(resp.text).toContain('was successfully created!')));

  test('/login status code 500', async () =>
    request(app)
      .post('/account/login')
      .send({
        email: 'ddwang@seas.upenn.edux',
        password: 'passwordx',
      })
      .expect(500)
      .then((resp) => expect(resp.text).toContain('Error inside /login with error message:'))
      .then(() => User.findOneAndDelete({ email: 'ddwang@seas.upenn.edu' })));
});

describe('/user check', () => {
  test('/signup status code 201', async () =>
    request(app)
      .post('/account/signup')
      .send({
        email: 'ddwang@seas.upenn.edu',
        firstName: 'David',
        lastName: 'Wang',
        password: 'password',
        month: 'January',
        day: '1',
        year: '1990',
        major: 'Computer Science',
        school: 'School of Engineering and Applied Sciences',
        classYear: 2022,
      })
      .expect(201)
      .then((resp) => expect(resp.text).toContain('was successfully created!')));

  test('/login status code 200', async () =>
    request(app)
      .post('/account/login')
      .send({
        email: 'ddwang@seas.upenn.edu',
        password: 'password',
      })
      .expect(200));

  test('/user status code 200 and delete', async () =>
    request(app)
      .get('/account/user')
      .expect(200)
      .then(() => User.findOneAndDelete({ email: 'ddwang@seas.upenn.edu' })));
});

describe('/failedLogin check', () => {
  test('/signup status code 201', async () =>
    request(app)
      .post('/account/signup')
      .send({
        email: 'ddwang@seas.upenn.edu',
        firstName: 'David',
        lastName: 'Wang',
        password: 'password',
        month: 'January',
        day: '1',
        year: '1990',
        major: 'Computer Science',
        school: 'School of Engineering and Applied Sciences',
        classYear: 2022,
      })
      .expect(201)
      .then((resp) => expect(resp.text).toContain('was successfully created!')));

  test('/failedLogin status code 200 and delete', async () =>
    request(app)
      .post('/account/failedLogin')
      .send({ email: 'ddwang@seas.upenn.edu' })
      .expect(200)
      .then(() => User.findOneAndDelete({ email: 'ddwang@seas.upenn.edu' })));
});

describe('/resetpassword check', () => {
  test('/signup status code 201', async () =>
    request(app)
      .post('/account/signup')
      .send({
        email: 'ddwang@seas.upenn.edu',
        firstName: 'David',
        lastName: 'Wang',
        password: 'password',
        month: 'January',
        day: '1',
        year: '1990',
        major: 'Computer Science',
        school: 'School of Engineering and Applied Sciences',
        classYear: 2022,
      })
      .expect(201)
      .then((resp) => expect(resp.text).toContain('was successfully created!')));

  test('/resetpassword status code 200 and delete', async () =>
    request(app)
      .post('/account/resetpassword')
      .send({ email: 'ddwang@seas.upenn.edu', password: 'newpassword' })
      .expect(200)
      .then(() => User.findOneAndDelete({ email: 'ddwang@seas.upenn.edu' })));
});

// describe('/resetpassword error', () => {
//   test('/signup status code 201', async () =>
//     request(app)
//       .post('/account/signup')
//       .send({
//         email: 'ddwang@seas.upenn.edu',
//         firstName: 'David',
//         lastName: 'Wang',
//         password: 'password',
//         month: 'January',
//         day: '1',
//         year: '1990',
//         major: 'Computer Science',
//         school: 'School of Engineering and Applied Sciences',
//         classYear: 2022,
//       })
//       .expect(201)
//       .then((resp) => expect(resp.text).toContain('was successfully created!')));

//   test('/resetpassword status code 200 and delete', async () =>
//     request(app)
//       .post('/account/resetpassword')
//       .send({ email: 'ddwang@seas.upenn.eduxxxx', password: 'newpassword*&*(&*(' })
//       .expect(500)
//       .then((resp) => expect(resp.text).toContain('Could not reset password'))
//       .then(() => User.findOneAndDelete({ email: 'ddwang@seas.upenn.edu' })));
// });

// describe('/logout check', () => {
//   test('/signup status code 201', async () =>
//     request(app)
//       .post('/account/signup')
//       .send({
//         email: 'ddwang@seas.upenn.edu',
//         firstName: 'David',
//         lastName: 'Wang',
//         password: 'password',
//         month: 'January',
//         day: '1',
//         year: '1990',
//         major: 'Computer Science',
//         school: 'School of Engineering and Applied Sciences',
//         classYear: 2022,
//       })
//       .expect(201)
//       .then((resp) => expect(resp.text).toContain('was successfully created!')));

//   test('/login status code 200', async () =>
//     request(app)
//       .post('/account/login')
//       .send({
//         email: 'ddwang@seas.upenn.edu',
//         password: 'password',
//       })
//       .expect(200));

//   test('/logout and delete', async () =>
//     request(app)
//       .post('/account/logout')
//       .expect(200)
//       .then((resp) => expect(resp.text).toContain('has been logged out!'))
//       .then(() => User.findOneAndDelete({ email: 'ddwang@seas.upenn.edu' })));
// });

// seller tests
// describe('/addBidListing tests', () => {
//   test('/signup status code 201', async () =>
//     request(app)
//       .post('/account/signup')
//       .send({
//         email: 'ddwang@seas.upenn.edu',
//         firstName: 'David',
//         lastName: 'Wang',
//         password: 'password',
//         month: 'January',
//         day: '1',
//         year: '1990',
//         major: 'Computer Science',
//         school: 'School of Engineering and Applied Sciences',
//         classYear: 2022,
//       })
//       .expect(201)
//       .then((resp) => expect(resp.text).toContain('was successfully created!')));

//   test('/login status code 200', async () =>
//     request(app)
//       .post('/account/login')
//       .send({
//         email: 'ddwang@seas.upenn.edu',
//         password: 'password',
//       })
//       .expect(200));

//   test('/addBidListing 201', async () => request(app)
//     .post('/item/addBidListing')
//     .send({
//       product: 'test77',
//       productDescr: 'nice scent',
//       tag: 'Housing & Furniture',
//     })
//     .expect(201)
//     .then((resp) => expect(JSON.parse(resp.text).message).toContain('Bid listing was successfully posted!'))
//     .then(() => ItemBid.findOneAndDelete({ product: 'test77' }))
//     .then(() => User.findOneAndDelete({ email: 'ddwang@seas.upenn.edu' })));
// });
