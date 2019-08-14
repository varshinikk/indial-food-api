const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
  RstId: {
    type: Schema.Types.ObjectId,
    ref: 'restaurants',
    required: true
  },
  menuName: {
    type: 'String',
    required: true
  },
})
module.exports = mongoose.model('menu', menuSchema);