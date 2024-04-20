// Import the required modules
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import apiRoutes from './routes/apiRoutes.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import User from './models/User.js';
import dotenv from 'dotenv';
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json()); // Add this line to parse JSON request bodies

// CORS middleware to allow requests from all origins
app.use(cors({
  origin: 'http://localhost:5173'
}));

// Add Content Security Policy header middleware
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "script-src 'self' https://trusted-cdn.com;"  );
  next();
});

// Logging Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('MongoDB connected'))
 .catch(err => console.error('MongoDB connection error:', err));

// Define a default route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Define your routes here...
// Get all registered users route
app.use(apiRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
