import { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Något gick fel.');
            }
            
            setIsSubmitted(true);
        } catch (err) {
            setStatus({ 
                type: 'error', 
                message: err.message || 'Kunde inte skicka återställningslänk. Kontrollera din anslutning.' 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-primarybgcolor/30 min-h-[70vh] flex items-center justify-center px-4 font-primary">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-secondarycolor/60 shadow-sm max-w-md w-full">
                
                {!isSubmitted ? (
                    <>
                        <div className="text-center mb-6">
                            <h2 className="text-2xl md:text-3xl font-secondary text-textprimary mb-2">Glömt lösenord?</h2>
                            <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
                                Ange din e-postadress så skickar vi en länk för att återställa ditt lösenord.
                            </p>
                        </div>

                        {status.type === 'error' && (
                            <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl p-3 mb-4 text-center">
                                {status.message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-textprimary mb-1">E-postadress</label>
                                <input 
                                    type="email" 
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="namn@hotmail.com" 
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-secondarycolor/30 rounded-xl text-sm focus:outline-none focus:border-textprimary transition-all"
                                />
                            </div>

                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full bg-secondarycolor text-textprimary py-2.5 rounded-full font-bold shadow-sm hover:bg-opacity-90 transition-all text-sm mt-2 flex items-center justify-center disabled:opacity-50"
                            >
                                {loading ? 'Skickar...' : 'Skicka återställningslänk'}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-4 space-y-4">
                        <div className="text-4xl">✉️</div>
                        <h2 className="text-xl font-bold text-textprimary">Kolla din inkorg!</h2>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            Vi har skickat instruktioner till <strong className="text-textprimary">{email}</strong> för att välja ett nytt lösenord.
                        </p>
                        <p className="text-[11px] text-gray-400 italic">
                            Hittar du inte mailet? Kolla i skräpposten.
                        </p>
                    </div>
                )}

                <div className="text-center mt-6 pt-4 border-t border-gray-100 text-xs">
                    <Link to="/login" className="text-textprimary underline font-semibold hover:opacity-80">
                        Tillbaka till logga in
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default ForgotPassword;