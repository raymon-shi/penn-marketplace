const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const itemRegularSchema = new Schema({
  posterName: { type: String, required: true },
  itemName: { type: String, required: true },
  media: { type: String },
  price: { type: Number, required: true },
  tags: [{ type: String }],
  created_at: Date,
});

const ItemRegular = model('ItemRegular', itemRegularSchema);

module.exports = ItemRegular;
