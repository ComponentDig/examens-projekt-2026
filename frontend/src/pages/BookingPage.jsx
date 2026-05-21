import { useState, useEffect } from "react";
import BookingCalender from "../components/BookingCalender";

const availableHours = ["08.00", "09.00", "10.00", "11.00", "12.00", "13.00", "14.00", "15.00", "16.00", "17.00", "18.00", "19.00", "20.00"];

// sidan för att boka ridbanan
function BookingPage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [bookingType, setBookingType] = useState('timme');
    const [bookings, setBookings] = useState([]);
    const [selectedHour, setSelectedHour] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [halfDayType, setHalfDayType] = useState(null);

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
    };

    useEffect(() => {

        const loadData = async () => {
            await fetchBookings();

        }

        loadData();
    }, []);

    const handleBookingSubmit = async (e) => {
        e.preventDefault();

        let mappedStartTime = selectedHour;
        if (bookingType === 'halvdag') {
            mappedStartTime = halfDayType === 'förmiddag' ? 1 : 2;
        } else if (bookingType === 'heldag') {
            mappedStartTime = 0; // Heldag får värdet 0
        }

        const bookingData = {
            date: selectedDate.toLocaleDateString('sv-SE'),
            bookingType: bookingType,
            startTime: mappedStartTime,
            guestName: name,
            guestEmail: email,
            guestPhone: phone
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingData)
            });

            if (response.ok) {
                alert("Bokningen har registrerats!");
                setIsModalOpen(false);

                fetchBookings();


                setName("");
                setEmail("");
                setPhone("");
                setSelectedHour(null);
                setHalfDayType(null);
            } else {
                alert("Något gick fel vid bokningen. Försök igen.");
            }
        } catch (error) {
            console.error("Kunde inte skicka bokning:", error);
            alert("Kunde inte ansluta till servern.");
        }
    };

    const formattedSelectedDate = selectedDate.toLocaleDateString('sv-SE');

    // check om hela dagen har blivit bokad
    const isWholeDayBooked = bookings.some(booking => {
        const bookingDateStr = booking.date.includes('T') ? booking.date.split('T')[0] : booking.date;
        return bookingDateStr === formattedSelectedDate && booking.bookingType === 'heldag';
    })

    // check av vilken typ av halvdag som är bokad vs ledig
    const bookedHalfDays = bookings.filter(booking => {
        const bookingDateStr = booking.date.includes('T') ? booking.date.split('T')[0] : booking.date;
        return bookingDateStr === formattedSelectedDate && booking.bookingType === 'halvdag';
    })
        .map(booking => {
            if (booking.startTime === 1) return 'förmiddag';
            if (booking.startTime === 2) return 'eftermiddag';
            return booking.startTime;
        });



    // check av vilka timmar som bokas och finns kvar
    const takenHours = isWholeDayBooked ? availableHours : bookings
        .filter(booking => {
            const bookingDateStr = booking.date.includes('T') ? booking.date.split('T')[0] : booking.date;
            return bookingDateStr === formattedSelectedDate && booking.bookingType === 'timme';
        })
        .map(booking => {
            const num = parseFloat(booking.startTime);
            return num < 10 ? `0${num.toFixed(2).replace('.', '.')}` : `${num.toFixed(2).replace('.', '.')}`;
        })
        .concat(
            bookedHalfDays.includes('förmiddag') ? ["08.00", "09.00", "10.00", "11.00", "12.00", "13.00"] : []
        )
        .concat(
            bookedHalfDays.includes('eftermiddag') ? ["14.00", "15.00", "16.00", "17.00", "18.00", "19.00", "20.00"] : []
        );

    return (
        <>
            <div className=" min-h-screen font-primary pt-24 pb-16 px-6 md:px-16">
                <div className="max-w-6xl mx-auto">

                    <div className="mb-12">
                        <h1 className="text-4xl font-bold mb-4">Boka banan</h1>
                        <div className="h-1 w-20 bg-secondarycolor"></div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-12">
                        <div className="w-full md:w-1/3 space-y-6">
                            <div className="p-6 rounded-2xl border shadow-md bg-[#FEF8EE]">
                                <h2 className="text-xl font-bold mb-6">Information & regler</h2>

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

                        <div className="w-full md:w-2/3 space-y-8">
                            <BookingCalender selectedDate={selectedDate} onDateChange={setSelectedDate} bookings={bookings} />

                            <div className="p-8 rounded-2xl border shadow-md">
                                <h4>Bokning för: {selectedDate.toLocaleDateString('sv-SE', { day: 'numeric', month: 'long' })}</h4>

                                {isWholeDayBooked || (bookedHalfDays.includes('förmiddag') && bookedHalfDays.includes('eftermiddag')) ? (
                                    <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl font-semibold text-center">
                                        Den här dagen är fullbokad
                                    </div>
                                ) : (
                                    <>
                                        {/* Val av bokningstyp */}
                                        <div className="flex flex-wrap gap-3 mt-4">
                                            {['Timme', 'Halvdag', 'Heldag'].map(type => {
                                                // Inaktivera Heldag om det redan finns bokade timmar eller halvdagar
                                                const isTypeDisabled = type === 'Heldag' && (bookedHalfDays.length > 0 || bookings.some(b => b.date.split('T')[0] === formattedSelectedDate && b.bookingType === 'timme'));

                                                return (
                                                    <button
                                                        key={type}
                                                        disabled={isTypeDisabled}
                                                        onClick={() => {
                                                            setSelectedHour(null);
                                                            setHalfDayType(null);
                                                            setBookingType(type.toLowerCase());
                                                        }}
                                                        className={`px-6 py-2 rounded-full border-2 transition-all font-semibold ${isTypeDisabled ? 'opacity-40 cursor-not-allowed border-gray-100 bg-gray-50 text-gray-400' : bookingType === type.toLowerCase() ? 'border-secondarycolor bg-secondarycolor/10' : 'border-gray-100 hover:border-gray-300'}`}
                                                    >
                                                        {type}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* Under-val för Halvdag (Förmiddag / Eftermiddag) */}
                                        {bookingType === 'halvdag' && (
                                            <div className="flex gap-4 mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                <div className="w-full">
                                                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Välj pass:</p>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <button
                                                            disabled={bookedHalfDays.includes('förmiddag')}
                                                            onClick={() => setHalfDayType('förmiddag')}
                                                            className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${bookedHalfDays.includes('förmiddag') ? 'bg-gray-100 text-gray-400 line-through cursor-not-allowed' : halfDayType === 'förmiddag' ? 'border-secondarycolor bg-secondarycolor/20 font-bold' : 'bg-white border-gray-200 hover:border-gray-400'}`}
                                                        >
                                                            Förmiddag <span className="block text-xs font-normal text-gray-500">(08:00 - 14:00)</span>
                                                        </button>
                                                        <button
                                                            disabled={bookedHalfDays.includes('eftermiddag')}
                                                            onClick={() => setHalfDayType('eftermiddag')}
                                                            className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${bookedHalfDays.includes('eftermiddag') ? 'bg-gray-100 text-gray-400 line-through cursor-not-allowed' : halfDayType === 'eftermiddag' ? 'border-secondarycolor bg-secondarycolor/20 font-bold' : 'bg-white border-gray-200 hover:border-gray-400'}`}
                                                        >
                                                            Eftermiddag <span className="block text-xs font-normal text-gray-500">(14:00 - 20:00)</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Timväljaren */}
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

                                        {/* Gå vidare till modalen */}
                                        <button
                                            disabled={
                                                (bookingType === 'timme' && !selectedHour) ||
                                                (bookingType === 'halvdag' && !halfDayType)
                                            }
                                            onClick={() => setIsModalOpen(true)}
                                            className="w-full bg-secondarycolor disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-textprimary py-4 rounded-xl mt-8 shadow-md transition-all tracking-widest hover:brightness-95 active:scale-[0.98]">
                                            Gå vidare till bokning
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl">&times;</button>

                            <h3 className="text-2xl font-bold mb-4">Slutför bokning</h3>
                            <p className="text-sm text-gray-500 mb-6">Du håller på att boka den {selectedDate.toLocaleDateString('sv-SE')}.</p>

                            <form onSubmit={handleBookingSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Namn</label>
                                    <input type="text" placeholder="för- och efternamn" value={name} onChange={(e) => setName(e.target.value)} required className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-secondarycolor" />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">E-post</label>
                                    <input type="email" placeholder="E-post" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-secondarycolor" />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Telefonnummer</label>
                                    <input type="tel" placeholder="Telefonnummer" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-secondarycolor" />
                                </div>

                                <button type="submit" className="w-full bg-secondarycolor text-primarybgcolor py-3 rounded-xl font-semibold mt-4 shadow-md hover:brightness-95 transition-all">Bekräfta bokning</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default BookingPage;