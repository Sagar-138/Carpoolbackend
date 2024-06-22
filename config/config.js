// config.js

const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Export configuration settings
module.exports = {
  port: process.env.PORT || 3002,
  mongoURI: process.env.MONGODB_URI,
  // Add other configuration settings as needed
};
