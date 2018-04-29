const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  removed: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = mongoose.model('Category', CategorySchema);
