import express from "express";
import authController from "../controllers/authControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);


// Protected routes
router.get('/profile', protect, authController.getProfile);

// Admin routes
router.post('/admin-create', protect, admin, authController.adminCreateUser);


export default router;