import { useState } from "react";

// bokningskalendern för ridbanan
// en månadsvy visas, användare kan välja datum att boka
// man kan välja timme, halvdag eller heldag
// lägga till vilka timmar man kan boka - direkt via kalendern eller via formuläret där man slutför bokningen?

function BookingCalender({ selectedDate, onDateChange }) {
    const [viewDate, setViewDate] = useState(new Date());

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const startDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    const monthNames = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"];

    const calenderGrid = [];
    for (let i = 0; i < startDay; i++) calenderGrid.push(null);
    for (let d = 1; d <= daysInMonth; d++) calenderGrid.push(new Date(year, month, d));

    const changeMonth = (offset) => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
    };

    return (
        <>
            <div className="p-8 rounded-2xl border shadow-lg">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-bold">
                        {monthNames[month]} <span className="font-light">{year}</span>
                    </h3>
                    <div className="flex gap-2">
                        <button onClick={() => changeMonth(-1)} className="p-2 border rounded-full hover:bg-gray-50 transition-colors">&larr;</button>
                        <button onClick={() => changeMonth(1)} className="p-2 border rounded-full hover:bg-gray-50 transition-colors">&rarr;</button>
                    </div>
                </div>

                <div className="grid grid-cols-7 mb-4">
                    {['Mån', 'Tis', 'Ons', 'Tors', 'Fre', 'Lör', 'Sön'].map(d => (
                        <div key={d} className="text-center text-xs font-bold text-gray-400 uppercase">{d}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                    {calenderGrid.map((date, i) => (
                        <div key={i} className="aspect-square">
                            {date && (
                                <button onClick={() => onDateChange(date)} className={`w-full h-full rounded-xl text-sm font-semibold transition-all ${selectedDate?.toDateString() === date.toDateString() ? 'bg-secondarycolor shadow-md scale-105' : 'hover:bg-gray-100'}`}>{date.getDate()}</button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default BookingCalender;