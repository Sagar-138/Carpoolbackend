// authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const { validationResult } = require('express-validator');

// const saltRounds = 10;
// const jwtSecret = process.env.JWT_SECRET || 'your_default_secret';

const signup = async (req, res) => {
  // Validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract user data from request body
  const { fullName, email, phoneNumber, password } = req.body;

  try {
    // Check if the user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Create and sign a JWT token
    const token = jwt.sign({ userId: newUser._id }, 'your-secret-key', { expiresIn: '1h' });

    // Send the token in the response
    res.status(201).json({ token, userId: newUser._id, userType: newUser.userType });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

const login = async (req, res) => {
  // Validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract user data from request body
  const { phoneNumber, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    // Create and sign a JWT token
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

    // Send the token in the response
    res.json({ token, userId: user._id, userType: user.userType });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
module.exports = { signup, login };