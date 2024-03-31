// rideRoutes.js

const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
// const Ride = require('../models/ride.js');
const rideController = require('../controllers/rideController'); 


// Route to create a new ride
router.post('/create', rideController.createRide);

// Route to get details of a specific ride
router.get('/:rideId', rideController.getRideDetails);

// Route to get all rides
router.get('/', rideController.getAllRides);

module.exports = router;
