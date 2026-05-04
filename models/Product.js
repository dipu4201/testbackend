const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { 
    type: String, 
    enum: ['tshirt', 'mug', 'hoodie', 'polo', 'other'],
    required: true 
  },
  images: [{ type: String }],
  colors: [{ type: String }],
  sizes: [{ type: String }],
  stock: { type: Number, default: 100 },
  isActive: { type: Boolean, default: true },
  isCustomizable: { type: Boolean, default: true },
  designAreas: [{
    name: String,
    width: Number,
    height: Number,
    x: Number,
    y: Number
  }]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
