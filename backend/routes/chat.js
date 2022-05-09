const express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const isPennStudent = require('../middleware/isPennStudent');
const User = require('../models/User');
const Message = require('../models/Message');

const router = express.Router();

router.get('/followed', async (req, res, next) => {
  const { session } = req;
  const { email } = session;
  try {
    const user = await User.findOne({ email });
    const unique = [];
    user.followers.forEach((element) => {
      if (!unique.some((e) => e.name === element.followerName)) {
        unique.push({ name: element.followerName, email: element.followerEmail });
      }
    });
    user.following.forEach((element) => {
      if (!unique.some((e) => e.name === element.followingName)) {
        unique.push({ name: element.followingName, email: element.followingEmail });
      }
    });
    res.status(200).json(unique);
  } catch (err) {
    next(new Error('Error with retrieving list of followed'));
  }
});

router.get('/messages', async (req, res, next) => {
  const { name } = req.query;
  const { session } = req;
  try {
    const msgs = await Message.find({
      $or: [
        { $and: [{ sender: session.name }, { receiver: name }] },
        { $and: [{ sender: name }, { receiver: session.name }] },
      ],
    });
    res.status(200).json(msgs);
  } catch (err) {
    next(new Error('Error with retrieving messages'));
  }
});

router.post('/sendMessage', async (req, res, next) => {
  const { body, session } = req;
  const { receiver, message, img } = body;
  try {
    if (img) {
      await Message.create({
        sender: session.name, receiver, message, img,
      });
    } else {
      await Message.create({ sender: session.name, receiver, message });
    }
    res.status(200).json({ message: 'created message successfully' });
  } catch (error) {
    next(new Error('Error sending a message!'));
  }
});

module.exports = router;
