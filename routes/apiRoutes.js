import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User'; // Import your User model

const router = express.Router();

// Register endpoint handler
router.post('/register', async (req, res) => {
  try {
    // Extract user data from request body
    const { name, email, password } = req.body;

    // Check if user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new User({
      name,
      email,
      password: hashedPassword // Store hashed password in the database
    });

    // Save the user document to the database
    await newUser.save();

    // Return a success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login endpoint handler
router.post('/login', async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Find user by email in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password with hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'your_secret_key_here', { expiresIn: '1h' });

    // Return token and user data in response
    res.status(200).json({ token, user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
