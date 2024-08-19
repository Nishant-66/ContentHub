const express = require('express');
const { createPost, getAllPosts, getPostById, updatePost,deletePost } = require('../controllers/Postcontroller');
const uploadMiddleware = require('../middlewares/multer');
const app = express();

// Route for creating a new post
app.post('/post', uploadMiddleware.single('file'), createPost);

// Route for updating an existing post
app.put('/post', uploadMiddleware.single('file'), updatePost);

// Route for getting all posts
app.get('/posts', getAllPosts);

// Route for getting a post by ID
app.get('/post/:id', getPostById);

app.delete('/post/:id', deletePost);

module.exports = app;
