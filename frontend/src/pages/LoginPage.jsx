import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Inloggning misslyckad');
            }

            localStorage.setItem('userToken', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            navigate('/profile');

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <div className="min-h-screen bg-primarybgcolor font-primary flex flex-col items-center justify-center px-4 py-8 sm:py-12 md:py-16">

                <div className="text-center mb-6 sm:mb-8 w-full max-w-md">
                    <h1 className="font-secondary text-4xl sm:text-5xl text-textprimary mb-2 drop-shadow-sm select-none">Stallportalen</h1>
                </div>

                <div className="bg-white border border-secondarycolor rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-xl shadow-textprimary/5">
                    <h2 className="text-xl sm:text-2xl font-bold text-textprimary text-center mb-6">Logga in</h2>
                    {error && (
                        <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium text-center break-word">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-textprimary mb-1.5 ml-1">E-post</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full bg-primarybgcolor/40 border border-secondarycolor rounded-xl px-4 py-3 text-base sm:text-sm focus:outline-none focus:border-textprimary focus:ring-2 focus:ring-textprimary/10 transition-all text-gray-700 appearance-none"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-textprimary mb-1.5 ml-1">Lösenord</label>
                            <input
                                type="password"
                                name="password"
                                required
                                className="w-full bg-primarybgcolor/40 border border-secondarycolor rounded-xl px-4 py-3 text-base sm:text-sm focus:outline-none focus:border-textprimary focus:ring-2 focus:ring-textprimary/10 transition-all text-gray-700 appearance-none"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="text-right">
                            <Link
                                to="/forgot-password"
                                className="text-xs text-textprimary/70 hover:text-textprimary underline transition-colors active:text-textprimary inline-block py-1"
                            >
                                Glömt lösenord?
                            </Link>
                        </div>

                        <button type="submit" className="w-full bg-textprimary text-primarybgcolor font-bold py-3.5 rounded-xl shadow-md shadow-textprimary/20 hover:brightness-95 active:scale-[0.98] transition-all tracking-wider mt-2 text-base sm:text-sm touch-manipulation">Logga in</button>
                    </form>

                </div>
            </div>
        </>
    )

};

export default LoginPage;