import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        required: true
    },
    type: {
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