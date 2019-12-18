const express = require('express');
const { body } = require('express-validator');

const User = require('../Models/user');

const router = express.Router();

const authController = require('../Controllers/auth');

// POST /auth/signup
router.post('/signup', [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom( value => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return res.status(500).json({message: 'User email already exists - Login instead'});
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 }),
  ], authController.signup);

// POST /auth/login
router.post('/login', authController.login);

module.exports = router;