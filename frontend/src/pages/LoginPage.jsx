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
        <div className="">
            <div className="">
                <h2 className="">Logga in</h2>
                {error && (
                    <div>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="">
                    <div>
                        <label className="">E-post</label>
                        <input 
                        type="email"
                        name="email"
                        required
                        className=""
                        value={formData.email}
                        onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="">Lösenord</label>
                        <input 
                        type="password"
                        name="password"
                        required
                        className=""
                        value={formData.password}
                        onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="">Logga in</button>
                </form>

            </div>
        </div>
        </>
    )

};

export default LoginPage;