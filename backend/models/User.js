const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  birthday: { type: String, required: true },
  major: { type: String, required: true },
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
  shoppingCat: [{ type: Schema.Types.ObjectId, ref: 'Cart' }],
  reports: [{ type: Schema.Types.ObjectId, ref: 'Report' }],
  created_at: Date,
});

// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
  try {
    const passwordSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, passwordSalt);
    this.password = hashedPassword;
  } catch (error) {
    next(new Error(`There was an error in hashing the password with error message ${error}`));
  }
});

const User = model('User', userSchema);

module.exports = User;
