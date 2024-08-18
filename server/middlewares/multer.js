const multer = require('multer');
const path = require('path');

// Configure storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store files in 'uploads' directory
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Extract file extension
    cb(null, `${Date.now()}${ext}`); // Rename file with a timestamp
  }
});

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
