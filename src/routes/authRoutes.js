// authRoutes.js

const express = require('express');
const { body } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authController = require('../controllers/authController.js');
const validationMiddleware = require('../middleware/validationMiddleware.js');
const User = require('../models/user.js');

const router = express.Router();

router.post(
  '/signup',
  [
    body('fullName').notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('phoneNumber').isMobilePhone().withMessage('Invalid phone number format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  ],
  validationMiddleware.validateInputs,
  authController.signup
);

router.post(
  '/login',
  [
    body('phoneNumber').isMobilePhone().withMessage('Invalid phone number format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  validationMiddleware.validateInputs,
  authController.login
);

module.exports = router;