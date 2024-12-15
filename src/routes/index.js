import express from 'express';

import retrieveRoutes from './retrieveRoutes.js';
import uploadRoutes from './uploadRoutes.js';
const router = express.Router();

router.use('/upload', uploadRoutes);
router.use('/retrieve', retrieveRoutes);

export default router;