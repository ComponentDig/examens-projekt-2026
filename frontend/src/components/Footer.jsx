import Logo from '../assets/logo.png';

function Footer () {

    return (
        <>
        <footer className="w-full bg-secondarycolor py-12 px-8 mt-auto">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 font-primary text-sm">

                <div className="flex flex-col gap-2">
                    <p>Email: </p>
                    {/* ska vara länk för ett kontaktformulär */}
                    <p>Kontakta oss</p>
                </div>

                <div className="flex- flex-col gap-2">
                    <p>Länk till Freyfaxi</p>
                    {/* lägga in länk till föreningen */}
                    <a href="" target="_blank" className="underline hover:opacity-70 transition">Freyfaxi</a>
                </div>

                <div className="flex flex-col gap-2">
                    <p>Adress</p>
                    <p>Bälinge-Tuna 11</p>
                </div>
            </div>

            <div className="flex justify-end items-start">
                <div className="w-24 h-24 flex items-center justify-center p-2">
                    <img src={Logo} alt="logotyp häst huvud i silhuette" className="w-full h-full object-contain"/>
                </div>
            </div>

        </footer>
        </>
    )
}

export default Footer;