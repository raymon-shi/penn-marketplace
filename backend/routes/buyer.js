const express = require('express');
const ItemRegular = require('../models/ItemRegular');
const ItemBid = require('../models/ItemBid');
const User = require('../models/User');

const router = express.Router();

// route to retrieve regular listings by item ID
router.get('/getRegListing/:id', async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const item = await ItemRegular.findById(itemId).exec();
    res.status(200).json(item);
  } catch (error) {
    next(new Error('Error with retrieving listing'));
  }
});

// route to retrieve bid listings by item ID
router.get('/getBidListing/:id', async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const item = await ItemBid.findById(itemId).exec();
    res.status(200).json(item);
  } catch (error) {
    next(new Error('Error with retrieving listing'));
  }
});

// route to add regular item to cart
router.post('/addCartRegItem/:id', async (req, res) => {
  try {
    const item = await ItemRegular.findById(req.params.id);
    const user = await User.findOne({ email: req.session.email });
    user.shoppingCart.push(item);
    await User.updateOne({ email: req.session.email }, { shoppingCart: user.shoppingCart });
    res.status(200).send('Regular listing successfully added to cart!');
  } catch (error) {
    res.status(500).send('An unknown error occured');
    throw new Error('Error with adding reg item to cart');
  }
});

// route to add bid item to cart
router.post('/addCartBidItem/:id', async (req, res) => {
  try {
    const item = await ItemBid.findById(req.params.id);
    const user = await User.findOne({ email: req.session.email });
    user.shoppingCart.push(item);
    await User.updateOne({ email: req.session.email }, { shoppingCart: user.shoppingCart });
    res.status(200).send('Regular listing successfully added to cart!');
  } catch (error) {
    res.status(500).send('An unknown error occured');
    throw new Error('Error with adding bid item to cart');
  }
});

// route to add regular item to watchlist
router.post('/addWatchRegItem/:id', async (req, res) => {
  try {
    const item = await ItemRegular.findById(req.params.id);
    const user = await User.findOne({ email: req.session.email });
    user.watchlistRegular.push(item);
    await User.updateOne({ email: req.session.email }, { watchlistRegular: user.watchlistRegular });
    res.status(200).send('Regular listing successfully added to watchlist!');
  } catch (error) {
    res.status(500).send('An unknown error occured');
    throw new Error('Error with adding reg item to watchlist');
  }
});

// route to add bid item to watchlist
router.post('/addWatchBidItem/:id', async (req, res) => {
  try {
    const item = await ItemBid.findById(req.params.id);
    const user = await User.findOne({ email: req.session.email });
    user.watchlistBid.push(item);
    await User.updateOne({ email: req.session.email }, { watchlistBid: user.watchlistBid });
    res.status(200).send('Bid listing successfully added to watchlist!');
  } catch (error) {
    res.status(500).send('An unknown error occured');
    throw new Error('Error with adding bid item to watchlist');
  }
});

// route to get users shopping cart
router.get('/cart', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.session.email });
    res.status(200).json(user.shoppingCart);
  } catch (error) {
    next(new Error('Error with retrieving listing'));
  }
});


module.exports = router;
