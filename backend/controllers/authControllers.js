import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";

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

    // funktion för admin att lägga till egna användare
    static async adminCreateUser(req, res) {
        try {
            const { firstName, lastName, email, password, horses } = req.body;

            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(400).json({ message: 'Epost redan registrerade' });
            }

            const newUser = await User.create({
                firstName,
                lastName,
                email,
                password,
                horses,
                role: 'user'
            });

            res.status(201).json({
                message: 'Ägare tillagd',
                user: { id: newUser._id, name: newUser.firstName }
            });
        } catch (error) {
            res.status(500).json({ message: 'Kunde inte lägga till användare', error: error });
        }
    }

}

export default authController;