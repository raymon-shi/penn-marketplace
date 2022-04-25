/* eslint-disable no-console */

// express setup
const express = require('express');
const cookieSession = require('cookie-session');
const cors = require('cors');
const bodyParserErrorHandler = require('express-body-parser-error-handler');

const app = express();

// mongodb and mongoose setup
const mongoose = require('mongoose');

const mongodbUsername = 'penn-marketplace';
const mongodbPassword = 'hL7OprFhSxfJ6Sst';
const mongodbDatabaseName = 'Penn-Marketplace';

const port = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGODB_URI
|| `mongodb+srv://${mongodbUsername}:${mongodbPassword}@penn-marketplace.6si5d.mongodb.net/${mongodbDatabaseName}?retryWrites=true&w=majority`;

// mongodb connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// routers
const accountRouter = require('./routes/account');
const itemRouter = require('./routes/item');
const buyerRouter = require('./routes/buyer');

// makes userUploads public
app.use('/userUploads', express.static('userUploads'));

// enables cross origin resource sharing
app.use(cors());

// express bodyParser middleware
app.use(express.json());

// cookies and sessions
app.use(
  cookieSession({
    name: 'session',
    keys: ['secret-key'],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  }),
);

app.use(bodyParserErrorHandler());

// using routers, all routers will be prefixed with /name-of-prefix-route
app.use('/account', accountRouter);
app.use('/item', itemRouter);
app.use('/buyer', buyerRouter);

// default error handling
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  return res.status(500).send(`There was an error with error message: ${err}!`);
});

// Start listening for requests
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log(`MongoDB is connected at ${MONGO_URI}`);
});
