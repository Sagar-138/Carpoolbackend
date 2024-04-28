// models/bookedRide.js
const mongoose = require('mongoose');

const bookedRideSchema = new mongoose.Schema({
  ride: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ride',
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  // Add more fields as needed
}, { timestamps: true });

const BookedRide = mongoose.model('BookedRide', bookedRideSchema);

module.exports = BookedRide;
