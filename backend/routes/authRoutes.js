import express from "express";
import authController from "../controllers/authControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);


// Protected routes
router.get('/profile', protect, authController.getProfile);

// Admin routes
// router.post('/admin-create', protect, admin, authController.adminCreateUser);
router.get('/users', protect, admin, authController.getAllUsers)
router.post('/invite', authController.createInvite);
router.get('/verify-invite/:token', authController.verifyInvite);
router.post('/complete-registration', authController.completeRegistration);


export default router;