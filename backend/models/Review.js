const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const reviewSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  recipient: { type: Schema.Types.ObjectId, ref: 'User' },
  listingRegular: { type: Schema.Types.ObjectId, ref: 'ItemRegular' },
  listingBid: { type: Schema.Types.ObjectId, ref: 'ItemBid' },
  reviewContent: { type: String, required: true },
  reviewRating: { type: Number, required: true },
}, { timestamps: true });

const Review = model('Review', reviewSchema);

module.exports = Review;
