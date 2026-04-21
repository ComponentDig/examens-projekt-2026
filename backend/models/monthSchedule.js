import mongoose from "mongoose";

const monthSchedule = new mongoose.Schema({
    month: {
        type: Number,
        min: 1,
        max: 12
    },
    year: {
        type: Number
    },
    entries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule'
    }],
    isLocked: {
        type: Boolean,
        default: false
    }
});

monthSchedule.index({ month: 1, year: 1 }, { unique: true });

const MonthSchedule = new mongoose.model('MonthSchedule', monthSchedule);

export default MonthSchedule;