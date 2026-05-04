const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const Order = require('../models/Order');

// Get payment info (bKash/Nagad/Rocket numbers)
router.get('/info', async (req, res) => {
  try {
    const settings = await Settings.findOne();
    if (!settings) return res.json({});
    res.json({
      bkash: {
        number: settings.bkashNumber,
        instructions: settings.bkashInstructions
      },
      nagad: {
        number: settings.nagadNumber,
        instructions: settings.nagadInstructions
      },
      rocket: {
        number: settings.rocketNumber,
        instructions: settings.rocketInstructions
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Confirm payment (user submits transaction ID)
router.post('/confirm', async (req, res) => {
  try {
    const { orderId, transactionId, paymentNumber, paymentMethod } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.transactionId = transactionId;
    order.paymentNumber = paymentNumber;
    order.paymentMethod = paymentMethod;
    order.paymentStatus = 'paid';
    order.status = 'confirmed';
    await order.save();

    res.json({ message: 'Payment confirmed successfully', order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
