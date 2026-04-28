import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    horses: {
        type: Number,
        required: true
    },
    isUsed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '48h'
    }
});

export default mongoose.model('Invitation', invitationSchema);