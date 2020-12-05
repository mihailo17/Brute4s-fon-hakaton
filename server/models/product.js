const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productType: {
    type: String,
    required: true,
    trim: true
  },
  productQuantity: {
    type: Number,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  stateOfProduct: {
    type: String,
    default: 'open',
    required: true
  },
  giverThatGives: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Giver'
  },
  receiverThatReceives: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Receiver'
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;