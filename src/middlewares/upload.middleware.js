const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wasalni/documents',
    allowed_formats: ['jpg', 'png', 'pdf'],
    transformation: [{ width: 1000, height: 1000, crop: 'limit' }],
  },
});

const upload = multer({ storage });

// Middleware for multiple fields
const uploadDocuments = upload.fields([
  { name: 'nationalId', maxCount: 1 },
  { name: 'driverLicense', maxCount: 1 },
  { name: 'vehicleLicense', maxCount: 1 },
]);

module.exports = { uploadDocuments };