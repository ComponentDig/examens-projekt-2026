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
            <div className="min-h-screen p-4 md:p-8 space-y-6 bg-primarybgcolor">
                <div className="max-w-4xl mx-auto space-y-6">

                    <div className="">
                        <div>
                            <h1 className="">Hej {user.firstName}!</h1>
                            <p>{user.email}</p>
                        </div>

                        <div className="">
                            <div className="">
                                <span className="">Dina pass:</span>
                                <strong className="">{user.requiredTasks || 0} st kvar</strong>
                            </div>

                            <button onClick={onLogout} className="">Logga ut</button>
                        </div>
                    </div>

                    <div className="">
                        <div>
                            <h2 className="">Stallschema</h2>
                            <p className="">Här ser du månadens alla inplanerade pass</p>
                        </div>

                        <div className="">
                            <button onClick={handlePrevMonth} className="">&larr;</button>
                            <div className="">
                                <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="">
                                    {Array.from({ length: 12 }, (__, i) => (
                                        <option key={i + 1} value={i + 1}>
                                            {new Date(0, i).toLocaleDateString('sv-SE', { month: 'long' })}
                                        </option>
                                    ))}
                                </select>
                                <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} className="" />
                            </div>

                            <button onClick={handleNextMonth} className="">&rarr;</button>
                        </div>

                    </div>

                    <UserViewSchedule schedule={schedule} loading={loadingSchedule} />
                </div>
            </div>
        </>
    )
}

export default UserProfilePage;