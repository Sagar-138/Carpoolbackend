//middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user.js'); // Import the User model

const jwtSecret = process.env.JWT_SECRET || 'your_default_secret'; // Use a strong, random secret in production

// Middleware to check if the request has a valid JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token not provided' });
  }

  jwt.verify(token, jwtSecret, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // Check if the user associated with the token exists
    try {
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized: User not found' });
      }

      // Attach the user object to the request for further use in routes
      req.user = user;

      // Continue to the next middleware or route handler
      next();
    } catch (error) {
      console.error('Error verifying user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
};

// Add more middleware functions as needed