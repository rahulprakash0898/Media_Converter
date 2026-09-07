import express from 'express';
import { uploadMedia, getStatus } from '../controllers/media.controller.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

// Upload multiple media files (images/audio/video) for conversion
router.post('/upload', upload.array('files', 10), uploadMedia);

// Get conversion status by task ID
router.get('/status/:id', getStatus);

export default router;