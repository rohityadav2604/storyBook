import express from 'express';

const router = express.Router();

import { retrieveController } from '../controllers/retrieverController.js';
import { questionValidator } from '../middlewares/validators/questionValidator.js';
router.post('/',questionValidator, retrieveController);

export default router;