import { useState, useEffect, useCallback } from "react";
import UserViewSchedule from "../components/UserViewSchedule";

const UserProfilePage = ({ user, onLogout }) => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [loadingSchedule, setLoadingSchedule] = useState(false);
    const [schedule, setSchedule] = useState([]);

    const fetchSchedule = useCallback(async () => {
        setLoadingSchedule(true);

        try {
            // hämtar token
            // och hämtar schemat för vald månad för den som är inloggad
            const token = localStorage.getItem('userToken');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/schedule?year=${year}&month=${month}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const data = await response.json();
            if (response.ok) {
                setSchedule(data);
            } else {
                setSchedule([]);
            }
        } catch (error) {
            console.error("Kunde inte hämta schema", error);
            setSchedule([]);
        } finally {
            setLoadingSchedule(false);
        }
    }, [month, year]);

    useEffect(() => {
        fetchSchedule();
    }, [fetchSchedule]);

    // föregående månad
    const handlePrevMonth = () => {
        if (month === 1) {
            setMonth(12);
            setYear(prev => prev - 1);
        } else {
            setMonth(prev => prev - 1);
        }
    };
    // nästa månad
    const handleNextMonth = () => {
        if (month === 12) {
            setMonth(1);
            setYear(prev => prev + 1);
        } else {
            setMonth(prev => prev + 1);
        }
    };

  return (
        <>
            <div className="min-h-screen bg-primarybgcolor font-primary px-4 py-8 md:py-12 md:px-8">
                <div className="max-w-4xl mx-auto space-y-6">

                    <div className="bg-white border border-secondarycolor rounded-2xl p-6 shadow-md shadow-textprimary/5 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <h1 className="font-secondary text-5xl text-textprimary mb-1">Hej {user.firstName}!</h1>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>

                        <div className="flex flex-wrap items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-secondarycolor/40">
                            <div className="bg-primarybgcolor border border-secondarycolor rounded-xl px-4 py-2 text-sm flex flex-col justify-center">
                                <span className="text-gray-600 block text-xs uppercase font-bold tracking-wider mb-0.5">Dina pass:</span>
                                <strong className="text-textprimary text-base">{user.requiredTasks || 0} st kvar</strong>
                            </div>

                            <button 
                                onClick={onLogout} 
                                className="border border-textprimary text-textprimary hover:bg-textprimary hover:text-primarybgcolor active:scale-[0.98] font-bold px-5 py-2.5 rounded-xl text-sm transition-all tracking-wide h-fit"
                            >
                                Logga ut
                            </button>
                        </div>
                    </div>

               
                    <div className="bg-white border border-secondarycolor rounded-2xl p-6 shadow-md shadow-textprimary/5 space-y-6">

                        <div className="border-b border-secondarycolor/40 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-textprimary">Stallschema</h2>
                                <p className="text-xs sm:text-sm text-gray-500">Här ser du månadens alla inplanerade pass</p>
                            </div>

                            <div className="flex items-center gap-2 self-start sm:self-center">
                                <button onClick={handlePrevMonth} className="w-10 h-10 bg-primarybgcolor border border-secondarycolor hover:border-textprimary text-textprimary rounded-xl flex items-center justify-center font-bold text-lg transition-colors active:scale-95">&larr;</button>
                                <div className="flex items-center bg-primarybgcolor/50 border border-secondarycolor rounded-xl px-2 h-10">
                                    <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="bg-transparent text-sm font-bold text-gray-700 focus:outline-none capitalize cursor-pointer pr-1">
                                        {Array.from({ length: 12 }, (__, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {new Date(0, i).toLocaleDateString('sv-SE', { month: 'long' })}
                                            </option>
                                        ))}
                                    </select>
                                    <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} className="bg-transparent text-sm font-bold text-gray-700 w-16 focus:outline-none text-center border-l border-secondarycolor ml-1" />
                                </div>

                                <button onClick={handleNextMonth} className="w-10 h-10 bg-primarybgcolor border border-secondarycolor hover:border-textprimary text-textprimary rounded-xl flex items-center justify-center font-bold text-lg transition-colors active:scale-95">&rarr;</button>
                            </div>
                        </div>

                      
                        <div className="pt-2 px-2">
                            <UserViewSchedule schedule={schedule} loading={loadingSchedule} />
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default UserProfilePage;