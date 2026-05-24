import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    guestName: {
        type: String,
        required: true,
    },
    guestPhone: {
        type: Number,
        required: true,
    },
    guestEmail: {
        type: String,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    bookingType: {
        type: String,
        enum: ['timme', 'halvdag', 'heldag']
    },
    startTime: {
        type: Number
    },
    endTime: {
        type: Number
    }
})

export default mongoose.model('Booking', bookingSchema);