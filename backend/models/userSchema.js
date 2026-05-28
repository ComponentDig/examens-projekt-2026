// imports of dependencies
import mongoose from "mongoose";
import bcrypt from "bcrypt";


// schema för användare
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
        minLength: 8
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    horses: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    requiredTasks: {
        type: Number,
        default: 0,
    }
});

userSchema.pre('save', async function () {
    // beräknar pass baserat på antal hästar
    if (this.isModified('horses') || this.isNew) {
        if (this.horses === 1) {
            this.requiredTasks = 5;
        } else if (this.horses >= 2) {
            this.requiredTasks = 10;
        } else {
            this.requiredTasks = 0;
        }
    }
    // Hashning av lösenord
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    };
});

// comparing password when user logging in
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;