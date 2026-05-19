import User from "../models/userSchema.js";
import Invitation from "../models/Invitation.js";
import jwt from "jsonwebtoken";
import crypto from 'crypto';

// skapa en JWT-token för användare vid inloggning
const generateToken = (user) => {

    // hämtar JWT_SECRET från .env 
    // har en giltighetstid på 24 timmar
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN || '24h';

    // Om JWT_SECRET saknas så visas ett fel
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

            // skapar en token när inloggningen lyckas
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

    static async getAllUsers(req, res) {
        try {
            // hämtar alla användare
            const users = await User.find({}, 'firstName lastName role isActive');

            res.status(200).json(users);
        } catch (error) {
            console.error("Fel vid hämtning av användare", error);
            res.status(500).json({ message: "Kunde inte hämta användare" });
        }
    }

    // Tog hjälp av gemini för att påbörja flödet med invite-only registrering.
    // Promtade "Kan du vägleda mig att skapa funktion för invite-only registrering där 
    // admin ska skicka en inbjudningslänk för att en användare ska kunna registrera sig? Utan att skicka hela kodlösningen"    

    // skapar en inbjudning för att registrera sig som hästägare
    static async createInvite(req, res) {
        try {
            // hämtar e-post och antal hästar från req
            // för att kunna få rätt email osv till inbjudningslänken
            const { email, horses } = req.body;

            // skapar en token för inbjudningslänken så att
            // kopplas till användaren mejl i admin så bara den kan använda länken
            const token = crypto.randomBytes(20).toString('hex');

            // inbjudan sparas i databasen
            await Invitation.create({
                email,
                token,
                horses
            });

            // använder token som param, används senare i frontend för att kolla om det är rätt inbjudan
            const inviteLink = `${process.env.FRONTEND_URL}/register?token=${token}`;

            res.status(201).json({ inviteLink });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Kunde inte skapa inbjudningslänk" });
        }
    }

    static async verifyInvite(req, res) {
        // verifiera en inbjudan baserat på token
        // hämtar token och kolla om det finns en giltig inbjudan
        // isUsed är false så att inte länken kan användas fler gånger
        try {
            const { token } = req.params;
            const invite = await Invitation.findOne({
                token,
                isUsed: false,
            });

            // visar fel om injbudan är ogiltig 
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
    static async completeRegistration(req, res) {
        try {
            const { token, firstName, lastName, password } = req.body;
            // kollar efter en giltig inbjudan
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

            // när användaren är registrerad så visas inbjudan som använd
            invite.isUsed = true;
            await invite.save();

            res.status(201).json({ message: "Konto skapat!", userId: newUser._id });
        } catch (error) {
            // felmeddelande visas om registrering inte lyckades
            console.error(error);
            res.status(500).json({ message: "Kunde inte slutföra registrering" });
        }
    }

}

export default authController;