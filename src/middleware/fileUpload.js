const multer = require('multer');

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder for uploads
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

// Custom file filter function
const fileFilter = (req, file, cb) => {
  // Accept only image and video files
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'));
  }
};

// Initialize multer middleware with options for array of files (up to 5)
const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter,
//   limits: { fileSize: 10 * 1024 * 1024 }, // Optional: Limit file size to 10MB
}).array('media', 5); // 'media' is the field name for the array of files, limit to 5 files

module.exports = upload;
