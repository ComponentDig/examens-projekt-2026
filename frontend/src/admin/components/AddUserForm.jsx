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
    const [copied, setCopied] = useState(false);

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

    const copyToClipboard = () => {
        navigator.clipboard.writeText(inviteLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <div className="max-w-md mx-auto p-4 sm:p-6 bg-white border border-sky-100 rounded-2xl shadow-sm">
            <h2 className="text-lg font-bold text-sky-950 mb-1">Bjud in ny hästägare</h2>
            <p className="text-xs text-slate-500 mb-5">Generera en unik inbjudningslänk för att tillåta registrering i systemet.</p>
            {!inviteLink ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 ml-1">
                            Användarens e-post
                        </label>
                        <input
                            type="email"
                            placeholder="Användarens e-post"
                            className="w-full border border-sky-200 p-3 rounded-xl text-sm bg-white text-slate-700 focus:outline-none focus:border-sky-900 focus:ring-2 focus:ring-sky-900/10 transition-all font-medium"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 ml-1">Antal ägda hästar</label>
                        <input
                            type="number"
                            placeholder="Antal hästar"
                            className="w-full border border-sky-200 p-3 rounded-xl text-sm bg-white text-slate-700 focus:outline-none focus:border-sky-900 focus:ring-2 focus:ring-sky-900/10 transition-all font-medium"
                            min="1"
                            value={horses}
                            onChange={e => setHorses(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-sky-950 hover:bg-sky-900 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-sm active:scale-[0.99] mt-2">
                        Skapa inbjudningslänk
                    </button>
                </form>
            ) : (
                <div className="mt-2 space-y-4 animate-in fade-in zoom-in-95 duration-150">
                    <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-center">
                        <p className="text-sm font-bold text-emerald-800">Länk skapad!</p>
                        <p className="text-xs text-emerald-600 mt-0.5">Kopiera länken nedan och skicka till användaren:</p>
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Inbjudningslänk</label>

                        <div className="flex gap-2">

                            <input
                                readOnly
                                value={inviteLink}
                                className="flex-1 border border-sky-200 p-3 rounded-xl text-xs bg-slate-50 text-slate-600 focus:outline-none font-mono font-medium truncate"
                                onClick={(e) => e.target.select()}
                            />
                            <button
                                type="button"
                                onClick={copyToClipboard}
                                className={`px-4 rounded-xl text-xs font-bold border transition-all shrink-0 ${copied
                                    ? 'bg-emerald-600 border-emerald-600 text-white'
                                    : 'bg-white border-sky-200 text-sky-950 hover:bg-sky-50'
                                    }`}
                            >
                                {copied ? 'Kopierad!' : 'Kopiera'}
                            </button>
                        </div>
                    </div>
                    <button onClick={() => { setInviteLink(''); setStatus({ type: '', msg: '' }); }} className="w-full bg-white hover:bg-slate-50 text-slate-500 font-semibold py-2.5 px-4 rounded-xl text-xs border border-slate-200 transition-colors mt-2">
                        Bjud in ytterligare en person
                    </button>
                </div>
            )
            }

            {
                status.msg && status.type === 'error' && (
                    <div className="">{status.msg}</div>
                )
            }
        </div >
    );
}

export default AddUserForm;