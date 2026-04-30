import { useState } from "react";

// komponent för att registrera en ny user - admin
// admin genererar en inbjudningslänk som sedan skickas till hästägare
// för att de ska kunna registrera sig
// så endast de som har med stallet att göra kan logga in för att
// ta del av relevant information samt se stallschema osv.
const AddUserForm = () => {
    const [email, setEmail] = useState('');
    const [horses, setHorses] = useState('');
    const [inviteLink, setInviteLink] = useState('');
    const [status, setStatus] = useState({ type: '', msg: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', msg: '' });

        const token = localStorage.getItem('userToken');

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/invite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ email, horses: Number(horses) })
            });

            const data = await res.json();

            if (res.ok) {
                setStatus({ type: 'success', msg: 'Inbjudan skapad' });
                setInviteLink(data.inviteLink);
                setEmail('');
                setHorses('');
            } else {
                setStatus({ type: 'error', msg: data.message || 'Kunde inte spara' });
            }
        } catch {
            setStatus({ type: 'error', msg: 'Något gick fel' });
        }
    };
    return (
        <div className="">
            <h2 className="">Bjud in ny hästägare</h2>

            {!inviteLink ? (
                <form onSubmit={handleSubmit} className="">
                    <input
                        type="email"
                        placeholder="Användarens e-post"
                        className=""
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Antal hästar"
                        className=""
                        min="1"
                        value={horses}
                        onChange={e => setHorses(e.target.value)}
                        required
                    />
                    <button type="submit" className="">
                        Skapa inbjudningslänk
                    </button>
                </form>
            ) : (
                <div className="mt-2">
                    <div className="">
                        <p className="">Länk skapad!</p>
                        <p className="">Kopiera länken nedan och skicka till användaren:</p>
                        <input
                            readOnly
                            value={inviteLink}
                            className=""
                            onClick={(e) => e.target.select()}
                        />
                        <button
                            onClick={() => setInviteLink('')}
                            className=""
                        >
                            Bjud in fler
                        </button>
                    </div>
                </div>
            )}

            {status.msg && status.type === 'error' && (
                <div className="">{status.msg}</div>
            )}
        </div>
    );
}

export default AddUserForm;