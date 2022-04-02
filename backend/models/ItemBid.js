const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const itemBidSchema = new Schema({
  posterName: { type: String, required: true },
  itemName: { type: String, required: true },
  media: { type: String },
  price: { type: Number, required: true },
  bidHistory: [{ type: Schema.ObjectID, ref: 'Bid' }],
  tags: [{ type: String }],
  created_at: Date,
});

const ItemBid = model('ItemBid', itemBidSchema);

module.exports = ItemBid;
