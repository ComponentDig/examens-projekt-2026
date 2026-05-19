import Booking from '../models//bookingModel.js';

export const createBooking = async (req, res) => {

    try {

        const { guestName, guestPhone, guestEmail, date, type, startTime, endTime } = req.body;

        const newBooking = await Booking.create({

            user: req.user ? req.user._id : null,
            date,
            type,
            startTime,
            endTime,
            guestName,
            guestPhone,
            guestEmail
        });

        res.status(201).json(newBooking);

    } catch (error) {
        console.error("Fel vid bokning", error);
        res.status(500).json({ message: "Kunde inte skapa bokningen" });
    }
}

export const getBookings = async (req, res) => {

    try {
        const bookings = await Booking.find();

        res.status(200).json(bookings);


    } catch (error) {
        console.error("Kunde inte hämta bokningar");
        res.status(500).json({ message: "Kunde inte hämta" });
    }
}