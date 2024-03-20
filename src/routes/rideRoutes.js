const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); 
const ObjectId = mongoose.Types.ObjectId;// Add this line

const Ride = require('../models/ride.js'); // Import the Ride model

// Route to get all rides
router.get('/', async (req, res) => {
  try {
    const rides = await Ride.find();
    res.status(200).json(rides);
  } catch (error) {
    console.error('Error getting rides:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to create a new ride
router.post('/create', async (req, res) => {
  try {
    const { driver, origin, destination, departureTime, availableSeats, vehicleType } = req.body;

    // Validate that the driver field is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(driver)) {
      return res.status(400).json({ message: 'Invalid driver ObjectId' });
    }

    // Create a new ride
    const newRide = new Ride({
      driver: mongoose.Types.ObjectId(driver), // Convert to ObjectId
      origin,
      destination,
      departureTime,
      availableSeats,
      vehicleType,
    });

    // Save the ride to the database
    await newRide.save();

    res.status(201).json({ message: 'Ride created successfully' });
  } catch (error) {
    console.error('Error creating ride:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// Route to get details of a specific ride
router.get('/:rideId', async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.rideId);

    // Check if the ride exists
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    res.status(200).json(ride);
  } catch (error) {
    console.error('Error getting ride details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
