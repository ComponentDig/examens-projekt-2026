import { useState } from "react";

// bokningskalendern för ridbanan
// en månadsvy visas, användare kan välja datum att boka
// man kan välja timme, halvdag eller heldag
// lägga till vilka timmar man kan boka - direkt via kalendern eller via formuläret där man slutför bokningen?
function BookingCalender({
    selectedDate,
    onDateChange,
    bookings,
    availableHours
}) {

    const [viewDate, setViewDate] = useState(new Date());

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const daysInMonth =
        new Date(year, month + 1, 0).getDate();

    const firstDayIndex =
        new Date(year, month, 1).getDay();

    const startDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    const monthNames = [
        "Januari",
        "Februari",
        "Mars",
        "April",
        "Maj",
        "Juni",
        "Juli",
        "Augusti",
        "September",
        "Oktober",
        "November",
        "December"
    ];

    const calenderGrid = [];

    for (let i = 0; i < startDay; i++) {
        calenderGrid.push(null);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        calenderGrid.push(new Date(year, month, d));
    }

    // Hämtar alla bokningar för ett datum
    const getBookingStatusForDate = (date) => {

        if (!date) return [];

        const calendarDateString =
            date.toLocaleDateString("sv-SE");

        const matches = bookings.filter((booking) => {

            const bookingDateStr = booking.date.includes("T") ? booking.date.split("T")[0] : booking.date;

            return bookingDateStr === calendarDateString;
        });

        return matches;
    };

    const changeMonth = (offset) => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
    };

    return (
        <>
            <div className="p-8 rounded-2xl border shadow-lg">
                <div className="flex justify-between items-center mb-8">

                    <h3 className="text-2xl font-bold">{monthNames[month]}{" "}<span className="font-light">{year}</span></h3>

                    <div className="flex gap-2">

                        <button onClick={() => changeMonth(-1)} className="p-2 border rounded-full hover:bg-gray-50 transition-colors">&larr;</button>

                        <button onClick={() => changeMonth(1)} className="p-2 border rounded-full hover:bg-gray-50 transition-colors">&rarr; </button>

                    </div>
                </div>

                <div className="grid grid-cols-7 mb-4">
                    {["Mån", "Tis", "Ons", "Tors", "Fre", "Lör", "Sön"].map((d) => (<div key={d} className="text-center text-xs font-bold text-gray-400 uppercase">{d}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                    {calenderGrid.map((date, i) => {
                        const dayBookings = getBookingStatusForDate(date);

                        let bgClass = "bg-white hover:bg-gray-100";

                        let isBlocked = false;

                        if (dayBookings.length > 0) {
                            // Heldag
                            const hasHeldag =
                                dayBookings.some((b) => b.bookingType === "heldag");

                            // Halvdag förmiddag
                            const hasMorning = dayBookings.some((b) => b.bookingType === "halvdag" && b.startTime === 1);

                            // Halvdag eftermiddag
                            const hasAfternoon = dayBookings.some((b) => b.bookingType === "halvdag" && b.startTime === 2);

                            // Timbokningar
                            const hourlyBookings = dayBookings.filter((b) => b.bookingType === "timme");

                            const totalBookedHours = hourlyBookings.length;

                            // Fullbokad dag
                            const isFullyBooked = hasHeldag || (hasMorning && hasAfternoon) || totalBookedHours >= availableHours.length;

                            // Delvis bokad dag
                            const isPartiallyBooked = hasMorning || hasAfternoon || totalBookedHours > 0;

                            // Färger
                            if (isFullyBooked) {
                                bgClass = "bg-red-100 border border-red-300 text-red-700 font-bold";
                                isBlocked = true;
                            }

                            else if (isPartiallyBooked) {
                                bgClass = "bg-yellow-100 border border-yellow-300 text-yellow-800";
                            }

                            else {
                                bgClass = "bg-green-50 border border-green-200 text-green-700";
                            }
                        }

                        const isSelected = selectedDate?.toDateString() === date?.toDateString();

                        const finalBgClass = isSelected ? "bg-secondarycolor shadow-md scale-105 text-textprimary" : bgClass;

                        return (

                            <div key={i} className={`aspect-square rounded-xl transition-all ${finalBgClass}`}>
                                {date && (
                                    <button disabled={isBlocked} onClick={() => onDateChange(date)} className={`w-full h-full bg-transparent rounded-xl text-sm font-semibold ${isBlocked ? "cursor-not-allowed opacity-60" : "hover:bg-black/5"}`}>
                                        {date.getDate()}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="flex gap-4 mt-6 text-xs text-gray-600 flex-wrap">

                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-green-50 border border-green-200"></div>
                        <span>Ledig</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-yellow-100 border border-yellow-300"></div>
                        <span>Delvis bokad</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-red-100 border border-red-300"></div>
                        <span>Fullbokad</span>
                    </div>

                </div>
            </div>
        </>
    );
}

export default BookingCalender;