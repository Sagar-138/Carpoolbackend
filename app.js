// app.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes.js');
const rideRoutes = require('./src/routes/rideRoutes.js');
// const mapRoutes = require('./src/routes/mapRoutes.js');
const errorHandler = require('./errorHandler.js');
const { connectToDatabase } = require('./db.js');
const generateToken = require('./src/services/tokengeneration.js');
const AutosuggestRoute = require('./src/routes/AutosuggestRoute.js')
// const proxy =require('./src/services/proxyConfig.js')

let latestToken = "";
// Load environment variables from .env file
dotenv.config();
// const path = require('path');

// Create an Express application
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to the database
(async () => {
  try {
    const dbConnection = await connectToDatabase();
    console.log('Connected to MongoDB');

    // Add the following line to check the connection status
    console.log('MongoDB connection status:', dbConnection.readyState);

    // Generate token when server starts
    let token = await generateToken();
    // console.log(token);
    // console.log('Token generated:', token);

    // Set up routes
    app.use('/auth', authRoutes);
    app.use('/rides', rideRoutes);
    // app.use('/rides/filter', rideRoutes);
    app.use('/autosuggest', AutosuggestRoute);

    // Generate token route
    app.get('/generate-token', async (req, res) => {
      try {
        token = await generateToken();
        res.status(200).json({ token });

      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Read token route
    app.get('/getToken', async (req, res) => {
      try {
        res.status(200).json({ token });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Default route
    app.get('/', (req, res) => {
      res.send('Welcome to the Hitchify!');
    });

    // Error handling middleware
    app.use(errorHandler);

    // Start the server
    const PORT = process.env.PORT || 3004;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    }).on('error', (err) => {
      console.error(`Error occurred on port ${PORT}:`, err);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
})();
module.exports = app;
