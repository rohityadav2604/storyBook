import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import cors from 'cors';
import express from 'express';
import multer from 'multer';

import retrieveFromRag from './retrieveFromRag.js';
import uploadFileToDb from './uploadFile.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create a directory to store uploaded PDFs
    cb(null, 'src/uploads/');
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Create multer upload instance
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Only accept PDF files
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
});

// Middleware to create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, '/uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World');
});
// PDF upload endpoint
app.post('/upload', upload.single('pdf'), async(req, res) => {
  try {
    // If no file is uploaded
    if (!req.file) {
      return res.status(400).send('No PDF file uploaded');
    }

    console.log('Uploaded file:', {
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
    });
    await uploadFileToDb(req.file.path);
    // Additional form fields can be accessed via req.body
    res.status(200).json({
      message: 'PDF uploaded successfully',
      file: {
        originalName: req.file.originalname,
        filename: req.file.filename,
        path: req.file.path,
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).send('Error uploading file');
  }
});

app.post('/rag', async (req, res) => {
  console.log(req.body);
  const result = await retrieveFromRag(req.body.prompt);

  console.log(typeof result);
  res.send({ result });
});

// Error handling middleware for multer
app.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).send('File is too large');
  } else if (err) {
    return res.status(500).send(err.message);
  }
  next();
});

// Start server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});