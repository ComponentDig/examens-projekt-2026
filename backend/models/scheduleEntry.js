import mongoose, { mongo } from "mongoose";
import { execOnce } from "next/dist/shared/lib/utils";

const scheduleEntry = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    taskType: {
        type: String,
        enum: ['Utsläpp', 'Insläpp', 'Kvällsfodring'],
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }]
});

const Schedule = mongoose.model('Schedule', scheduleEntry);

export default Schedule;