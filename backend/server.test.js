const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./server');
const User = require('./models/User');
const ItemRegular = require('./models/ItemRegular');
const Transaction = require('./models/Transaction');
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
describe('/addBidListing test', () => {
  const agent = request.agent(app);
  test('/signup status code 201', async () => agent
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

  test('/login status code 200', async () => agent
    .post('/account/login')
    .send({
      email: 'ddwang@seas.upenn.edu',
      password: 'password',
    })
    .expect(200));

  test('/addBidListing 201', async () => agent
    .post('/item/addBidListing')
    .send({
      product: 'test77',
      productDescr: 'nice scent',
      tag: 'Housing & Furniture',
    })
    .expect(201)
    .then((resp) => expect(resp.text).toContain('Bid listing was successfully posted!'))
    .then(() => ItemBid.findOneAndDelete({ product: 'test77' }))
    .then(() => User.findOneAndDelete({ email: 'ddwang@seas.upenn.edu' })));
});

describe('/addBidListingPic test', () => {
  const agent = request.agent(app);
  test('/signup status code 201', async () => agent
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

  test('/login status code 200', async () => agent
    .post('/account/login')
    .send({
      email: 'ddwang@seas.upenn.edu',
      password: 'password',
    })
    .expect(200));

  test('/addBidListingPic 201', async () => agent
    .post('/item/addBidListingPic')
    .set('content-type', 'multipart/form-data')
    .field('product', 'test22')
    .field('productDescr', 'very cheap')
    .field('tag', 'Services')
    .attach('imageFile', './testImage.jpg')
    .expect(201)
    .then((resp) => expect(resp.text).toContain('Bid listing was successfully posted!'))
    .then(() => ItemRegular.findOneAndDelete({ product: 'test22' }))
    .then(() => User.findOneAndDelete({ email: 'ddwang@seas.upenn.edu' })));
});

describe('/addRegListing test', () => {
  const agent = request.agent(app);
  test('/signup status code 201', async () => agent
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

  test('/login status code 200', async () => agent
    .post('/account/login')
    .send({
      email: 'ddwang@seas.upenn.edu',
      password: 'password',
    })
    .expect(200));

  test('/addRegListing 201', async () => agent
    .post('/item/addRegListing')
    .send({
      product: 'test45',
      productDescr: 'very expensive',
      price: 7,
      tag: 'Services',
    })
    .expect(201)
    .then((resp) => expect(resp.text).toContain('Regular listing was successfully posted!'))
    .then(() => ItemRegular.findOneAndDelete({ product: 'test45' }))
    .then(() => User.findOneAndDelete({ email: 'ddwang@seas.upenn.edu' })));
});

describe('/addRegListingPic test', () => {
  const agent = request.agent(app);
  test('/signup status code 201', async () => agent
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

  test('/login status code 200', async () => agent
    .post('/account/login')
    .send({
      email: 'ddwang@seas.upenn.edu',
      password: 'password',
    })
    .expect(200));

  test('/addRegListingPic 201', async () => agent
    .post('/item/addRegListingPic')
    .set('content-type', 'multipart/form-data')
    .field('product', 'test33')
    .field('productDescr', 'very expensive')
    .field('price', 7)
    .field('tag', 'Services')
    .attach('imageFile', './testImage.jpg')
    .expect(201)
    .then((resp) => expect(resp.text).toContain('Regular listing was successfully posted!'))
    .then(() => ItemRegular.findOneAndDelete({ product: 'test33' }))
    .then(() => User.findOneAndDelete({ email: 'ddwang@seas.upenn.edu' })));
});

test('/getRegListings 200', async () => request(app)
  .get('/item/getRegListings')
  .expect(200));

test('/getBidListings 200', async () => request(app)
  .get('/item/getBidListings')
  .expect(200));

// END SELLER/HOMEPAGE TESTS

describe('/getRegListing/:id', () => {
  test('/buyer/getRegListing:id status code 200', async () =>
    request(app)
    .get('/buyer/getRegListing/626630911a372e8bea7757ba')
    .expect(200)
    .then((resp) => expect(resp.body).toMatchObject(
      {
        _id: '626630911a372e8bea7757ba',
        posterName: 'Harrison Ly',
        itemName: 'lamp2',
        itemDescr: 'light',
        price: 149,
        tag: '',
        createdAt: '2022-04-25T05:24:33.180Z',
        updatedAt: '2022-04-25T05:24:33.180Z',
        __v: 0,
      }
    ))
  );
  test('/buyer/getRegListing:id status code 500', async () =>
    request(app)
      .get('/buyer/getRegListing/123456789')
      .expect(500)
      .then((resp) => expect(resp.text).toContain('Error with retrieving listing'))
  );
});

describe('/getBidListing/:id', () => {
  test('/buyer/getBidListing:id status code 200', async () =>
    request(app)
    .get('/buyer/getBidListing/625381cd146ff361c085606f')
    .expect(200)
  );
  test('/buyer/getBidListing:id status code 500', async () =>
    request(app)
      .get('/buyer/getBidListing/123456789')
      .expect(500)
      .then((resp) => expect(resp.text).toContain('Error with retrieving listing'))
  );
});

describe('add and remove item to cart error', () => {
  const agent = request.agent(app);
  test('/signup status code 201', async () =>
  agent
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
    agent
      .post('/account/login')
      .send({
        email: 'ddwang@seas.upenn.edu',
        password: 'password',
      })
      .expect(200));

  test('/addCartRegItem/:id status code 500', async () =>
    agent
      .post('/buyer/addCartRegItem/123456789')
      .expect(500)
      .then((resp) => expect(resp.text).toContain('Error adding item to cart'))
  );

  test('/RemoveCartRegItem/:id status code 500', async () =>
    agent
      .post('/buyer/RemoveCartRegItem/123456789')
      .expect(500)
      .then((resp) => expect(resp.text).toContain('Error removing item from cart'))
      .then(() => User.findOneAndDelete({ email: 'ddwang@seas.upenn.edu' }))
    );
});

describe('add item to cart success', () => {
  const agent = request.agent(app);
  test('/signup status code 201', async () =>
  agent
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
    agent
      .post('/account/login')
      .send({
        email: 'ddwang@seas.upenn.edu',
        password: 'password',
      })
      .expect(200));

  test('/addCartRegItem/:id 200', async () => 
    agent
      .post('/buyer/addCartRegItem/626630911a372e8bea7757ba')
      .expect(200)
      .then((resp) => expect(resp.text).toContain('Regular listing successfully added to cart!'))
  );
  
  test('/cart status 200', async () => 
    agent
      .get('/buyer/cart')
      .expect(200)
      .then((resp) => expect(resp.body).toEqual(
          [
            {
              _id: '626630911a372e8bea7757ba',
              posterName: 'Harrison Ly',
              itemName: 'lamp2',
              itemDescr: 'light',
              price: 149,
              tag: '',
              createdAt: '2022-04-25T05:24:33.180Z',
              updatedAt: '2022-04-25T05:24:33.180Z',
              __v: 0
            }
          ]
      ))
      .then(() => User.findOneAndDelete({ email: 'ddwang@seas.upenn.edu' }))
  );
});

describe('remove item from cart success', () => {
  const agent = request.agent(app);
  test('/signup status code 201', async () =>
  agent
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
    agent
      .post('/account/login')
      .send({
        email: 'ddwang@seas.upenn.edu',
        password: 'password',
      })
      .expect(200));

  test('/addCartRegItem/:id 200', async () => 
    agent
      .post('/buyer/addCartRegItem/626630911a372e8bea7757ba')
      .expect(200)
      .then((resp) => expect(resp.text).toContain('Regular listing successfully added to cart!'))
  );

  test('/removeCartRegItem/:id 200', async () => 
    agent
      .post('/buyer/removeCartRegItem/626630911a372e8bea7757ba')
      .expect(200)
      .then((resp) => expect(resp.text).toContain('Regular listing removed successfully from cart!'))
  );
  
  test('/cart status 200', async () => 
    agent
      .get('/buyer/cart')
      .expect(200)
      .then((resp) => expect(resp.body).toEqual([]))
      .then(() => User.findOneAndDelete({ email: 'ddwang@seas.upenn.edu' }))
  );
});

describe('/buyer/cart error 500', () => {
  const agent = request.agent(app);
  test('/cart status 500', async () => 
    agent
      .get('/buyer/cart')
      .expect(500)
      .then((resp) => expect(resp.text).toContain('Error with retrieving cart'))
  );
});

describe('add regular and bid item to watchlist error', () => {
  const agent = request.agent(app);
  test('/addWatchRegItem/:id status 500', async () => 
    agent
      .post('/buyer/addWatchRegItem/123456789')
      .expect(500)
      .then((resp) => expect(resp.text).toContain('Error with adding reg item to watchlist'))
  );

  test('/addWatchBidItem/:id status 500', async () => 
  agent
    .post('/buyer/addWatchBidItem/123456789')
    .expect(500)
    .then((resp) => expect(resp.text).toContain('Error with adding bid item to watchlist'))
  );
});

describe('add and remove reg item to watchlist success', () => {
  const agent = request.agent(app);
  test('/signup status code 201', async () =>
  agent
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
    agent
      .post('/account/login')
      .send({
        email: 'ddwang@seas.upenn.edu',
        password: 'password',
      })
      .expect(200));

  test('/addWatchRegItem/:id 200', async () => 
    agent
      .post('/buyer/addWatchRegItem/626630911a372e8bea7757ba')
      .expect(200)
      .then((resp) => expect(resp.text).toContain('Regular listing successfully added to watchlist!'))
  );

  test('/addWatchBidItem/:id 200', async () => 
  agent
    .post('/buyer/addWatchBidItem/625381cd146ff361c085606f')
    .expect(200)
    .then((resp) => expect(resp.text).toContain('Bid listing successfully added to watchlist!'))
    .then(() => User.findOneAndDelete({ email: 'ddwang@seas.upenn.edu' }))
  );
});

describe('add bid error', () => {
  const agent = request.agent(app);
  test('/addBid/:id status 500', async () => 
    agent
      .post('/buyer/addBid/123456789')
      .send({ bid: 10 })
      .expect(500)
      .then((resp) => expect(resp.text).toContain('Error with adding bid to item'))
  );
});

describe('add bid success', () => {
  const agent = request.agent(app);
  test('/signup status code 201', async () =>
  agent
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
  );

  test('/login status code 200', async () =>
    agent
      .post('/account/login')
      .send({
        email: 'ddwang@seas.upenn.edu',
        password: 'password',
      })
      .expect(200)
  );

  test('/addBid/:id status code 200', async () => 
    agent
      .post('/buyer/addBid/625381cd146ff361c085606f')
      .send({ bid: 10 })
      .expect(200)
      .then((resp) => expect(resp.text).toContain('Bid placed successfully'))
      .then(() => User.findOneAndDelete({ email: 'ddwang@seas.upenn.edu' }))
  );
});

describe('regTransaction status code 500', () => {
  const agent = request.agent(app);
  test('/buyer/regTransaction status code 500', async () =>
    agent
      .post('/buyer/regTransaction')
      .send(
        {
          sellerName: '',
          listingRegular: {},
          totalCost: 0,
          info: {},
        }
      )
      .expect(500)
      .then((resp) => expect(resp.text).toContain('Error with completing Transaction'))
  );
});

describe('regTransaction status code 201', () => {
  const agent = request.agent(app);
  test('/signup status code 201', async () =>
  agent
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
  );

  test('/login status code 200', async () =>
    agent
      .post('/account/login')
      .send({
        email: 'ddwang@seas.upenn.edu',
        password: 'password',
      })
      .expect(200)
  );
  test('/item/addRegListing status code 201', async () => 
    agent
      .post('/item/addRegListing')
      .send(
        {
          product: 'productName',
          productDescr: 'productDescr',
          price: 111,
          tag: '',
        }
      )
      .expect(201)
      .then((resp) => expect(resp.text).toContain('Regular listing was successfully posted!'))
  );
  test('/logout 200', async () => 
    agent
      .post('/account/logout')
      .then((resp) => expect(resp.text).toContain('has been logged out!'))
  );
  test('/signup status code 201', async () =>
  agent
    .post('/account/signup')
    .send({
      email: 'calvinhu@seas.upenn.edu',
      firstName: 'Calvin',
      lastName: 'Hu',
      password: 'password',
      month: 'January',
      day: '1',
      year: '1990',
      major: 'Computer Science',
      school: 'School of Engineering and Applied Sciences',
      classYear: 2023,
    })
    .expect(201)
    .then((resp) => expect(resp.text).toContain('was successfully created!'))
  );

  test('/login status code 200', async () =>
    agent
      .post('/account/login')
      .send({
        email: 'calvinhu@seas.upenn.edu',
        password: 'password',
      })
      .expect(200)
  );

  test('/buyer/regTransaction', async () => 
    agent
      .post('/buyer/regTransaction')
      .send(
        {
          sellerName: 'David Wang',
          listingRegular: {},
          totalCost: 111,
          info: {},
        }
      )
      .expect(201)
      .then((resp) => expect(resp.body).toMatchObject({
        seller: 'David Wang',
        buyer: 'Calvin Hu',
        totalCost: 111,
      }))
      .then(() => User.findOneAndDelete({ email: 'ddwang@seas.upenn.edu' }))
      .then(() => User.findOneAndDelete({ email: 'calvinhu@seas.upenn.edu' }))
      .then(() => Transaction.findOneAndDelete({ seller: 'David Wang' }))
      .then(() => ItemRegular.findOneAndDelete({ posterName: 'David Wang' }))
    );
});



describe('/addTransaction error status 500', () => {
  const agent = request.agent(app);
  test('/buyer/addTransaction status 500', async () => {
    agent
      .post('/buyer/addTransaction')
      .expect(500)
      .then((resp) => expect(resp.text).toContain('Error with completing Transaction'));
  });
});

describe('addTransaction status code 200', () => {
  const agent = request.agent(app);
  test('/signup status code 201', async () =>
  agent
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
  );

  test('/login status code 200', async () =>
    agent
      .post('/account/login')
      .send({
        email: 'ddwang@seas.upenn.edu',
        password: 'password',
      })
      .expect(200)
  );
  test('/item/addRegListing status code 201', async () => 
    agent
      .post('/item/addRegListing')
      .send(
        {
          product: 'productName',
          productDescr: 'productDescr',
          price: 111,
          tag: '',
        }
      )
      .expect(201)
      .then((resp) => expect(resp.text).toContain('Regular listing was successfully posted!'))
  );
  test('/logout 200', async () => 
    agent
      .post('/account/logout')
      .then((resp) => expect(resp.text).toContain('has been logged out!'))
  );
  test('/signup status code 201', async () =>
  agent
    .post('/account/signup')
    .send({
      email: 'calvinhu@seas.upenn.edu',
      firstName: 'Calvin',
      lastName: 'Hu',
      password: 'password',
      month: 'January',
      day: '1',
      year: '1990',
      major: 'Computer Science',
      school: 'School of Engineering and Applied Sciences',
      classYear: 2023,
    })
    .expect(201)
    .then((resp) => expect(resp.text).toContain('was successfully created!'))
  );

  test('/login status code 200', async () =>
    agent
      .post('/account/login')
      .send({
        email: 'calvinhu@seas.upenn.edu',
        password: 'password',
      })
      .expect(200)
  );

  test('/buyer/regTransaction', async () => 
    agent
      .post('/buyer/regTransaction')
      .send(
        {
          sellerName: 'David Wang',
          totalCost: 111,
        }
      )
      .expect(201)
      .then((resp) => expect(resp.body).toMatchObject(
        {
          seller: 'David Wang',
          totalCost: 111,
          buyer: 'Calvin Hu',
        }
      ))
  );

    test('/buyer/addTransaction', async () =>
      agent
        .post('/buyer/addTransaction')
        .send({ transaction: {
          seller: 'David Wang',
          buyer: 'Calvin Hu',
          totalCost: 111,
        } 
      })
        .expect(200)
        .then((resp) => expect(resp.text).toContain('Transaction successfully processed'))
        .then(() => User.findOneAndDelete({ email: 'ddwang@seas.upenn.edu' }))
        .then(() => User.findOneAndDelete({ email: 'calvinhu@seas.upenn.edu' }))
        .then(() => ItemRegular.findOneAndDelete({ posterName: 'David Wang'}))
        .then(() => Transaction.findOneAndDelete({ seller: 'David Wang' }))
  );
});
describe('/search returns regular listing items', () => {
  const agent = request.agent(app);
  test('/signup status code 201', async () =>
    agent
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
  );

  test('/login status code 200', async () =>
    agent
      .post('/account/login')
      .send({
        email: 'ddwang@seas.upenn.edu',
        password: 'password',
      })
      .expect(200)
  );
  test('/item/addRegListing status code 201', async () => 
    agent
      .post('/item/addRegListing')
      .send(
        {
          product: 'productName',
          productDescr: 'productDescr',
          price: 111,
          tag: '',
        }
      )
      .expect(201)
      .then((resp) => expect(resp.text).toContain('Regular listing was successfully posted!'))
  );
  test('/search result has correct regular listings', async () =>
    agent
        .post('/item/search')
        .send(
          {
            filter: 'productName',
            label: '',
          }
        )
        .then((resp) => expect(resp.body[0].itemName).toContain('productName'))
  );
  test('/logout 200', async () => 
    agent
      .post('/account/logout')
      .then((resp) => expect(resp.text).toContain('has been logged out!'))
      .then(() => User.findOneAndDelete({ email: 'ddwang@seas.upenn.edu' }))
      .then(() => ItemRegular.findOneAndDelete({ posterName: 'David Wang' }))
  );
});

describe('/bidSearch returns bid listing items', () => {
  const agent = request.agent(app);
  test('/signup status code 201', async () =>
    agent
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
  );

  test('/login status code 200', async () =>
    agent
      .post('/account/login')
      .send({
        email: 'ddwang@seas.upenn.edu',
        password: 'password',
      })
      .expect(200)
  );
  test('/item/addBidListing status code 201', async () => 
    agent
      .post('/item/addBidListing')
      .send(
        {
          product: 'productName',
          productDescr: 'productDescr',
          tag: 'Clothes',
        }
      )
      .expect(201)
      .then((resp) => expect(resp.text).toContain('Bid listing was successfully posted!'))
  );
  test('/bidSearch result has correct bid listings', async () =>
    agent
        .post('/item/bidSearch')
        .send(
          {
            filter: 'productName',
            label: 'Clothes',
          }
        )
        .then((resp) => expect(resp.body[0].itemName).toContain('productName'))
  );
  test('/logout 200', async () => 
    agent
      .post('/account/logout')
      .then((resp) => expect(resp.text).toContain('has been logged out!'))
      .then(() => User.findOneAndDelete({ email: 'ddwang@seas.upenn.edu' }))
      .then(() => ItemRegular.findOneAndDelete({ posterName: 'David Wang' }))
  );
});


