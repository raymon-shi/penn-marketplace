const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const transactionSchema = new Schema({
  seller: { type: Schema.ObjectID, ref: 'User' },
  buyer: { type: Schema.ObjectID, ref: 'User' },
  listingRegular: { type: Schema.ObjectID, ref: 'ItemRegular' },
  listingBid: { type: Schema.ObjectID, ref: 'ItemBid' },
  totalCost: { type: Number, required: true },
  created_at: Date,
});

const Transaction = model('Transaction', transactionSchema);

module.exports = Transaction;
