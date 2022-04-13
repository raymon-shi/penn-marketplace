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
      loginAttempts: 0,
      lockedOutTime: 0,
    });
    res.status(201).send(`The user with name "${user.name}" was successfully created!`);
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

    // if past the lockout period
    if ((new Date().getTime() > user.lockedOutTime)) {
      // if the passwords match
      if (match) {
        req.session.email = email;
        req.session.name = user.name;
        // reset the lockout period
        await User.updateOne({ email }, { loginAttempts: 0 });
        await User.updateOne({ email }, { lockedOutTime: 0 });
        res.send(user);
      } else {
        // otherwise, increase the login attempt and check if exceed and increase lockout period
        await User.updateOne({ email }, { loginAttempts: user.loginAttempts + 1 });
        if (user.loginAttempts >= 3) {
          await User.updateOne(
            { email },
            { lockedOutTime: new Date(new Date().getTime() + (1 * 60000)).getTime() },
          );
        }
        next(new Error('There was not a match!'));
      }
    } else {
      // if still in lockout period, increase the attempt
      await User.updateOne({ email }, { loginAttempts: user.loginAttempts + 1 });
      next(new Error('There was not a match'));
    }
  } catch (error) {
    // catch errors
    next(new Error(`Error inside /login with error message: ${error}`));
  }
});

// route get user session information
router.get('/user', (req, res, next) => {
  res.send({ name: req.session.name, email: req.session.email });
});

// route get user information
router.get('/getUser', async (req, res, next) => {
  const user = await User.findOne({ email: req.session.email });
  res.send({ user });
});

// route to log the user out
router.post('/logout', isLoggedIn, async (req, res, next) => {
  const { name } = req.session;
  req.session.email = undefined;
  req.session.name = undefined;
  res.send(`The user with name "${name} has been logged out!"`);
});

// get the login attempts and locked out time
router.post('/failedLogin', async (req, res, next) => {
  const { body } = req;
  const { email } = body;
  const user = await User.findOne({ email });
  res.send({ loginAttempts: user.loginAttempts, lockedOutTime: user.lockedOutTime });
});

router.post('/resetpassword', async (req, res, next) => {
  const { body } = req;
  const { email, password } = body;

  try {
    const passwordSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, passwordSalt);
    await User.updateOne({ email }, { password: hashedPassword });
    res.send('Password resetted');
  } catch (error) {
    next(new Error('Could not reset password'));
  }
});

router.post('/findUsersOnName', async (req, res, next) => {
  const pattern = new RegExp(`${req.body.name}`, 'i');
  const matchedUsers = await User.find({ name: pattern });
  res.send(matchedUsers);
});

router.post('/postReview', async (req, res, next) => {
  const {
    author, recipient, reviewRating, reviewContent,
  } = req.body;
  const newReview = {
    author: author.email,
    recipient: recipient.email,
    reviewRating,
    reviewContent,
  };
  recipient.reviews.push(newReview);
  try {
    const response = await User.updateOne({
      email: recipient.email,
    }, { reviews: recipient.reviews });
    res.status(200).send('Success');
  } catch (error) {
    throw new Error(`Error posting review: ${error}`);
  }
});

module.exports = router;
