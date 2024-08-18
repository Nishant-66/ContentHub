const mongoose = require('mongoose');
const {Schema, model} = mongoose;

// Define the schema for the User model
const UserSchema = new Schema({
  username: {type: String, required: true, min: 4, unique: true}, // Username must be unique and at least 4 characters
  password: {type: String, required: true}, // Password is required
});

// Create the User model based on the schema
const UserModel = model('User', UserSchema);

module.exports = UserModel;
