// user.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ['passenger', 'driver'],
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  carNumber: {
    type: String,
    required: function () {
      return this.userType === 'driver';
    },
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
