# Quick Start Guide

Get EventHub running in 5 minutes!

## Step 1: Install MongoDB

Make sure MongoDB is installed and running on your system.

**macOS (using Homebrew):**

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Ubuntu/Debian:**

```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

**Windows:**
Download and install from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

## Step 2: Setup Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create admin user
npm run create-admin

# Start server
npm run dev
```

Backend will run on `http://localhost:5000`

## Step 3: Setup Frontend

Open a new terminal:

```bash
# Navigate to frontend
cd event-vite

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

## Step 4: Login

Open your browser and go to `http://localhost:5173`

**Admin Login:**

- Email: `admin@event.com`
- Password: `admin123`

**User Login:**

- Register a new account or use any email/password (will be validated against backend)

## Troubleshooting

### MongoDB Connection Error

- Make sure MongoDB is running: `brew services list` (macOS) or `sudo systemctl status mongodb` (Linux)
- Check the MONGO_URI in `backend/.env`

### Port Already in Use

- Backend: Change PORT in `backend/.env`
- Frontend: Vite will automatically use next available port

### CORS Errors

- Make sure backend is running before starting frontend
- Check that VITE_API_URL in `event-vite/.env` matches your backend URL

## Next Steps

1. Create events from the admin dashboard
2. Register users and test event registration
3. Explore the API endpoints
4. Customize the styling and features

Enjoy using EventHub! 🎉
