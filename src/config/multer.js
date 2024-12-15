// Constants for file configuration
import path from 'path';

import multer from 'multer';

import { ensureUploadDir } from '../utils/deleteFile.js';

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_MIME_TYPE = 'application/pdf';

const UPLOAD_PATH = 'uploads/';

await ensureUploadDir();
// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_PATH);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const extension = path.extname(file.originalname);

    cb(null, `${timestamp}${extension}`);
  },
});

// Configure multer upload with validation
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === ALLOWED_MIME_TYPE) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
  limits: {
    fileSize: MAX_FILE_SIZE_BYTES,
  },
});

export default upload;

