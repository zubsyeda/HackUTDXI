import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  dob: Date,
  address: String,
  accountType: String,
  communicationPref: String,
  createdAt: { type: Date, default: Date.now },
});

// Prevent duplicate model initialization
export const User = mongoose.models.User || mongoose.model('User', userSchema); 