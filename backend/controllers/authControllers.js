import User from "../models/userSchema.js";
import user from "../models/userSchema.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
};

class authController {

    // Register user
    static async registerUser(req, res) {
        try {
            const { firstName, lastName, email, password } = req.body;

            // check if user already exists
            const userExists = await user.findOne({ email });
            if (userExists) {
                return res.status(400).json({ message: "Användare finns redan" });
            }

            // create user
            const user = await user.create({
                firstName,
                lastName,
                email,
                password
            });

            // send response
            res.status(201).json({
                message: "Registrering lyckades",
                token: generateToken(user),
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    email: user.email
                }
            });

        } catch (error) {
            res.status(500).json({ message: "Ett fel uppstod vid registrering", error: error.message });
        }
    }


    // Login
    static async loginUser(req, res) {
        try {
            const { email, password } = req.body;

            // find user - include password for validation
            const user = await User.findOne({ email }).select('+password');

            // check that user and password match - matchPassword in userSchema
            if (!user || !(await user.matchPassword(password))) {
                return res.status(401).json({ message: "Felaktig e-post eller lösenord" });
            }

            // generate token and respond
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

    // get profile
    static async getProfile(req, res) {
        try {
            // req.user is from auth middleware
            const user = await User.findById(req.user.id);

            if (!user) {
                return res.status(404).json({ message: "Användare hittades inte" });
            }

            res.json(user);
        } catch (error) {
            res.status(500).json({ message: "Kunde inte hämta profil" });
        }
    }
}

export default authController;