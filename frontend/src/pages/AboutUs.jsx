import HeroImage from '../assets/Tuna-vinter.jpg';
import oldPhoto from '../assets/Tuna-80tal.jpg';
import hannaPhoto from '../assets/hanna-hlynur.jpg';
import veronikaPhoto from '../assets/veronika-eskill.jpg';

function AboutUs() {

    return (
        <>
            {/* Hero-section? */}
            <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
                <img src={HeroImage} className="absolute inset-0 w-full h-full object-cover" alt="Ovalbanan i vintertid" />
                <div className='absolute inset-0 bg-black/40'></div>
                <div className="relative text-center text-white px-4 md:px-6">
                    <h1 className="text-4xl md:text-7xl font-secondary mb-3 tracking-wider">Vi på Tuna</h1>
                    <div className="w-12 md:w-16 h-0.5 bg-textprimary mx-auto mb-4"></div>
                    <p className="text-base md:text-2xl max-w-2xl mx-auto font-light italic font-primary text-gray-100 leading-relaxed">Hjärtat, historien och gemenskapen på vår gård</p>
                </div>
            </section>

            {/* liten historia om Tuna */}
            <section className="py-12 md:py-20 px-4 sm:px-6 max-w-6xl mx-auto font-primary">
                <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div className='space-y-4 mt-6 md:mt-0'>
                        <span className="text-xs uppercase tracking-[0.2em] font-bold text-textprimary block">Vårt ursprung</span>
                        <h2 className="text-2xl md:text-4xl font-secondary text-textprimary">Hur allt började</h2>
                        {/* 1800-tal - oklart exakt när byn från 1400-1500-tal */}
                        <p className="leading-relaxed text-sm md:text-base text-gray-600">
                            Gården - med anor från 1800-tal - köptes av nuvarande ägare i slutet av 80-talet.
                            Från början var det halvblodshästar som huserade i stallet. Av en slump så kom den första islandshästen i början av 90-talet och kärleken till islandshästarna var funnen.
                        </p>
                        <p className='leading-relaxed text-sm md:text-base text-gray-600'>Ovalbanan byggdes och var klar lagom till islandshäst SM 1996 som hölls på Stall Tuna.
                            Idag är gården en levande mötesplats med en välskött ovalbana där träningar och tävlinga arrangeras, fina ridvägar och en fantastisk gemenskap mellan våra inackorderade.
                        </p>
                    </div>
                    <div className="w-full rounded-2xl overflow-hidden shadow-xl shadow-textprimary/5 border border-secondarycolor transform hover:scale-[1.01] transition-transform duration-300">
                        {/* bild från förr? om man kan hitta. kanske byta bilden till flygfoto*/}
                        <img src={oldPhoto} className="w-full h-64 sm:h-80 md:h-100 object-cover" alt="Stallet från 80-talet" />
                    </div>
                </div>
            </section>

            {/* ägarna */}
            <section className="py-12 md:py-20 px-4 sm:px-6 bg-primarybgcolor/40 border-y border-secondarycolor/30 font-primary">
                <div className="max-w-6xl mx-auto text-center mb-10 md:mb-16">
                    <span className="text-xs uppercase tracking-[0.2em] font-bold text-textprimary">Människorna bakom</span>
                    <h2 className="text-2xl md:text-4xl font-secondary text-textprimary mt-1">Hjärtat i stallet</h2>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">Det är vi som äger Stall Tuna</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                    <div className="bg-[#FEF8EE] p-6 md:p-8 rounded-2xl border border-secondarycolor shadow-md shadow-textprimary/5 flex flex-col items-center text-center">
                        <div className="w-28 h-28 md:w-32 md:h-32 rounded-full mb-4 md:mb-5 overflow-hidden border-4 border-textprimary shadow-sm">
                            <img src="" className="w-full h-full object-cover bg-gray-200" alt="" />
                        </div>
                        <h3 className="font-bold text-lg md:text-xl text-textprimary mb-0.5">Kristina Kristiansson</h3>
                        <p className="text-xs uppercase tracking-wider font-semibold text-textprimary mb-3">Ägare och hästfantast</p>
                        <p className="text-xs md:text-sm text-gray-600 leading-relaxed">Kristina är den som ser till att den dagliga verksamheten rullar och har alltid ett öga för hästarnas välmående</p>
                    </div>
                    {/* nästa ägare */}
                    <div className="bg-[#FEF8EE] p-6 md:p-8 rounded-2xl border border-secondarycolor shadow-md shadow-textprimary/5 flex flex-col items-center text-center">
                        <div className="w-28 h-28 md:w-32 md:h-32 rounded-full mb-4 md:mb-5 overflow-hidden border-4 border-textprimary shadow-sm">
                            <img src="" className="w-full h-full object-cover bg-gray-200" alt="" />
                        </div>
                        <h3 className="font-bold text-lg md:text-xl text-textprimary mb-0.5">Klas Wallsten</h3>
                        <p className="text-xs uppercase tracking-wider font-semibold text-textprimary mb-3">Ägare och gårdstome</p>
                        <p className="text-xs md:text-sm text-gray-600 leading-relaxed">Klas är gårdens allt-i-allo. Det är han som lagar staket, kör traktorn och ser till att anläggningen är i toppskick</p>
                    </div>

                    {/* hundarna? */}
                    <div className="mt-8 md:mt-12 text-center max-w-md mx-auto bg-white/60 border border-secondarycolor/60 rounded-xl p-4 text-xs text-gray-500 italic leading-relaxed">
                        🐾 <strong>Gårdens maskotar:</strong> Glöm inte att hälsa på våra trogna stallhundar som glatt patrullerar stallbacken och håller ordning på foderleveranserna!
                    </div>

                </div>
            </section>

            {/* några hästägare */}
            <section className="py-12 md:py-20 px-4 sm:px-6 font-primary max-w-6xl mx-auto">
                <div className="text-center mb-10 md:mb-16">
                    <span className="text-xs uppercase tracking-[0.2em] font-bold text-textprimary">Vår gemenskap</span>
                    <h2 className='text-2xl md:text-4xl font-secondary text-textprimary mt-1'>Vad våra ryttare säger</h2>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto'>

                    {/* kort 1 */}
                    <div className='bg-[#FEF8EE] p-6 md:p-8 rounded-2xl border border-secondarycolor shadow-md shadow-textprimary/5 flex flex-col items-center text-center transition-all duration-200 hover:shadow-lg'>
                        <div className='w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-textprimary'>
                            <img src={veronikaPhoto} className='w-full h-full object-cover' alt='' />
                        </div>
                        <h4 className='font-bold text-base md:text-lg text-textprimary mb-0.5'>Veronika & Eskill</h4>
                        <span className='text-xs uppercase tracking-wider font-semibold text-textprimary mb-3'>Inackorderad</span>
                        <p className='text-xs md:text-sm text-gray-600 italic leading-relaxed'>"Jag har stått på Tuna i 5 år. Alla är så hjälpsamma och vi trivs superbra!</p>
                    </div>

                    {/* kort 2 */}
                    <div className='bg-[#FEF8EE] p-6 md:p-8 rounded-2xl border border-secondarycolor shadow-md shadow-textprimary/5 flex flex-col items-center text-center transition-all duration-200 hover:shadow-lg'>
                        <div className='w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-textprimary'>
                            <img src={hannaPhoto} className='w-full h-full object-cover' alt='' />
                        </div>
                        <h4 className='font-bold text-base md:text-lg text-textprimary mb-0.5'>Hanna & Hlynur</h4>
                        <span className='text-xs uppercase tracking-wider font-semibold text-textprimary mb-3'>Inackorderad</span>
                        <p className='text-xs md:text-sm text-gray-600 italic leading-relaxed'>"Jag har stått på Tuna i 10 år. Alla är så hjälpsamma och vi trivs superbra!</p>
                    </div>

                </div>

            </section>

            {/* galleri med olika bilder? */}


        </>
    )
}

export default AboutUs;