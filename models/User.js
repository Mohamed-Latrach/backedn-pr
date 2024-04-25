// models/User.js

import mongoose from 'mongoose'; // Import mongoose using ES module syntax

const userSchema = new mongoose.Schema({
  firstName: {
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
const profileSchema = new mongoose.Schema({
  aboutMe: String,
  username: String,
  name: String
});

const postSchema = new mongoose.Schema({
  content: String,
  createdAt: { type: Date, default: Date.now }
});
const passwordSchema = new mongoose.Schema({
  website: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
export const Password = mongoose.model('Password', passwordSchema);
export default Password;

export const Post = mongoose.model('Post', postSchema);

export const Profile = mongoose.model('Profile', profileSchema);

export const User = mongoose.model('User', userSchema);
