import { useState } from "react";


// formulär för att registrera sig som användare
// ha kvar? ta bort?
const RegisterForm = ({ onRegister, initialEmail }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(formData);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <div className="text-sm p-2 rounded border">
                    Registrera konto för: <strong>{initialEmail}</strong>
                </div>

                <div className="flex gap-2">
                    <input
                        name="firstName"
                        value={formData.firstName}
                        placeholder="Förnamn"
                        onChange={handleChange}
                        required
                        className="border p-2 rounded w-full"
                    />

                    <input
                        name="lastName"
                        value={formData.lastName}
                        placeholder="Efternamn"
                        onChange={handleChange}
                        required
                        className="border p-2 rounded w-full"
                    />
                </div>

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="Lösenord"
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                />
                <button type="submit" className="bg-green-600 text-white p-2 rounded hover:opacity-90">
                    Slutför registrering
                </button>
            </form>
        </>
    );
};

export default RegisterForm;