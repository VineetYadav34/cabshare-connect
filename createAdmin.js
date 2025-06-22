const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/cabshare', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createAdminUser = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@cabshare.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email: admin@cabshare.com');
      console.log('Password: admin123');
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@cabshare.com',
      password: hashedPassword,
      phone: '+1234567890',
      isAdmin: true,
      rating: 5.0,
      totalRides: 0,
      completedRides: 0,
      cancelledRides: 0
    });

    await adminUser.save();
    
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@cabshare.com');
    console.log('🔑 Password: admin123');
    console.log('👑 Admin privileges: ENABLED');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

createAdminUser(); 