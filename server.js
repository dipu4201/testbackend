const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB error:', err.message);
    process.exit(1);
  });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/slider', require('./routes/slider'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/upload', require('./routes/upload'));
// Create admin route
app.get('/setup-admin', async (req, res) => {
  try {
    const User = require('./models/User');
    await User.deleteMany({ email: 'admin@dsshop.com' });
    const user = new User({
      name: 'Admin',
      email: 'admin@dsshop.com',
      password: 'admin123',
      role: 'admin',
      phone: '01700000000',
      isActive: true
    });
    await user.save();
    res.json({ message: '✅ Admin created!', email: 'admin@dsshop.com', password: 'admin123' });
  } catch (err) {
    res.json({ error: err.message });
  }
});
// Health check
app.get('/', (req, res) => {
  res.json({ message: '🚀 DS Shop API is running', status: 'ok' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
