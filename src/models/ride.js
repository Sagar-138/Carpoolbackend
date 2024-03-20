//ride.js
const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (assuming you have a User model)
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  departureTime: {
    type: Date,
    required: true,
  },
  availableSeats: {
    type: Number,
    required: true,
  },
  passengers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for passengers
  }],
  vehicleType: {
    type: String,
    // You can set an enum with allowed vehicle types if needed
  },
  // You can include additional fields as needed
  // For example: vehicleModel, licensePlate, etc.
}, { timestamps: true });

rideSchema.virtual('vacantSeats').get(function () {
  return this.availableSeats - this.passengers.length;
});

const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;
