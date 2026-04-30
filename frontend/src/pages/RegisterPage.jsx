import { useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [inviteData, setInviteData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!token) {
            setError("Ingen inbjudningskod hittades");
            setLoading(false);
            return;
        }

        const verifyToken = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify-invite/${token}`);
                const data = await response.json();

                if (response.ok) {
                    setInviteData(data);
                } else {
                    setError(data.message || "Ogiltig länk");
                }
            } catch {
                setError("Kunde inte ansluta till servern");
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [token]);

    const handleRegister = async (formDetails) => {
        try {

            const finalData = { ...formDetails, token };

            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/complete-register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || data.error || "Kunde inte registrera användare");
            }

            console.log("Konto Skapat!", data);

            navigate("/login");
        } catch (error) {
            alert(error.message);
        }
    };


    if (loading) return <div className="text-center mt-20">Verifierar inbjudan..</div>

    if (error) return (
        <div className="text-center mt-20">
            <p className="text-red-500 mb-4">{error}</p>
            <Link to="/login" className="underline">Tillbaka till logga in</Link>
        </div>
    );

    return (
        <>
            <div className="max-w-md mx-auto mt-12 p-8 rounded-lg shadow-sm">
                <h1 className="text-2xl font-bold mb-6">Välkommen till Tuna</h1>
                <RegisterForm onRegister={handleRegister} initialEmail={inviteData?.email} />
            </div>
        </>
    )

}

export default RegisterPage;