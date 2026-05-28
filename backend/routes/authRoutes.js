import express from "express";
import authController from "../controllers/authControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { sendResetPasswordEmail } from "../services/emailService.js";
import User from "../models/userSchema.js";
import { randomBytes } from 'node:crypto';
const router = express.Router();

// återställningsroute för lösenord
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        // check om mejladress finns
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(200).json({ message: "En återställningslänk har skickats om adressen finns registrerad." });
        }

        // genererar en slumpad engångstoken
        const resetToken = randomBytes(20).toString('hex');

        // sparar token - en tid på 1 timme innan den går ut
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();

        await sendResetPasswordEmail(user.email, resetToken);

        res.status(200).json({ message: "En återställningslänk har skickats om adressen finns registrerad." });

    } catch (error) {
        console.error("Fel i forgot-password route:", error);
        res.status(500).json({ message: "Något gick fel på servern vid hantering av lösenordsåterställning." });
    }
});

// route för när man klickat på återställingslänken
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        // check efter användaren som har denna token och check för att se till att den inte har utgått
        const user = await User.findOne({
            resetPasswordToken: token,
            // $gt betyder "greater than" (giltig framåt i tiden)
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Länken är ogiltig eller har löpt ut." });
        }

        user.password = password;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ message: "Lösenordet har återställts utan problem." });

    } catch (error) {
        console.error("Fel vid återställning av lösenord:", error);
        res.status(500).json({ message: "Något gick fel på servern vid sparande av nytt lösenord." });
    }
});

// Public routes
router.post('/login', authController.loginUser);


// Protected routes för användare som kan logga in
router.get('/profile', protect, authController.getProfile);

// Admin routes
router.get('/users', protect, admin, authController.getAllUsers)
router.post('/invite', admin, protect, authController.createInvite);
router.get('/verify-invite/:token', authController.verifyInvite);
router.post('/complete-registration', authController.completeRegistration);


export default router;