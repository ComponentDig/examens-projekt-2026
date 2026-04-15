// imports of dependencies
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import next from "next";


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

// hashing av password
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.hash(this.password, salt);
});

// comparing password when user logging in
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const user = mongoose.model('user', userSchema);

export default user;