const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderid: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  orderdate: { type: Date, required: true, default: Date.now },
  deliverydate: { type: Date },
  products: [{
    productId: { type: String, required: true }, // Change to String
    quantity: { type: Number, required: true }
  }],
  totalamount: { type: Number, required: true },
  orderstatus: { type: String, required: true, default: 'Pending' },
  user_id: { type: String, required: true }, // Change to String
  email: { type: String, required: true }
});

orderSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('orderdate')) {
    if (!this.deliverydate) {
      this.deliverydate = new Date(this.orderdate);
      this.deliverydate.setDate(this.deliverydate.getDate() + 10);
    }
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
