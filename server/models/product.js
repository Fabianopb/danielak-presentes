var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name: String,
  image: [String],
  storeLink: String,
  description: String,
  currentPrice: Number,
  discountPrice: Number,
  tags: String,
  productionTime: Number,
  minAmount: Number,
  dimensions: {
    width: Number,
    height: Number,
    depth: Number,
    weight: Number
  },
  isVisible: Boolean,
  isFeatured: Boolean
});

module.exports = mongoose.model('Product', ProductSchema);
