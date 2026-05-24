import Booking from '../models//bookingModel.js';

export const createBooking = async (req, res) => {

    try {

        const { guestName, guestPhone, guestEmail, date, bookingType, startTime, endTime } = req.body;

        const existingBookings = await Booking.find({ date });

        let isConflict = false;

        for (const booking of existingBookings) {

            // Heldag blockerar allt
            if (booking.bookingType === 'heldag') {
                isConflict = true;
            }

            // Om ny bokning är heldag men det redan finns något
            if (bookingType === 'heldag') {
                isConflict = true;
            }

            // Halvdag
            if (bookingType === 'halvdag') {

                // samma halvdag redan bokad
                if (
                    booking.bookingType === 'halvdag' &&
                    booking.startTime === startTime
                ) {
                    isConflict = true;
                }

                // timmar inom halvdag
                if (booking.bookingType === 'timme') {

                    const morningHours = [
                        "08.00", "09.00", "10.00",
                        "11.00", "12.00", "13.00"
                    ];

                    const afternoonHours = [
                        "14.00", "15.00", "16.00",
                        "17.00", "18.00", "19.00", "20.00"
                    ];

                    if (
                        startTime === 1 &&
                        morningHours.includes(booking.startTime)
                    ) {
                        isConflict = true;
                    }

                    if (
                        startTime === 2 &&
                        afternoonHours.includes(booking.startTime)
                    ) {
                        isConflict = true;
                    }
                }
            }

            // Timbokning
            if (bookingType === 'timme') {

                // exakt timme redan bokad
                if (
                    booking.bookingType === 'timme' &&
                    booking.startTime === startTime
                ) {
                    isConflict = true;
                }

                // koll mot halvdag
                if (booking.bookingType === 'halvdag') {

                    const morningHours = [
                        "08.00", "09.00", "10.00",
                        "11.00", "12.00", "13.00"
                    ];

                    const afternoonHours = [
                        "14.00", "15.00", "16.00",
                        "17.00", "18.00", "19.00", "20.00"
                    ];

                    if (
                        booking.startTime === 1 &&
                        morningHours.includes(startTime)
                    ) {
                        isConflict = true;
                    }

                    if (
                        booking.startTime === 2 &&
                        afternoonHours.includes(startTime)
                    ) {
                        isConflict = true;
                    }
                }
            }
        }

        if (isConflict) {
            return res.status(400).json({
                message: "Tiden är redan bokad"
            });
        }


        const newBooking = await Booking.create({

            user: req.user ? req.user._id : null,
            date,
            bookingType,
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