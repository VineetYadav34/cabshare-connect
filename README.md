# CabShare Connect Backend

A Node.js/Express backend for the CabShare Connect ride-sharing platform.

## Features

- User authentication with JWT
- Ride creation and management
- Booking system
- Reviews and ratings
- Admin dashboard
- MongoDB database integration

## Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
MONGO_URI=mongodb://localhost:27017/cabshare
JWT_SECRET=your_jwt_secret_here
PORT=5000
NODE_ENV=development
```

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. The server will run on `http://localhost:5000`

## API Endpoints

- `GET /` - Health check
- `GET /health` - Server status
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/rides` - Get all rides
- `POST /api/rides` - Create a new ride
- `GET /api/reviews` - Get reviews
- `POST /api/reviews` - Create a review
- `GET /api/admin/dashboard` - Admin dashboard

## Deployment

This backend is configured for deployment on platforms like Render, Railway, or Heroku.

### Required Environment Variables for Production:

- `MONGO_URI` - MongoDB connection string (use MongoDB Atlas for production)
- `JWT_SECRET` - Strong secret for JWT token signing
- `NODE_ENV` - Set to "production"
- `PORT` - Port number (usually set by the hosting platform)

### CORS Configuration

The server is configured to accept requests from:
- Development: `http://localhost:3000`, `http://localhost:3001`
- Production: Update the CORS configuration in `index.js` with your frontend domain

## Database Setup

1. Create a MongoDB Atlas cluster
2. Get your connection string
3. Set the `MONGO_URI` environment variable
4. Run the sample data script: `node createSampleData.js`

## Sample Data

Run the sample data script to populate the database with test data:

```bash
node createSampleData.js
```

This will create sample users, rides, and bookings for testing. 