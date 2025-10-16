# MongoDB Setup for TradeCraft Authentication

## Current Status:
✅ Server starts successfully on port 5000
✅ Payment functionality removed
❌ MongoDB connection failing

## Quick MongoDB Atlas Setup:

### Option 1: Use Free MongoDB Atlas (Recommended)

1. **Go to [MongoDB Atlas](https://cloud.mongodb.com/)**
2. **Create free account** or sign in
3. **Create a new cluster** (choose free tier)
4. **Create database user:**
   - Username: `tradecraft_user`
   - Password: `yourpassword123`
5. **Add IP to whitelist:** Add `0.0.0.0/0` for development (allows all IPs)
6. **Get connection string:**
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

### Option 2: Install MongoDB Locally

```bash
# Windows - Download from https://www.mongodb.com/try/download/community
# Or use Chocolatey
choco install mongodb

# Start MongoDB service
net start MongoDB
```

## Update Your Environment:

Replace the MongoDB URI in `server/.env`:

```env
# Replace this line:
MONGODB_URI=mongodb://localhost:27017/tradecraft

# With your Atlas connection string:
MONGODB_URI=mongodb+srv://tradecraft_user:yourpassword123@cluster0.xxxxx.mongodb.net/tradecraft?retryWrites=true&w=majority
```

## Test the Setup:

1. **Update server/.env** with correct MongoDB URI
2. **Restart server:** `cd server && node index.js`
3. **Look for:** "✅ Successfully connected to MongoDB"
4. **Test registration:** Try creating a new account
5. **Check server logs:** Should show successful user creation

## Current Working Server Command:
```bash
cd server
node index.js
```

You should see:
- 🔌 Attempting to connect to MongoDB...
- Server running on port 5000
- ✅ Successfully connected to MongoDB

Then test login/registration from your frontend at http://localhost:5173