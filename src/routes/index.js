import express from 'express';

import uploadRoutes from './uploadRoutes.js';
const router = express.Router();

router.use('/upload', uploadRoutes);
// router.use('/retrieve', retrieveRoutes);

export default router;