const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com', 'http://localhost:3000'] // Add your frontend domain here
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB Atlas
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/cabshare';
mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ MongoDB Atlas connected successfully!');
    console.log('🌐 Database:', mongoose.connection.name);
  })
  .catch(err => {
    console.log('❌ MongoDB connection error:', err.message);
  });

// Root route for testing connection
app.get('/', (req, res) => {
  res.json({ 
    message: 'CabShare Connect Backend API is running!',
    environment: process.env.NODE_ENV || 'development',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    uptime: process.uptime(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/rides', require('./routes/rides'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/admin', require('./routes/admin'));

// User profile routes
app.get('/api/users/profile', require('./middleware/auth').auth, async (req, res) => {
  try {
    const user = await require('./models/User').findById(req.user._id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

app.put('/api/users/profile', require('./middleware/auth').auth, async (req, res) => {
  try {
    const { name, phone, bio, preferences } = req.body;
    const user = await require('./models/User').findByIdAndUpdate(
      req.user._id,
      { name, phone, bio, preferences },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 Database: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Connecting...'}`);
});