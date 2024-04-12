// models/User.js

import mongoose from 'mongoose'; // Import mongoose using ES module syntax

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  birthdate: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  }
});

const User = mongoose.model('User', userSchema);

export default User; // Export User as default
