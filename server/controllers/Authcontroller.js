const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Import the User model
const jwt = require('jsonwebtoken');
require('dotenv').config(); 
const secret = process.env.SECRET;

// Register controller
exports.register = async (req, res) => {
  const { username, password } = req.body;
  const salt = bcrypt.genSaltSync(10);

  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt), // Hash the password before storing it
    });
    res.json(userDoc); // Respond with the created user document
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: 'Failed to register user', details: e.message }); // Handle errors and respond with a 400 status
  }
};

// Login controller
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userDoc = await User.findOne({ username }); // Find the user by username

    if (!userDoc) {
      return res.status(400).json({ error: 'Wrong credentials' }); // Handle if user is not found
    }

    const passOk = bcrypt.compareSync(password, userDoc.password); // Compare the password

    if (passOk) {
      // Password is correct, proceed to generate a JWT
      const token = jwt.sign(
        { username, id: userDoc._id },
        secret,
        { expiresIn: '1h' } // Optional: Set token expiration
      );

      res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' }).json({
        id: userDoc._id,
        username,
      });
    } else {
      res.status(400).json({ error: 'Wrong credentials' }); // Handle incorrect password
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'An error occurred', details: e.message }); // Handle general errors
  }
};

// Profile controller
exports.getProfile = (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, secret, (err, info) => {
    if (err) return res.status(401).json({ error: 'Unauthorized' });
    res.json(info);
  });
};

// Logout controller
exports.logout = (req, res) => {
  res.cookie('token', '', { maxAge: 0, httpOnly: true, secure: process.env.NODE_ENV === 'production' }).json('ok');
};
