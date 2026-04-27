import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // verifiera token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // hämta användare
            req.user = await User.findById(decoded.id);

            if (!req.user) {
                return res.status(401).json({ message: "Användaren finns inte" });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: "Ogiltigt token" });
        }
    }

    // om ingen token hittas
    if (!token) {
        return res.status(401).json({ message: "Inget token hittades" });
    }
};

export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Endast admin har tillgång till denna sida' });
    }
};