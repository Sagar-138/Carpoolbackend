// validationMiddleware.js

const { validationResult } = require('express-validator');

// Middleware to handle input validation errors
exports.validateInputs = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }

  next();
};

// Add more middleware functions for specific input validations as needed
