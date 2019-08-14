const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  food_name: {
    type: String
  },
  price: {
    type: Number
  },
  quantity: {
    type: Number
  },
  total_price: {
    type: Number
  }
})
module.exports = mongoose.model('cart', cartSchema);