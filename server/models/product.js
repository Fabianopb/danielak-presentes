const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: null,
  },
  image: {
    type: [
      {
        large: String,
        small: String,
      },
    ],
    default: [],
  },
  featuredImageIndex: {
    type: Number,
    required: true,
    default: 0,
  },
  storeLink: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    required: true,
    default: '',
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: null,
  },
  currentPrice: {
    type: Number,
    required: true,
    default: null,
  },
  discountPrice: {
    type: Number,
    required: false,
    default: null,
  },
  tags: {
    type: String,
    required: true,
    default: null,
  },
  productionTime: {
    type: Number,
    required: true,
    default: null,
  },
  minAmount: {
    type: Number,
    required: true,
    default: 1,
  },
  width: {
    type: Number,
    required: true,
    default: null,
  },
  height: {
    type: Number,
    required: true,
    default: null,
  },
  depth: {
    type: Number,
    required: true,
    default: null,
  },
  weight: {
    type: Number,
    required: true,
    default: null,
  },
  isVisible: {
    type: Boolean,
    required: true,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model('Product', ProductSchema);
