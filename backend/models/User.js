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
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  blocked: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  transactionHistory: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
  watchlistRegular: [{ type: Schema.Types.ObjectId, ref: 'ItemRegular' }],
  watchlistBid: [{ type: Schema.Types.ObjectId, ref: 'ItemBid' }],
  reports: [{ type: Schema.Types.ObjectId, ref: 'Report' }],
  created_at: Date,
});

const User = model('User', userSchema);

module.exports = User;
