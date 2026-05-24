import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setStatus({ type: 'error', message: 'Lösenorden matchar inte.' });
        }

        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/reset-password/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Länken kan ha löpt ut eller är ogiltig.');
            }

            setStatus({ type: 'success', message: 'Ditt lösenord har ändrats! Du skickas till inloggningen om några sekunder...' });

            // Skicka användaren till logga in-sidan efter 3 sekunder
            setTimeout(() => {
                navigate('/login');
            }, 3500);

        } catch (err) {
            setStatus({ type: 'error', message: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-primarybgcolor font-primary flex flex-col items-center justify-center px-4 py-8">
            <div className="bg-white border border-secondarycolor rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-xl shadow-textprimary/5">
                <h2 className="text-xl sm:text-2xl font-bold text-textprimary text-center mb-2">Välj nytt lösenord</h2>
                <p className="text-xs text-gray-500 text-center mb-6">
                    Ange ditt nya lösenord för Stallportalen nedan.
                </p>

                {status.message && (
                    <div className={`mb-5 p-3 rounded-xl text-sm font-medium text-center ${status.type === 'success'
                            ? 'bg-green-50 border border-green-200 text-green-600'
                            : 'bg-red-50 border border-red-200 text-red-600'
                        }`}>
                        {status.message}
                    </div>
                )}

                {status.type !== 'success' && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-textprimary mb-1.5 ml-1">Nytt lösenord</label>
                            <input
                                type="password"
                                required
                                minLength={6}
                                className="w-full bg-primarybgcolor/40 border border-secondarycolor rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-textprimary focus:ring-2 focus:ring-textprimary/10 transition-all text-gray-700"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-textprimary mb-1.5 ml-1">Bekräfta lösenord</label>
                            <input
                                type="password"
                                required
                                className="w-full bg-primarybgcolor/40 border border-secondarycolor rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-textprimary focus:ring-2 focus:ring-textprimary/10 transition-all text-gray-700"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-textprimary text-primarybgcolor font-bold py-3.5 rounded-xl shadow-md hover:brightness-95 active:scale-[0.98] transition-all tracking-wider mt-2 text-sm disabled:opacity-50"
                        >
                            {loading ? 'Sparar...' : 'Spara nytt lösenord'}
                        </button>
                    </form>
                )}

                <div className="text-center mt-6 pt-4 border-t border-gray-100 text-xs">
                    <Link to="/login" className="text-textprimary/70 hover:text-textprimary underline font-semibold">
                        Avbryt
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;