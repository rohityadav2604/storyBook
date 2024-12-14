import express from 'express';

import upload from '../config/multer.js';
import { uploadController } from '../controllers/uploadController.js';
import { uploadValidator } from '../middlewares/validators/uploadValidator.js';
const router = express.Router();

router.post('/', upload.single('file'), uploadValidator, uploadController);

export default router;