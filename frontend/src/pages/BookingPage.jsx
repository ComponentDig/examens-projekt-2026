import { useState, useEffect } from "react";
import BookingCalender from "../components/BookingCalender";


const availableHours = ["08.00", "09.00", "10.00", "11.00", "12.00", "13.00", "14.00", "15.00", "16.00", "17.00", "18.00", "19.00", "20.00"];

// sidan för att boka ridbanan
function BookingPage() {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [bookingType, setBookingType] = useState('timme');
    const [bookings, setBookings] = useState([]);
    const [selectedHour, setSelectedHour] = useState(null);

    useEffect(() => {

        const fetchBookings = async () => {

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings`);
                const data = await response.json();

                if (response.ok) {
                    setBookings(data);
                }

            } catch (error) {
                console.error("Kunde inte hämta bokning", error);
            }
        }

        fetchBookings();

    }, [])

    const formattedSelectedDate = selectedDate.toLocaleDateString('sv-SE');

    const takenHours = bookings.filter(booking => {
        return new Date(booking.date).toLocaleDateString('sv-SE') === formattedSelectedDate && booking.bookingType === 'timme';
    })
        .map(booking => booking.startTime);

    return (
        <>

            <div className=" min-h-screen font-primary pt-24 pb-16 px-6 md:px-16">
                <div className="max-w-6xl mx-auto">

                    <div className="mb-12">
                        <h1 className="text-4xl font-bold mb-4">Boka banan</h1>
                        <div className="h-1 w-20 bg-secondarycolor"></div> {/* linje under rubrik*/}
                    </div>

                    <div className="flex flex-col md:flex-row gap-12">
                        <div className="w-full md:w-1/3 space-y-6">
                            <div className="p-6 rounded-2xl border shadow-md bg-[#FEF8EE]">
                                <h2 className="text-xl font-bold mb-6">Information & regler</h2>

                                {/* prislista */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-sm tracking-wider font-bold mb-3">Prislista</h3>
                                        <ul className="space-y-3">
                                            <li className="flex justify-between items-center border-b pb-2">
                                                <span>Enstaka träning</span>
                                                <span className="font-bold text-lg">150 kr</span>
                                            </li>
                                            <li className="flex justify-between items-center border-b pb-2">
                                                <span>Halvdag</span>
                                                <span className="font-bold text-lg">1000 kr</span>
                                            </li>
                                            <li className="flex justify-between items-center border-b pb-2">
                                                <span>Heldag</span>
                                                <span className="font-bold text-lg">1500 kr</span>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* regler */}
                                    <div className="pt-4">
                                        <h3 className="text-sm tracking-wider font-bold mb-3">Viktigt att veta</h3>
                                        <ul className="space-y-4">
                                            <li className="flex items-start gap-3">
                                                <span className="text-xl leading-none">&sdot;</span>
                                                <p className="text-sm"><strong>Mockning: </strong>Banan ska alltid mockas efter avslutad träning.</p>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-xl leading-none">&sdot;</span>
                                                <p className="text-sm"><strong>Drop-in: </strong>Du är välkommen att träna utan bokning, men då kan du få sällskap av andra.</p>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-xl leading-none">&sdot;</span>
                                                <p className="text-sm italic">Genom att boka garanteras du ensamrätt till banan under din valda tid.</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* kalendervy */}
                        <div className="w-full md:w-2/3 space-y-8">
                            <BookingCalender selectedDate={selectedDate} onDateChange={setSelectedDate} bookings={bookings} />
                            <div className="p-8 rounded-2xl border shadow-md">
                                <h4>Bokning för: {selectedDate.toLocaleDateString('sv-SE', { day: 'numeric', month: 'long' })}</h4>

                                <div className="flex flex-wrap gap-3">{['Timme', 'Halvdag', 'Heldag'].map(type => (
                                    <button key={type} onClick={() => { setSelectedHour(null); setBookingType(type.toLowerCase()) }} className={`px-6 py-2 rounded-full border-2 transition-all font-semibold ${bookingType === type.toLowerCase() ? 'border-secondarycolor bg-secondarycolor/10' : 'border-gray-100 hover:border-gray-300'}`}>{type}</button>
                                ))}
                                </div>

                                {bookingType === 'timme' && (
                                    <div className="grid grid-cols-4 gap-2 mt-4">
                                        {availableHours.map(hour => {
                                            const isTaken = takenHours.includes(hour);
                                            const isSelected = selectedHour === hour;

                                            let buttonClass = 'border-gray-200 hover:border-gray-400';

                                            if (isTaken) {
                                                buttonClass = 'bg-gray-100 text-gray-400 line-through cursor-not-allowed';
                                            } else if (isSelected) {
                                                buttonClass = 'border-secondarycolor bg-secondarycolor/20 font-bold';
                                            }
                                            return (
                                                <button key={hour} disabled={isTaken} onClick={() => setSelectedHour(hour)} className={`py-2 text-sm font-semibold rounded-lg border ${buttonClass}`}>{hour}</button>
                                            )
                                        })}
                                    </div>
                                )}


                                <button
                                    onClick={() => alert(`Bokning påbörjad för ${selectedDate.toDateString()} - Typ: ${bookingType}`)}
                                    className="w-full bg-secondarycolor text-textprimary py-4 rounded-xl mt-8 shadow-md transition-all tracking-widest hover:brightness-95 active:scale-[0.98]">
                                    Gå vidare till bokning
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default BookingPage;