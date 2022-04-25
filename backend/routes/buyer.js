const express = require('express');
const ItemRegular = require('../models/ItemRegular');
const ItemBid = require('../models/ItemBid');

const router = express.Router();

// route to retrieve regular listings by item ID
router.get('/getRegListing/:id', async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const item = await ItemRegular.findById(itemId).exec();
    console.log(item);
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
    console.log(item);
    res.status(200).json(item);
  } catch (error) {
    next(new Error('Error with retrieving listing'));
  }
});

module.exports = router;
