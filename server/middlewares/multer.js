const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
// Configure storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Store files in 'uploads' directory
  },
  filename: (req, file, cb) => {
   const random = uuidv4();
    cb(null, random+""+file.originalname); // Rename file with a timestamp
  }
});

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
