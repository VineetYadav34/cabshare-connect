# 🚀 CabShare Connect Deployment Guide

## Step-by-Step Deployment to Render

### Prerequisites
- GitHub account
- MongoDB Atlas account

---

## Step 1: Set Up GitHub Repository

1. **Create a GitHub account** at [github.com](https://github.com)
2. **Install Git** from [git-scm.com](https://git-scm.com/download/win)
3. **Create a new repository** on GitHub named `cabshare-connect`
4. **Push your code** to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/cabshare-connect.git
git push -u origin main
```

---

## Step 2: Set Up MongoDB Atlas

1. **Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)**
2. **Create a free account**
3. **Create a new cluster** (free tier)
4. **Create database user:**
   - Username: `cabshare_user`
   - Password: `CabShare123!`
5. **Whitelist IP addresses:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere"
6. **Get connection string:**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string

**Connection string format:**
```
mongodb+srv://cabshare_user:CabShare123!@cluster0.xxxxx.mongodb.net/cabshare?retryWrites=true&w=majority
```

---

## Step 3: Deploy to Render

1. **Go to [Render.com](https://render.com)**
2. **Sign up with your GitHub account**
3. **Click "New +" → "Web Service"**
4. **Connect your GitHub repository**
5. **Configure the service:**

   **Name:** `cabshare-backend`
   
   **Root Directory:** `server`
   
   **Build Command:** `npm install`
   
   **Start Command:** `npm start`
   
   **Environment Variables:**
   - `MONGO_URI` = Your MongoDB Atlas connection string
   - `JWT_SECRET` = `cabshareSuperSecret123!`
   - `NODE_ENV` = `production`
   - `PORT` = `10000`

6. **Click "Create Web Service"**

---

## Step 4: Test Your Deployment

1. **Wait for build to complete** (usually 2-5 minutes)
2. **Get your public URL** (e.g., `https://cabshare-backend.onrender.com`)
3. **Test the API:**
   - Visit: `https://your-app-name.onrender.com/`
   - You should see: `{"message":"CabShare Connect Backend API is running!","environment":"production","timestamp":"..."}`

---

## Step 5: Update Frontend

Update your React frontend to use the new backend URL:

```javascript
// In your frontend API calls, change from:
const API_URL = 'http://localhost:5000';

// To:
const API_URL = 'https://your-app-name.onrender.com';
```

---

## Troubleshooting

### Common Issues:

1. **Build fails:**
   - Check that `package.json` has a `start` script
   - Ensure all dependencies are listed in `package.json`

2. **MongoDB connection fails:**
   - Verify your connection string is correct
   - Check that IP whitelist includes `0.0.0.0/0`

3. **CORS errors:**
   - Update CORS configuration in `server/index.js` with your frontend domain

### Support:
- Render documentation: [render.com/docs](https://render.com/docs)
- MongoDB Atlas documentation: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)

---

## Next Steps

After successful deployment:
1. Deploy your frontend (Vercel, Netlify, etc.)
2. Set up a custom domain
3. Configure SSL certificates
4. Set up monitoring and logging 