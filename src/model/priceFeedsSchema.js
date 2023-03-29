var Mongoose = require('mongoose');

var priceFeedsSchema = new Mongoose.Schema({
  storeId: {
    required: true,
    type: Number,
  },
  sku: {
    required: true,
    type: String,
    unique: true
  },
  productName: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  date:{
    required:true,
    type:Date
  }
});

module.exports = Mongoose.model('Pricefeed', priceFeedsSchema);
