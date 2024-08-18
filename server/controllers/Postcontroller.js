const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const {uploadOnCloudinary} = require('../utils/cloudinary');

exports.createPost = async (req, res) => {
    try {
        console.log(req.cookies);
       const { token } = req.cookies;
       const { title, summary, content } = req.body;
       console.log(req.file.path);
        if (!token) {
            return res.status(401).json({ message: "Authentication token is missing" });
        }

       const info = jwt.verify(token, process.env.SECRET);
        
     //  Upload file to Cloudinary
         
         const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
          if (!cloudinaryResponse) {
            return res.status(500).json({ error: 'Failed to upload the file to Cloudinary' });
        }
     

       // Create new post
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: cloudinaryResponse ? cloudinaryResponse.secure_url : null,
            author: info.id,
        });

        // Return the created post as JSON
         res.json(postDoc);

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token, please log in again" });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', ['username'])
            .sort({ createdAt: -1 })
            .limit(20);
        
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getPostById = async (req, res) => {
    const { id } = req.params;

    try {
        const postDoc = await Post.findById(id).populate('author', ['username']);
        if (!postDoc) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(postDoc);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const { token } = req.cookies;
        const { title, summary, content } = req.body;
         const {id}=req.params;

         if (!token) {
             return res.status(401).json({ message: "Authentication token is missing" });
         }

         const info = jwt.verify(token, process.env.SECRET);

         // Find the post by ID
         const postDoc = await Post.findById(id);
         if (!postDoc) {
             return res.status(404).json({ error: 'Post not found' });
         }

         // Check if the user is the author of the post
         if (postDoc.author.toString() !== info.id) {
             return res.status(403).json({ message: 'You are not authorized to update this post' });
        }

        // Handle file upload if a new file is provided
        let newCoverUrl = postDoc.cover;
        if (req.file) {
            const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
            newCoverUrl = cloudinaryResponse ? cloudinaryResponse.secure_url : postDoc.cover;
        }

        // Update the post fields
        postDoc.title = title;
        postDoc.summary = summary;
        postDoc.content = content;
        postDoc.cover = newCoverUrl;

        // Save the updated post
        await postDoc.save();

        // Return the updated post as JSON
        res.json(postDoc);

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token, please log in again" });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};
