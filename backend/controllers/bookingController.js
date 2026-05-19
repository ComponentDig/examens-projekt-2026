import Booking from '../models//bookingModel.js';

export const createBooking = async (req, res) => {

    try {

        const { date, type, startTime, endTime } = req.body;

        const newBooking = await Booking.create({
            date,
            type,
            startTime,
            endTime
        });

    } catch (error) {

    }
}