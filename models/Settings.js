const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  shopName: { type: String, default: 'DS Store BD' },
  shopLogo: { type: String },
  shopBanner: { type: String },
  contactPhone: { type: String },
  contactEmail: { type: String },
  address: { type: String },
  deliveryCharge: { type: Number, default: 60 },
  freeDeliveryAbove: { type: Number, default: 1000 },
  bkashNumber: { type: String },
  nagadNumber: { type: String },
  rocketNumber: { type: String },
  bkashInstructions: { type: String, default: 'bKash করুন এবং Transaction ID দিন' },
  nagadInstructions: { type: String, default: 'Nagad করুন এবং Transaction ID দিন' },
  rocketInstructions: { type: String, default: 'Rocket করুন এবং Transaction ID দিন' },
  socialFacebook: { type: String },
  socialInstagram: { type: String },
  socialWhatsapp: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
