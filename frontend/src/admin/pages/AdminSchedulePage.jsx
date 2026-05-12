import { useState } from "react";



// page för admin för att generera schema för en specifik månad
// admin kan välja vilken månad och vilket år och sedan trycka på en knapp
// för att generera schemat
const AdminSchedulePage = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

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
            } else {
                setMessage({ type: 'error', text: data.message || 'Något gick fel' });
            }
        } catch  {
            setMessage({type: 'error', text: 'Kunde inte ansluta till server'});
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Generera Schema</h1>

            <div className="p-6 rounded shadow-md max-w-md">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">År</label>
                        <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} className="w-full p-2 border rounded"/>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Månad</label>
                        <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="w-full p-2 border rounded">
                            {Array.from({length: 12}, (__, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {new Date(0, i).toLocaleDateString('sv-SE', {month: 'long'})}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button onClick={handleGenerate} disabled={loading} className="w-full p-3 font-bold rounded">
                        {loading ? 'Genererar....' : 'Skapa Schema'}
                    </button>
                </div>

                {message && (
                    <div className="mt-4 p-3 rounded">
                        {message.text}
                    </div>
                )}
            </div>

        </div>
        </>
    )
};

export default AdminSchedulePage;