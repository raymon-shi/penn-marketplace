const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const MessageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
}, { timestamps: true });

const Message = model('Message', MessageSchema);

module.exports = Message;
