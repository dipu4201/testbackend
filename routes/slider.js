const express = require('express');
const router = express.Router();
const Slider = require('../models/Slider');
const { protect, adminOnly } = require('../middleware/auth');

// Get active sliders (public)
router.get('/', async (req, res) => {
  try {
    const sliders = await Slider.find({ isActive: true }).sort({ order: 1 });
    res.json(sliders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all sliders (admin)
router.get('/admin/all', protect, adminOnly, async (req, res) => {
  try {
    const sliders = await Slider.find().sort({ order: 1 });
    res.json(sliders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create slider (admin)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const slider = await Slider.create(req.body);
    res.status(201).json(slider);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update slider (admin)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const slider = await Slider.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(slider);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete slider (admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Slider.findByIdAndDelete(req.params.id);
    res.json({ message: 'Slider deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
