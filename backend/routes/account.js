const express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const isPennStudent = require('../middleware/isPennStudent');
const User = require('../models/User');

const router = express.router();

// route to create an account
router.post('/signup', isPennStudent, async (req, res, next) => {
  const {
    email, firstName, lastName, password, month, day, year, school, classYear,
  } = req.body;
  try {
    const user = await User.create({
      email,
      name: `${firstName} ${lastName}`,
      password,
      birthday: `${month} ${day} ${year}`,
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

// route to log the user out
router.post('/logout', isLoggedIn, async (req, res, next) => {
  const { name } = req.session;
  req.session.email = undefined;
  req.session.name = undefined;
  res.send(`The user with name "${name} has been logged out!"`);
});

module.exports = router;
