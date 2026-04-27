import { useState } from "react";

// komponent för att registrera en ny user - admin
// admin kan fylla i formulär för att lägga till hästägare i adminpanelen
// och sedan använda listan med ägare för att generera
// stalltjänstschemat
// tanke att ha en invite-only registrering
// så endast de som har med stallet att göra kan logga in för att
// ta del av relevant information samt se stallschema osv.
const AddUserForm = ({ onUserAdded }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: 'stalltuna123',
        horses: ''
    });

    const [status, setStatus] = useState({ type: '', msg: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.horses === '') {
            setStatus({ type: 'error', msg: 'Fyll i antal hästar' });
            return;
        }

        setStatus({ type: '', msg: '' });
        const token = localStorage.getItem('userToken');

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/users/admin-create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                setStatus({ type: 'success', msg: 'Hästägare tillagd!' });
                setFormData({ firstName: '', lastName: '', email: '', password: 'stalltuna123', horses: '' });
                if (onUserAdded) onUserAdded();
            } else {
                setStatus({ type: 'error', msg: data.message || 'Kunde inte spara' });
            }
        } catch {
            setStatus({ type: 'error', msg: 'Något gick fel' });
        }
    };

    return (
        <>
            <div className="p-6 rounded-lg shadow-md border border-black">
                <h2 className="text-xl font-bold mb-4">Registrera ny hästägare</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Förnamn"
                        className="border p-2 rounded"
                        onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Efternamn"
                        className="border p-2 rounded"
                        onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                        required
                    />
                    <input
                        type="email"
                        placeholder="E-post"
                        className="border p-2 rounded"
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        required
                    />

                    <input
                        type="number"
                        placeholder="Antal hästar"
                        className="border p-2 rounded"
                        min="0"
                        value={formData.horses}
                        onChange={e => {
                            const val = e.target.value; setFormData({ ...formData, horses: val === '' ? '' : Number(val) });
                        }}
                        required
                    />

                    <button type="submit" className="md:col-span-2 bg-green-600 text-white font-bold py-2 rounded">
                        Spara
                    </button>
                </form>
                {status.msg && (
                    <div className="mt-4 p-3 rounded text-center">{status.msg}</div>
                )}
            </div>
        </>
    )
}

export default AddUserForm;