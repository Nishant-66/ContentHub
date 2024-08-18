const bcrypt = require('bcryptjs'); 
const User = require('../models/User'); // Import the User model
const jwt = require('jsonwebtoken');
const secret=process.env.SECRET;

exports.register = async (req, res) => {
    const {username, password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    try {
      const userDoc = await User.create({
        username,
        password: bcrypt.hashSync(password, salt), // Hash the password before storing it
      });
      res.json(userDoc); // Respond with the created user document
    } catch (e) {
      console.log(e);
      res.status(400).json(e); // Handle errors and respond with a 400 status
    }
  };

  // Define and export the login function
exports.login = async (req, res) => {
    const {username, password} = req.body;
    
    try {
      const userDoc = await User.findOne({username}); // Find the user by username
      
      if (!userDoc) {
        return res.status(400).json('wrong credentials'); // Handle if user is not found
      }
  
      const passOk = bcrypt.compareSync(password, userDoc.password); // Compare the password
      
      if (passOk) {
        // Password is correct, proceed to generate a JWT
        jwt.sign(
          {username, id: userDoc._id}, 
          secret, 
          {}, 
          (err, token) => {
            if (err) throw err; // Handle any errors during token generation
            res.cookie('token', token).json({
              id: userDoc._id,
              username,
            });
          }
        );
      } else {
        res.status(400).json('wrong credentials'); // Handle incorrect password
      }
    } catch (e) {
      console.log(e);
      res.status(500).json('An error occurred'); // Handle general errors
    }
  };