const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Cloudinary configuration
cloudinary.config({
  cloud_name: "da4w68u12",
  api_key: "169268769613747",
  api_secret: "ioV8oT9txrXr8_D7kr-UXUWwYuM",
});

// Function to upload image and delete local file
const uploadResult = async (imagePath) => {
  try {
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(imagePath, {
    //   folder: "products", // optional folder
    });

    // Delete local file after upload
    fs.unlinkSync(imagePath);

    // Return Cloudinary secure URL
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};

module.exports = uploadResult;
