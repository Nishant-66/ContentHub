const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    const x = await cloudinary.uploader.upload(localFilePath, {
      transformation: [
        { width: 800, height: 600, crop: "limit" }, // Resize to 800x600 while maintaining aspect ratio
        { quality: "auto" }, // Automatically adjust the quality
        { fetch_format: "auto" } // Automatically choose the best format (e.g., WebP for browsers that support it)
      ],
    });

    // Delete the local file after uploading to Cloudinary
    await fs.promises.unlink(localFilePath);
    console.log("Deleted file");
    return x;
  } catch (error) {
    await fs.promises.unlink(localFilePath); // Remove the local file if the upload fails
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

module.exports = { uploadOnCloudinary };
