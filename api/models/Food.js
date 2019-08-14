const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  menuId: {
    type: Schema.Types.ObjectId,
    ref: 'menus',
    required: true
  },
  foodName: {
    type: 'String',
    required: true
  },
  cost: {
    type: 'Number',
    required: true
  }
})
module.exports = mongoose.model('food', foodSchema);