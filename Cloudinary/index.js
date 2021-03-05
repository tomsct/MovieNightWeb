const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "MovieNigth",
        allowedFormats: ["jpeg", "png", "jpg"],
        transformation: [
            {width: 400, height: 400, gravity: "face", radius: "max", crop: "crop"},
            {width: 200, crop: "scale"}],
        format: "png"
    }
})

module.exports = { cloudinary, storage};