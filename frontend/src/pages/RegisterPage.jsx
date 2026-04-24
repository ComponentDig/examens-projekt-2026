import { useNavigate, Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
    const navigate = useNavigate();

    const handleRegister = async (userData) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || data.error || "Kunde inte registrera användare");
            }

            console.log("Konto Skapat!", data);

            localStorage.setItem('userToken', data.token);

            navigate("/");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <div className="">
                <h1 className="">Skapa Konto</h1>
                <div className="">
                    <RegisterForm onRegister={handleRegister} />
                    <div className="">
                        <span className="">Har du redan ett konto?</span>
                        <Link to="/login" className="">
                            Logga in
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )

}

export default RegisterPage;