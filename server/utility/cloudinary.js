const cloudinary = require('cloudinary').v2;
const fs = require('fs'); 
const path = require('path');

// Configure Cloudinary with environment variables
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Function to upload a file to Cloudinary
export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null; // Return null if no file path is provided

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto" // Automatically detect the resource type
        });

        // Remove the locally saved temporary file after successful upload
        fs.unlinkSync(localFilePath);

        // Return the response from Cloudinary
        return response;

    } catch (error) {
        // Remove the locally saved temporary file if the upload fails
        if (localFilePath) {
            fs.unlinkSync(localFilePath);
        }

        // Log the error (optional) and return null
        console.error('Error uploading to Cloudinary:', error);
        return null;
    }
};
