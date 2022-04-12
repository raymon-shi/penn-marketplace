const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const reviewSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  recipient: { type: Schema.Types.ObjectId, ref: 'User' },
  reviewContent: { type: String, required: true },
  reviewRating: { type: Number, required: true },
}, { timestamps: true });

const Review = model('Review', reviewSchema);

module.exports = Review;
