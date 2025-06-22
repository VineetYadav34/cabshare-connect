const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Ride = require('./models/Ride');
const Review = require('./models/Review');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/cabshare', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createSampleData = async () => {
  try {
    console.log('🚀 Creating sample data...');

    // Create sample users
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const users = [
      {
        name: 'John Driver',
        email: 'john@example.com',
        password: hashedPassword,
        phone: '+1234567890',
        rating: 4.8,
        totalRides: 15,
        completedRides: 12,
        cancelledRides: 3
      },
      {
        name: 'Sarah Passenger',
        email: 'sarah@example.com',
        password: hashedPassword,
        phone: '+1234567891',
        rating: 4.5,
        totalRides: 8,
        completedRides: 7,
        cancelledRides: 1
      },
      {
        name: 'Mike Commuter',
        email: 'mike@example.com',
        password: hashedPassword,
        phone: '+1234567892',
        rating: 4.9,
        totalRides: 25,
        completedRides: 23,
        cancelledRides: 2
      }
    ];

    const createdUsers = [];
    for (const userData of users) {
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        const user = new User(userData);
        await user.save();
        createdUsers.push(user);
        console.log(`✅ Created user: ${user.name}`);
      } else {
        createdUsers.push(existingUser);
        console.log(`ℹ️ User already exists: ${existingUser.name}`);
      }
    }

    // Create sample rides
    const sampleRides = [
      {
        title: 'Morning Commute to Downtown',
        description: 'Daily commute to the business district. Clean car, good music, and punctual service.',
        origin: 'Suburban Heights',
        destination: 'Downtown Business District',
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days from now
        departureTime: '08:00',
        availableSeats: 3,
        price: 15.00,
        driver: createdUsers[0]._id,
        vehicleInfo: {
          model: 'Toyota Camry',
          color: 'Silver',
          licensePlate: 'ABC-123'
        },
        rules: ['No smoking', 'No pets', 'Be on time'],
        status: 'active'
      },
      {
        title: 'Weekend Trip to Airport',
        description: 'Reliable airport transportation. Large trunk for luggage.',
        origin: 'City Center',
        destination: 'International Airport',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days from now
        departureTime: '14:30',
        availableSeats: 2,
        price: 25.00,
        driver: createdUsers[2]._id,
        vehicleInfo: {
          model: 'Honda Accord',
          color: 'Blue',
          licensePlate: 'XYZ-789'
        },
        rules: ['No smoking', 'Luggage space available'],
        status: 'active'
      },
      {
        title: 'Evening Return from University',
        description: 'Safe ride back from campus. Perfect for students.',
        origin: 'University Campus',
        destination: 'Student Housing Complex',
        date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // tomorrow
        departureTime: '18:00',
        availableSeats: 4,
        price: 12.00,
        driver: createdUsers[1]._id,
        vehicleInfo: {
          model: 'Nissan Altima',
          color: 'White',
          licensePlate: 'STU-456'
        },
        rules: ['Student-friendly', 'Quiet ride for studying'],
        status: 'active'
      },
      {
        title: 'Shopping Mall Express',
        description: 'Quick ride to the mall. Perfect for shopping trips.',
        origin: 'Residential Area',
        destination: 'Shopping Mall',
        date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 4 days from now
        departureTime: '10:00',
        availableSeats: 2,
        price: 8.00,
        driver: createdUsers[0]._id,
        vehicleInfo: {
          model: 'Toyota Camry',
          color: 'Silver',
          licensePlate: 'ABC-123'
        },
        rules: ['Shopping bags welcome', 'No smoking'],
        status: 'active'
      }
    ];

    const createdRides = [];
    for (const rideData of sampleRides) {
      const ride = new Ride(rideData);
      await ride.save();
      createdRides.push(ride);
      console.log(`✅ Created ride: ${ride.title}`);
    }

    // Create sample bookings
    const bookings = [
      {
        ride: createdRides[0]._id,
        passenger: createdUsers[1]._id,
        status: 'accepted',
        seatsBooked: 1
      },
      {
        ride: createdRides[1]._id,
        passenger: createdUsers[2]._id,
        status: 'accepted',
        seatsBooked: 1
      },
      {
        ride: createdRides[2]._id,
        passenger: createdUsers[0]._id,
        status: 'accepted',
        seatsBooked: 1
      }
    ];

    for (const bookingData of bookings) {
      // Add booking to ride
      const ride = await Ride.findById(bookingData.ride);
      if (ride) {
        ride.passengers.push({
          user: bookingData.passenger,
          status: bookingData.status,
          bookedAt: new Date()
        });
        
        if (bookingData.status === 'accepted') {
          ride.availableSeats -= bookingData.seatsBooked;
        }
        
        await ride.save();
        console.log(`✅ Created booking for ride: ${ride.title}`);
      }
    }

    // Create sample reviews
    const reviews = [
      {
        ride: createdRides[2]._id,
        reviewer: createdUsers[0]._id,
        rating: 5,
        comment: 'Excellent service! Very punctual and the car was spotless. Highly recommend!'
      },
      {
        ride: createdRides[0]._id,
        reviewer: createdUsers[1]._id,
        rating: 4,
        comment: 'Good ride, driver was friendly and professional. Would book again.'
      }
    ];

    for (const reviewData of reviews) {
      const review = new Review(reviewData);
      await review.save();
      console.log(`✅ Created review with rating: ${review.rating} stars`);
    }

    console.log('\n🎉 Sample data created successfully!');
    console.log('\n📊 Summary:');
    console.log(`👥 Users: ${createdUsers.length}`);
    console.log(`🚗 Rides: ${createdRides.length}`);
    console.log(`📝 Reviews: ${reviews.length}`);
    console.log('\n🔑 Login Credentials:');
    console.log('Email: john@example.com | Password: password123');
    console.log('Email: sarah@example.com | Password: password123');
    console.log('Email: mike@example.com | Password: password123');
    console.log('Email: admin@cabshare.com | Password: admin123 (Admin)');

  } catch (error) {
    console.error('❌ Error creating sample data:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

createSampleData(); 