// models/stockModel.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const stockSchema = new mongoose.Schema({
  productId: { type: String, default: uuidv4 }, // Default UUID generated
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Stock', stockSchema);
