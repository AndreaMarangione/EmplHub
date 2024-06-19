const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const emplhubProfileImageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'EmplHub Profile Images',
        format: async (req, file) => 'png',
        public_id: (req, file) => file.originalname
    }
})

const emplhubCustomerImageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'EmplHub Customer Images',
        format: async (req, file) => 'png',
        public_id: (req, file) => file.originalname
    }
})

const profileImageCloudUpload = multer({ storage: emplhubProfileImageStorage });
const customerImageCloudUpload = multer({ storage: emplhubCustomerImageStorage });

module.exports = { profileImageCloudUpload, customerImageCloudUpload };
