import express from 'express';
import { triggerScheduleGenerator, getScheduleController } from '../controllers/scheduleController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/generate', protect, admin, triggerScheduleGenerator);

router.get('/', protect, getScheduleController);

export default router;