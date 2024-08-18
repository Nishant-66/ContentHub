const express = require('express');
const app = express();
const connectDB = require('./db/db');
require('dotenv').config(); // Load environment variables from .env file
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Correct import for cookie-parser
const authRoute = require('./routes/Authroutes');
const postRoute=require('./routes/Postroutes');
const PORT = process.env.PORT;
// Middleware setup
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(cookieParser()); // Parse cookies
app.use(cors({ credentials: true, origin: 'http://localhost:3000' })); // Enable CORS

// Route setup
app.use("/api/user", authRoute);
app.use("/api/blogs",postRoute);

// Start the server
const server = () => {
   // Connect to the database
   connectDB();

   app.listen(PORT, () => {
      console.log('Listening on port:', PORT);
   });
}

// Call the server function to start the application
server();
