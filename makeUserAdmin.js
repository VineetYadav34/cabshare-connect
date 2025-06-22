const mongoose = require('mongoose');
const User = require('./models/User');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/cabshare', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const makeUserAdmin = async (email) => {
  try {
    if (!email) {
      console.log('❌ Please provide an email address!');
      console.log('Usage: node makeUserAdmin.js user@example.com');
      return;
    }

    // Find user by email
    const user = await User.findOne({ email: email });
    
    if (!user) {
      console.log(`❌ User with email "${email}" not found!`);
      return;
    }

    // Update user to admin
    user.isAdmin = true;
    await user.save();
    
    console.log('✅ User updated successfully!');
    console.log(`👤 Name: ${user.name}`);
    console.log(`📧 Email: ${user.email}`);
    console.log(`👑 Admin privileges: ENABLED`);
    
  } catch (error) {
    console.error('❌ Error updating user:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

// Get email from command line argument
const email = process.argv[2];
makeUserAdmin(email); 