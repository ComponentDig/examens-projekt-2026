import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.user.role !== 'admin') {
                    setError("Åtkomst nekad: Du är inte administratör.");
                    return;
                }

                localStorage.setItem('userToken', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                navigate('/admin');

            } else {
                setError(data.message || "Inloggning misslyckades");
            }
        } catch (error) {
            setError("Kunde inte ansluta");
            console.error("Fetch error:", error);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen px-4">
                <form onSubmit={handleLogin} className="p-8 rounded shadow-xl w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-6 text-center">Stall Admin</h2>
                    <p className="text-center mb-8 text-sm">Logga in för att hantera stallet</p>

                    {error && (
                        <div className="">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs uppercase mb-1 ml-1">E-post</label>
                            <input
                                type="email"
                                required
                                className="w-full p-3 rounded border outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase mb-1 ml-1">Lösenord</label>
                            <input
                                type="password"
                                required
                                className="w-full p-3 rounded border outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full font-bold p-3 rounded mt-8">Logga in i kontrollpanelen</button>
                </form>
            </div>
        </>
    )
};

export default AdminLogin;