const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    default: null,
  },
  description: {
    type: String,
    required: true,
    default: null,
  },
  removed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model('Category', CategorySchema);
