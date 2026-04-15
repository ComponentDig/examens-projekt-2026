import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id);

            if (!req.user) {
                return res.status(401).json({ message: "Användaren finns inte" });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: "Ogiltigt token" });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Inget token hittades" });
    }
};