<<<<<<< HEAD
# Full-Stack-Project
=======
# EventHub - Event Management Platform

A full-stack event management application with React frontend and Node.js backend.

## Features

- User authentication (login/register)
- Admin dashboard for event management
- User dashboard for browsing and registering for events
- Event creation, viewing, and deletion
- Event registration system
- Responsive design

## Tech Stack

### Frontend

- React 18
- Vite
- Axios for API calls

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password hashing

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables in `.env`:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/eventDB
JWT_SECRET=your_secure_secret_key_here
```

4. Start the backend server:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd event-vite
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables in `.env`:

```
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Default Admin Credentials

After setting up the backend, create an admin user by running:

```bash
cd backend
npm run create-admin
```

This will create an admin account with:

- Email: `admin@event.com`
- Password: `admin123`

You can then login with these credentials to access the admin dashboard.

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Events

- `GET /api/events` - Get all events
- `POST /api/events` - Create event (admin only)
- `DELETE /api/events/:id` - Delete event (admin only)

### Registrations

- `POST /api/registrations` - Register for event
- `GET /api/registrations` - Get all registrations (admin only)
- `GET /api/registrations/event/:eventId` - Get event registrations (admin only)

## Project Structure

```
.
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth & role middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   └── server.js        # Entry point
│
└── event-vite/
    ├── src/
    │   ├── components/  # React components
    │   ├── services/    # API service layer
    │   ├── App.jsx      # Main app component
    │   └── main.jsx     # Entry point
    └── public/          # Static assets
```

## License

ISC
>>>>>>> f721da9 (Initial commit)
