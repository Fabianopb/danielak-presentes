const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  image: [String],
  storeLink: String,
  description: String,
  currentPrice: Number,
  discountPrice: Number,
  tags: String,
  productionTime: Number,
  minAmount: Number,
  width: Number,
  height: Number,
  depth: Number,
  weight: Number,
  isVisible: Boolean,
  isFeatured: Boolean
});

module.exports = mongoose.model('Product', ProductSchema);
