// rideController.js

const Ride = require('../models/ride.js'); // Import the Ride model
const BookedRide = require('../models/bookedRides.js');
const Notification = require('../models/notifications.js');
// const { sendNotificationToDriver } = require('./rideController');

// Controller for creating a new ride
exports.createRide = async (req, res) => {
  try {
    const { startLocation, endLocation, date, time, seatsAvailable, phoneNumber, carName,  price,userId } = req.body;

    // Create a new ride
    // console.log("price", price);
    // console.log("userId", userId);
    const newRide = new Ride({
      startLocation,
      endLocation,
      date,
      time,
      seatsAvailable,
      phoneNumber,
      carName,
      price ,
      userId// Include price here
    });

    // Save the ride to the database
    await newRide.save();

    res.status(201).json({ message: 'Ride created successfully', ride: newRide });
    
  } catch (error) {
    console.error('Error creating ride:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller for getting details of a specific booked ride
exports.getBookedRideDetails = async (req, res) => {
  try {
    const rideId = req.params.rideId;

    // Find the booked ride by ride ID
    const bookedRide = await BookedRide.findOne({ ride: rideId }).populate('ride');

    // Check if the booked ride exists
    if (!bookedRide) {
      return res.status(404).json({ message: 'Booked ride not found' });
    }

    res.status(200).json(bookedRide);
  } catch (error) {
    console.error('Error getting booked ride details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller for getting details of a specific ride
// exports.getRideDetails = async (req, res) => {
//   try {
//     const rideId = req.params.rideId;

//     // Find the ride by ID
//     const ride = await Ride.findById(rideId);

//     // Check if the ride exists
//     if (!ride) {
//       return res.status(404).json({ message: 'Ride not found' });
//     }

//     res.status(200).json(ride);
//   } catch (error) {
//     console.error('Error getting ride details:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

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
//location match api
exports.getRidesByLocation = async (req, res) => {
  try {
    let { startLocation, endLocation } = req.query;

    // Convert to lower case for case-insensitive comparison
    startLocation = startLocation.toLowerCase();
    endLocation = endLocation.toLowerCase();

    // Find rides that match the startLocation and endLocation
    const rides = await Ride.find({
      startLocation: new RegExp('^' + startLocation + '$', 'i'),
      endLocation: new RegExp('^' + endLocation + '$', 'i')
    });

    // Check if any rides are found
    if (!rides.length) {
      return res.status(404).json({ message: 'No rides found for the specified locations' });
    }

    res.status(200).json(rides);
  } catch (error) {
    console.error('Error getting rides by location:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


//booked rides
exports.bookRide = async (req, res) => {
  try {
    const { rideId, paymentMethod } = req.body;

    // Create a new booked ride
    const newBookedRide = new BookedRide({
      ride: rideId,
      paymentMethod
    });

    // Save the booked ride to the database
    await newBookedRide.save();

    res.status(201).json({ message: 'Ride booked successfully', bookedRide: newBookedRide });
  } catch (error) {
    console.error('Error booking ride:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
