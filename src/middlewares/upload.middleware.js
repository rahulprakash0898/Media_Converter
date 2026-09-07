import multer from 'multer';
import path from 'path';

// Storage configuration for uploaded original files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/original');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

export const upload = multer({ storage });