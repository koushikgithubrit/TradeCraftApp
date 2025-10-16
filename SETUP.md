# TradeCraft Setup Instructions

## Fixed Issues
- ✅ Removed authentication bypass in AuthContext
- ✅ Fixed Google OAuth client initialization
- ✅ Created environment files with required variables
- ✅ Fixed server startup script
- ✅ Standardized API URLs across frontend and backend
- ✅ Fixed cookie handling for authentication

## Prerequisites
1. Node.js (v14 or higher)
2. MongoDB (local installation or MongoDB Atlas)
3. Google OAuth credentials (optional, for Google login)

## Setup Steps

### 1. Install Dependencies
```bash
# Root directory (frontend)
npm install

# Server directory
cd server
npm install
cd ..
```

### 2. Configure Environment Variables

Update the environment files with your actual values:

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your-actual-google-client-id
```

**Server (server/.env):**
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-here
MONGODB_URI=mongodb://localhost:27017/tradecraft
GOOGLE_CLIENT_ID=your-actual-google-client-id
```

### 3. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# Windows (if installed as service)
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

### 4. Start the Application
```bash
# Start both frontend and backend
npm start

# Or start separately:
# Frontend: npm run dev
# Backend: npm run server
```

### 5. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## Google OAuth Setup (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google OAuth API
4. Create OAuth credentials
5. Add http://localhost:5173 to authorized origins
6. Update your environment files with the client ID

## Testing Authentication
1. Register a new account via the signup form
2. Login with email/password
3. Test Google OAuth (if configured)
4. Verify user session persists across page reloads

## Common Issues
- **MongoDB connection error**: Ensure MongoDB is running and URI is correct
- **CORS errors**: Check that CORS is properly configured in server/index.js
- **Google OAuth not working**: Verify client ID and authorized origins
- **Cookies not working**: Check that credentials are included in requests

## Database Schema
Users are stored with the following structure:
- name (string)
- email (string, unique)
- password (hashed string, optional for OAuth users)
- googleId (string, for OAuth users)
- isAdmin (boolean)
- mobile (string, optional)
- courses (array of course progress objects)