const mongoose = require('mongoose');

const DessertSchema = new mongoose.Schema({
  productId: {
    type: String,
    unique: true,
    required: true
  },
  Product_Name: { type: String, required: true },
  category: { type: String, required: true },  
  price: { type: Number, required: true },
  stock: {
    type: Number,
    required: true,
    default: 10,
  },
  ingredients: [String],  
  calories: { type: Number },
  image: { type: String },  
  description: { type: String },  
  rating: { 
    rate: { type: Number, min: 0, max: 5 },
    count: { type: Number }
  },  
});

const Dessert = mongoose.model('Dessert', DessertSchema);
module.exports = Dessert;
