import express from "express";
import authController from "../controllers/authControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post('/registerUser', authController.registerUser);
router.post('/loginUser', authController.loginUser);


// Protected routes
router.get('/profile', protect, authController.getProfile);

// Admin routes


export default router;