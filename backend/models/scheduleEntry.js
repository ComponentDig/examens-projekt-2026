import mongoose, { mongo } from "mongoose";

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
        ref: 'User',
        required: true
    }]
});

const Schedule = mongoose.model('Schedule', scheduleEntry);

export default Schedule;