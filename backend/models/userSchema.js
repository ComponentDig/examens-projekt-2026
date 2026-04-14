// imports of dependencies
import mongoose from "mongoose";
import bcrypt from "bcrypt";


// schema for users
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        minLenght: 4
    }
});
