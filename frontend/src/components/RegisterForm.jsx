import { useState } from "react";

const RegisterForm = ({ onRegister }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
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
            <form onSubmit={handleSubmit} className="">
                <div className="">
                    <input
                        name="firstName"
                        value={formData.firstName}
                        placeholder="Förnamn"
                        onChange={handleChange}
                        required
                        className=""
                    />

                    <input
                        name="lastName"
                        value={formData.lastName}
                        placeholder="Efternamn"
                        onChange={handleChange}
                        required
                        className=""
                    />
                </div>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="E-postadress"
                    onChange={handleChange}
                    required
                    className=""
                />

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="Lösenord"
                    onChange={handleChange}
                    required
                    className=""
                />
                <button type="submit" className="">
                    Skapa Konto
                </button>
            </form>
        </>
    );
};

export default RegisterForm;