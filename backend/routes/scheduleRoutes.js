import express from 'express';
import { triggerScheduleGenerator, getScheduleController, updateScheduleEntry } from '../controllers/scheduleController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/generate', protect, admin, triggerScheduleGenerator);

router.get('/', protect, getScheduleController);

router.put('/:id', protect, updateScheduleEntry);

export default router;