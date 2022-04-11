const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const reportSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  recipient: { type: Schema.Types.ObjectId, ref: 'User' },
  reportContent: { type: String, required: true },
}, { timestamps: true });

const Report = model('Report', reportSchema);

module.exports = Report;
