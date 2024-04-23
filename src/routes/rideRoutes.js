// rideRoutes.js

const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
// const Ride = require('../models/ride.js');
const rideController = require('../controllers/rideController'); 

// Route to create a new ride by a driver
router.post('/driver/create', rideController.createRide);

// Route to get all rides created by the driver
router.get('/', rideController.getAllRides);

// Route to edit a ride created by the driver
// router.put('/driver/:rideId/edit', rideController.editRide);

// Route to delete a ride created by the driver
// router.delete('/driver/:rideId/delete', rideController.deleteRide);




// Route to create a new ride
router.post('/create', rideController.createRide);

// Route to get details of a specific ride
// router.get('/:rideId', validateRideId, rideController.getRideDetails);

// Route to get all rides
router.get('/', rideController.getAllRides);

router.get('/filter', rideController.getRidesByLocation);

module.exports = router;
