import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';


// en protected route för användare 
const UserProtectedRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('userToken');

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    localStorage.removeItem('userToken');
                }
            } catch (error) {
                console.error("Kunde inte hämta profil:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // logga ut funktion som tar bort token vid utloggning och rensar state
    // skickar tillbaka användare till startsidan
    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    }

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center text-gray-500 bg-primarybgcolor">
                Laddar Stall Tuna...
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return children(user, handleLogout );
};

export default UserProtectedRoute;