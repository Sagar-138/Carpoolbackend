// errorHandler.js

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Validation error', errors: err.errors });
  }

  // Handle MongoDB duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({ message: 'Duplicate key error', errors: err.keyValue });
  }

  res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = errorHandler;
