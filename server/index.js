const express = require('express');
const connectDB = require('./db/db');
const cors = require('cors');   
const app = express();
require('dotenv').config(); // Load environment variables from .env file
const authRoute=require('./routes/Authroutes');

const PORT = process.env.PORT;  
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(cors());     // Enable Cross-Origin Resource Sharing (CORS) for the application
app.use("/api/v1",authRoute);
const server = () => {
   // Connect to the database
   connectDB();
    app.listen(PORT, () => { // Start the server and listen on the specified port
        console.log('listening to port:', PORT); // Log a message indicating the server is running
    });
}

// Call the server function to start the application
server();

