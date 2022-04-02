const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const reviewSchema = new Schema({
  author: { type: Schema.ObjectID, ref: 'User' },
  recipient: { type: Schema.ObjectID, ref: 'User' },
  listingRegular: { type: Schema.ObjectID, ref: 'ItemRegular' },
  listingBid: { type: Schema.ObjectID, ref: 'ItemBid' },
  reviewContent: { type: String, required: true },
  reviewRating: { type: Number, required: true },
  created_at: Date,
});

const Review = model('Review', reviewSchema);

module.exports = Review;
