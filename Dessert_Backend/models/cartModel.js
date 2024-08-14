const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
  user_id: {
    type: String,
    ref: 'User',
    required: true
  },
  products: [{
    productId: {
      type: String,  
      ref: 'Product'
    },
    quantity: {
      type: Number
    }
  }]
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
