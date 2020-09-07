const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = new Schema(
  {
    text: {
      type: [String],
      required: true,
      default: null,
    },
    new: {
      type: Boolean,
      default: true,
    },
    answered: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: 'createdAt' } },
);

module.exports = mongoose.model('Message', MessageSchema);
