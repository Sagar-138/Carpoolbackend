// rideController.js

const Ride = require('../models/ride.js'); // Import the Ride model

// Controller for creating a new ride
exports.createRide = async (req, res) => {
  try {
    const { startLocation, endLocation, date, time, seatsAvailable, phoneNumber, carName } = req.body;

    // Create a new ride
    const newRide = new Ride({
      startLocation,
      endLocation,
      date,
      time,
      seatsAvailable,
      phoneNumber,
      carName,
    });

    // Save the ride to the database
    await newRide.save();

    res.status(201).json({ message: 'Ride created successfully', ride: newRide });
  } catch (error) {
    console.error('Error creating ride:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller for getting details of a specific ride
exports.getRideDetails = async (req, res) => {
  try {
    const rideId = req.params.rideId;

    // Find the ride by ID
    const ride = await Ride.findById(rideId);

    // Check if the ride exists
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    res.status(200).json(ride);
  } catch (error) {
    console.error('Error getting ride details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller for getting all rides
exports.getAllRides = async (req, res) => {
  try {
    const rides = await Ride.find();

    res.status(200).json(rides);
  } catch (error) {
    console.error('Error getting rides:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
