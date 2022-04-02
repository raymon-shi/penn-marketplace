const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const reportSchema = new Schema({
  author: { type: Schema.ObjectID, ref: 'User' },
  recipient: { type: Schema.ObjectID, ref: 'User' },
  reportContent: { type: String, required: true },
  created_at: Date,
});

const Report = model('Report', reportSchema);

module.exports = Report;
