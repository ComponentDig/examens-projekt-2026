import { useState, useEffect, useCallback } from "react";
import AdminViewSchedule from "../components/AdminViewSchedule";

// page för admin för att generera schema för en specifik månad
// admin kan välja vilken månad och vilket år och sedan trycka på en knapp
// för att generera schemat
const AdminSchedulePage = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [schedule, setSchedule] = useState([]);
    const [users, setUsers] = useState([]);

    const fetchSchedule = useCallback(async () => {
        setLoading(true);
        try {
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
        } catch {
            setSchedule([]);
        } finally {
            setLoading(false);
        }
    }, [month, year]);

    const fetchUsers = useCallback(async () => {
        try {
            const token = localStorage.getItem('userToken');

            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();

            if (response.ok) {
                const usersArray = Array.isArray(data) ? data : data.users || data.data || [];
                setUsers(usersArray.filter(u => u.role === 'user' && u.isActive));
            }
        } catch (error) {
            console.error("Kunde inte hämta användare", error);
        }
    }, []);

    useEffect(() => {
        fetchSchedule();
        fetchUsers();
    }, [fetchSchedule, fetchUsers]);


    const handleGenerate = async () => {
        setLoading(true);
        setMessage(null);

        const token = localStorage.getItem('userToken');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/schedule/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ year, month })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'sucsess', text: data.message });
                fetchSchedule();
            } else {
                setMessage({ type: 'error', text: data.message || 'Något gick fel' });
            }
        } catch {
            setMessage({ type: 'error', text: 'Kunde inte ansluta till server' });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatedTask = async (entryId, userId, action = "ADD") => {
        const token = localStorage.getItem('userToken');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/schedule/${entryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ userId, action })
            });

            if (!response.ok) throw new Error("Kunde inte uppdatera passet");

            const data = await response.json();

            if (data.success) {
                setSchedule(prevSchedule => prevSchedule.map(entry => entry._id === entryId ? data.entry : entry));
            }
        } catch (error) {
            alert("Det gick inte att spara ändringen");
            console.error(error);
        }
    };


    return (
        <>
            <div className="p-4 sm:p-8 min-h-screen bg-slate-50/50">

                <div className="max-w-4xl mx-auto mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-sky-950">Generera Schema</h1>
                    <p className="text-xs text-slate-500 mt-1">Välj period för att granska eller generera nya arbetspass.</p>
                </div>

                <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white border border-sky-100 rounded-2xl shadow-xs mb-8">
                    <div className="flex flex-col md:flex-row md:items-end gap-4">
                        <div className="flex-1 grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 ml-1">År</label>
                                <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} className="w-full border border-sky-200 p-2.5 rounded-xl text-sm bg-white text-slate-700 focus:outline-none focus:border-sky-900 focus:ring-2 focus:ring-sky-900/10 transition-all font-medium" />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 ml-1">Månad</label>
                                <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="w-full border border-sky-200 p-2.5 rounded-xl text-sm bg-white text-slate-700 focus:outline-none focus:border-sky-900 focus:ring-2 focus:ring-sky-900/10 transition-all font-medium">
                                    {Array.from({ length: 12 }, (__, i) => (
                                        <option key={i + 1} value={i + 1}>
                                            {new Date(0, i).toLocaleDateString('sv-SE', { month: 'long' })}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button onClick={handleGenerate} disabled={loading} className="w-full md:w-auto md:px-6 bg-sky-950 hover:bg-sky-900 text-white font-bold h-10.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-sm active:scale-[0.99] shrink-0">
                            {loading ? 'Genererar....' : 'Skapa Schema'}
                        </button>
                    </div>

                    {message && (
                        <div className="mt-4 p-3 rounded">
                            {message.text}
                        </div>
                    )}
                </div>
                <AdminViewSchedule schedule={schedule} loading={loading} users={users} onUpdatedTask={handleUpdatedTask} />
            </div>
        </>
    )
};

export default AdminSchedulePage;