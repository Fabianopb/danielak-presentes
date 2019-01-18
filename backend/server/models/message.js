const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  message: {
    type: [String],
    required: true,
    default: null
  },
  new: {
    type: Boolean,
    default: true
  },
  answered: {
    type: Boolean,
    default: false
  }
}, { timestamps: { createdAt: 'createdAt' } });

module.exports = mongoose.model('Message', MessageSchema);
