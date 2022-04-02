const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  birthday: { type: String, required: true },
  school: { type: String, required: true },
  classYear: { type: Number, required: true },
  rating: { type: Number, required: true },
  reviews: [{ type: Schema.ObjectID, ref: 'Review' }],
  followers: [{ type: Schema.ObjectID, ref: 'User' }],
  following: [{ type: Schema.ObjectID, ref: 'User' }],
  blocked: [{ type: Schema.ObjectID, ref: 'User' }],
  transactionHistory: [{ type: Schema.ObjectID, ref: 'Transaction' }],
  watchlistRegular: [{ type: Schema.ObjectID, ref: 'ItemRegular' }],
  watchlistBid: [{ type: Schema.ObjectID, ref: 'ItemBid' }],
  reports: [{ type: Schema.ObjectID, ref: 'Report' }],
  created_at: Date,
});

const User = model('User', userSchema);

module.exports = User;
