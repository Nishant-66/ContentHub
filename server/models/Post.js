const mongoose = require('mongoose');
const {Schema, model} = mongoose;

// Define the schema for the Post model
const PostSchema = new Schema({
  title: String,            // Title of the post
  summary: String,          // Summary of the post
  content: String,          // Content of the post
  cover: String,            // Cover image URL for the post
  author: {type: Schema.Types.ObjectId, ref: 'User'}, // Reference to the author (User model)
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt timestamps
});

// Create the Post model based on the schema
const PostModel = model('Post', PostSchema);

module.exports = PostModel;
