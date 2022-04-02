const express = require('express');
const bcrypt = require('bcrypt');
const isLoggedIn = require('../middleware/isLoggedIn');
const isPennStudent = require('../middleware/isPennStudent');
const User = require('../models/User');

const router = express.Router();

// route to create an account
router.post('/signup', isPennStudent, async (req, res, next) => {
  const {
    email, firstName, lastName, password, month, day, year, major, school, classYear,
  } = req.body;

  if (!firstName.match(/^[a-zA-Z]+$/) || !lastName.match(/^[a-zA-Z]+$/)) {
    res.send('This is an invalid first name or last name');
  }

  try {
    const user = await User.create({
      email,
      name: `${firstName} ${lastName}`,
      password,
      birthday: `${month} ${day} ${year}`,
      major: `${major}`,
      school,
      classYear,
      rating: 0,
      reviews: [],
      followers: [],
      following: [],
      blocked: [],
      transactionHistory: [],
      watchlistRegular: [],
      watchlistBid: [],
      reports: [],
    });
    res.send(`The user with name "${user.name}" was successfully created!`);
  } catch (error) {
    next(new Error(`Error inside /signup with error message: ${error}`));
  }
});

// route to login
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      req.session.email = email;
      req.session.name = user.name;
      res.send(`The user with name ${user.name} and email ${email} has logged in`);
    } else {
      res.send('The user does not exist or the password is incorrect!');
    }
  } catch (error) {
    next(new Error(`Error inside /login with error message: ${error}`));
  }
});

// route get user session information
router.get('/user', (req, res, next) => {
  res.send({ name: req.session.name, email: req.session.email });
});

// route to log the user out
router.post('/logout', isLoggedIn, async (req, res, next) => {
  const { name } = req.session;
  req.session.email = undefined;
  req.session.name = undefined;
  res.send(`The user with name "${name} has been logged out!"`);
});

module.exports = router;
