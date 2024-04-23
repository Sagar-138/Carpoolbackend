//models/ride.js
const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
 
  startLocation: {
    type: String,
    required: true,
  },
  endLocation: {
    type: String,
    required: true,
  },
  date: {
    type: Date, // Assuming the date of the ride
    required: true,
  },
  time: {
    type: String, // Assuming the time of the ride as a string
    required: true,
  },
  seatsAvailable: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  carName: {
    type: String,
    required: true,
  },
  price: {
    type: Number, // Assuming the price is a number
    required: true,
  },
  vehicleType: {
    type: String,
    // You can set an enum with allowed vehicle types if needed
  },
  // You can include additional fields as needed
  // For example: vehicleModel, licensePlate, etc.
}, { timestamps: true });

rideSchema.virtual('vacantSeats').get(function () {
  return this.seatsAvailable - this.passengers.length;
});

const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;
