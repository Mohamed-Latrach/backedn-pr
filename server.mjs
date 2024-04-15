// Import the dotenv module
import dotenv from 'dotenv';
dotenv.config();

// Import other modules
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './models/User.js';

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// CORS middleware to allow requests from all origins
app.use(cors());

// Add Content Security Policy header middleware
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "script-src 'self' 'unsafe-inline';"
  );
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
app.post('/api/auth/login', async (req, res) => {
  // Get the username and password from the request body
  const { email, password } = req.body;

  // Check if the username and password are provided
  if (!email ||!password) {
    return res.status(400).json({ message: 'email and password are required' });
  }

  // Find the user by username
  const user = await User.findOne({ email });

  // Check if the user exists
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Compare the provided password with the stored password hash
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // Check if the password is valid
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  // Generate a JWT token for the user
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Send the token as a response
  res.json({ token });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
