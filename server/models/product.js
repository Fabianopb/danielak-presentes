const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: [String],
    required: true
  },
  storeLink: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  currentPrice: {
    type: Number,
    required: true
  },
  discountPrice: {
    type: Number,
    required: false,
    default: 0
  },
  tags: {
    type: String,
    required: true
  },
  productionTime: {
    type: Number,
    required: true
  },
  minAmount: {
    type: Number,
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  depth: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  isVisible: {
    type: Boolean,
    required: true
  },
  isFeatured: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Product', ProductSchema);
