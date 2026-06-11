# JWT Authentication App

A full-stack authentication application built using React, Node.js, Express, MongoDB, and JWT.

## Features

- User Registration (Signup)
- User Login
- Password Hashing using bcrypt
- JWT-based Authentication
- Protected Profile Page
- MongoDB Atlas Integration
- Secure API Routes using Authentication Middleware

## Tech Stack

### Frontend
- React
- React Router DOM
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (JSON Web Token)
- bcrypt

## Run Locally

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd my-react-app
npm install
npm run dev
```

## Environment Variables

Backend `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```