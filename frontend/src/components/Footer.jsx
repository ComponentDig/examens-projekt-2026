import Logo from '../assets/logo.png';
import { Link, NavLink } from 'react-router-dom';

function Footer() {
    return (
        <footer className="w-full bg-secondarycolor py-12 px-6 md:px-8 mt-auto border-t border-primarybgcolor/20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 font-primary text-sm text-textprimary text-center sm:text-left">

                <div className="flex flex-col gap-2">
                    <p className="font-bold text-xs uppercase tracking-wider text-textprimary/60 mb-1">Genvägar</p>
                    <NavLink to="/login" className={({ isActive }) => isActive ? "active-link font-bold" : "link hover:opacity-70 transition"}>Logga in</NavLink>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="font-bold text-xs uppercase tracking-wider text-textprimary/60 mb-1">Kontakt</p>
                    <p>Email: <a href="mailto:info@tunagard.se" className="hover:underline">info@tunagard.se</a></p>
                    {/* Framtida länk för kontaktformulär */}
                    <Link to="/contact" className="hover:underline hover:opacity-70 transition">Kontakta oss</Link>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="font-bold text-xs uppercase tracking-wider text-textprimary/60 mb-1">Förening</p>
                    <p className="text-xs text-gray-500">Vår lokala islandshästförening:</p>
                    <a href="https://www.freyfaxi.com" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70 transition font-medium">Freyfaxi</a>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="font-bold text-xs uppercase tracking-wider text-textprimary/60 mb-1">Adress</p>
                    <p className="leading-relaxed">Bälinge-Tuna 11<br /> 755 93 Uppsala</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-primarybgcolor/20 flex justify-center sm:justify-end">
                <div className="w-20 h-20 flex items-center justify-center p-2 opacity-80">
                    <img src={Logo} alt="logotyp häst huvud i silhuette" className="w-full h-full object-contain" />
                </div>
            </div>
        </footer>
    );
}

export default Footer;