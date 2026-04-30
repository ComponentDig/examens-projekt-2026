import User from "../models/userSchema.js";
import Invitation from "../models/Invitation.js";
import jwt from "jsonwebtoken";
import crypto from 'crypto';

const generateToken = (user) => {

    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN || '24h';

    if (!secret) {
        throw new Error("Fel, JWT_SECRET");
    }


    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        secret,
        { expiresIn: expiresIn }
    );
};

class authController {

    // registrera användare - ta bort eller behålla?
    static async registerUser(req, res) {
        try {
            const { firstName, lastName, email, password, horses } = req.body;

            // kollar om användare redan finns
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(400).json({ message: "Användare finns redan" });
            }

            // skapa ny användare
            const newUser = await User.create({
                firstName,
                lastName,
                email,
                password,
                horses
            });

            res.status(201).json({
                message: "Registrering lyckades",
                token: generateToken(newUser),
                user: {
                    id: newUser._id,
                    firstName: newUser.firstName,
                    email: newUser.email
                }
            });

        } catch (error) {
            res.status(500).json({ message: "Ett fel uppstod vid registrering", error: error.message });
        }
    }


    // logga in
    static async loginUser(req, res) {
        try {
            const { email, password } = req.body;

            // hitta användare
            const user = await User.findOne({ email }).select('+password');

            // koll att användare och lösen matchar - matchPassword in userSchema
            if (!user || !(await user.matchPassword(password))) {
                return res.status(401).json({ message: "Felaktig e-post eller lösenord" });
            }

            // genererar ett token
            res.json({
                message: "Inloggning lyckades",
                token: generateToken(user),
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            res.status(500).json({ message: "Ett fel uppstod vid inloggning" });
        }
    }

    // hämta profile
    static async getProfile(req, res) {
        try {
            // req.user från authMiddleware
            const user = await User.findById(req.user.id);

            if (!user) {
                return res.status(404).json({ message: "Användare hittades inte" });
            }

            res.json(user);
        } catch (error) {
            res.status(500).json({ message: "Kunde inte hämta profil" });
        }
    }

    // Tog hjälp av gemini för att påbörja flödet med invite-only registrering.
    // Promtade "Kan du vägleda mig att skapa funktion för invite-only registrering där 
    // admin ska skicka en inbjudningslänk för att en användare ska kunna registrera sig? Utan att skicka hela kodlösningen"    

    // skapar en inbjudning för att registrera sig som hästägare
    static async createInvite(req, res) {
        try {
            const { email, horses } = req.body;

            const token = crypto.randomBytes(20).toString('hex');

            await Invitation.create({
                email,
                token,
                horses
            });

            const inviteLink = `${process.env.FRONTEND_URL}/register?token=${token}`;

            res.status(201).json({ inviteLink });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Kunde inte skapa inbjudningslänk" });
        }
    }

    // verifiera en inbjudan baserat på token
    // hämtar token och kolla om det finns en giltig inbjudan
    // om ok returneras det
    // om inte ok kommer ett felmeddelande visas
    static async verifyInvite(req, res) {
        try {
            const { token } = req.params;
            const invite = await Invitation.findOne({
                token,
                isUsed: false,
                createdAt: { $gt: Date.now() }
            });

            if (!invite) {
                return res.status(400).json({ message: "Inbjudan är ogiltig" });
            }

            res.json({ email: invite.email, horses: invite.horses });
        } catch (error) {
            res.status(500).json({ message: "Ett fel uppstod vid verifiering" });
        }
    }

    // för att slutföra registreringen
    // tar emot token och användaruppgifter
    // kollar efter en giltig inbjudan
    // när användaren är registrerad så visas inbjudan som använd
    // felmeddelande visas om registrering inte lyckades
    static async completeRegistration(req, res) {
        try {
            const { token, firstName, lastName, password } = req.body;

            const invite = await Invitation.findOne({ token, isUsed: false });
            if (!invite) {
                return res.status(400).json({ message: "Inbjudan hittades inte" });
            }

            const newUser = await User.create({
                firstName,
                lastName,
                email: invite.email,
                horses: invite.horses,
                password,
                role: 'user'
            });

            invite.isUsed = true;
            await invite.save();

            res.status(201).json({ message: "Konto skapat!", userId: newUser._id });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Kunde inte slutföra registrering" });
        }
    }

}

export default authController;