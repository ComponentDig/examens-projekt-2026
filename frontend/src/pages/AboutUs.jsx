import HeroImage from '../assets/Tuna-vinter.jpg';
import oldPhoto from '../assets/Tuna-80tal.jpg';
import hannaPhoto from '../assets/hanna-hlynur.jpg';
import veronikaPhoto from '../assets/veronika-eskill.jpg';
import stinaPhoto from '../assets/stina.jpg';
import klasPhoto from '../assets/klas.jpg';
import carmenPhoto from '../assets/carmen.jpg';
import figaroPhoto from '../assets/figaro.jpg';
import hastar from '../assets/hastar.jpg';
import hastarsova from '../assets/hästarsova.jpg';
import hastargrind from '../assets/hästargrind.jpg';
import tunavinter  from '../assets/Tuna-vinter2.jpg';

function AboutUs() {

    return (
        <>
            {/* Hero-section */}
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
                        <p className="leading-relaxed text-sm md:text-base text-gray-600">
                            Gården - med anor från 1800-tal - köptes av nuvarande ägare i slutet av 80-talet.
                            Från början var det halvblodshästar som huserade i stallet. Av en slump så kom den första islandshästen i början av 90-talet och kärleken till islandshästarna var funnen.
                        </p>
                        <p className='leading-relaxed text-sm md:text-base text-gray-600'>Ovalbanan byggdes och var klar lagom till islandshäst SM 1996 som hölls på Stall Tuna.
                            Idag är gården en levande mötesplats med en välskött ovalbana där träningar och tävlinga arrangeras, fina ridvägar och en fantastisk gemenskap mellan våra inackorderade.
                        </p>
                    </div>
                    <div className="w-full rounded-2xl overflow-hidden shadow-xl shadow-textprimary/5 border border-secondarycolor transform hover:scale-[1.01] transition-transform duration-300">
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
                            <img src={stinaPhoto} className="w-full h-full object-cover bg-gray-200" alt="" />
                        </div>
                        <h3 className="font-bold text-lg md:text-xl text-textprimary mb-0.5">Kristina Kristiansson</h3>
                        <p className="text-xs uppercase tracking-wider font-semibold text-textprimary mb-3">Ägare och hästfantast</p>
                        <p className="text-xs md:text-sm text-gray-600 leading-relaxed">Kristina är den som ser till att den dagliga verksamheten rullar och har alltid ett öga för hästarnas välmående</p>
                    </div>
                    {/* nästa ägare */}
                    <div className="bg-[#FEF8EE] p-6 md:p-8 rounded-2xl border border-secondarycolor shadow-md shadow-textprimary/5 flex flex-col items-center text-center">
                        <div className="w-28 h-28 md:w-32 md:h-32 rounded-full mb-4 md:mb-5 overflow-hidden border-4 border-textprimary shadow-sm">
                            <img src={klasPhoto} className="w-full h-full object-cover bg-gray-200" alt="" />
                        </div>
                        <h3 className="font-bold text-lg md:text-xl text-textprimary mb-0.5">Klas Wallsten</h3>
                        <p className="text-xs uppercase tracking-wider font-semibold text-textprimary mb-3">Ägare och gårdstome</p>
                        <p className="text-xs md:text-sm text-gray-600 leading-relaxed">Klas är gårdens allt-i-allo. Det är han som lagar staket, kör traktorn och ser till att anläggningen är i toppskick</p>
                    </div>


                </div>

                {/* hundarna */}
                <div className="mt-16 mb-20 px-4 flex flex-col items-center justify-center">

                    <div className="text-center mb-8">
                        <h3 className="font-secondary text-xl md:text-2xl text-textprimary">Gårdens maskotar 🐾</h3>
                        <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">Våra fyrbenta stallvärdar som håller koll på stallbacken</p>
                    </div>

                    <div className="max-w-max mx-auto">


                        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 w-full">

                            {/* Hund 1  */}
                            <div className="bg-white/60 p-6 rounded-xl border border-secondarycolor/60 shadow-md shadow-textprimary/5 flex flex-col items-center text-center w-full sm:w-64">
                                <div className="w-20 h-20 rounded-full mb-4 overflow-hidden border-2 border-textprimary shadow-sm flex items-center justify-center bg-gray-100 shrink-0">
                                    <img src={carmenPhoto} className="w-full h-full object-cover min-h-full min-w-full" alt="Figaro" />
                                </div>
                                <h4 className="font-bold text-base text-textprimary mb-0.5">Carmen</h4>
                                <span className="text-[10px] uppercase tracking-wider font-semibold text-textprimary mb-3">Stallets riktiga chef</span>
                                <p className="text-xs text-gray-600 leading-relaxed italic">
                                    "Håller stenkoll på alla som kommer, såväl hästar som människor"
                                </p>
                            </div>

                            {/* Hund 2  */}
                            <div className="bg-white/60 p-6 rounded-xl border border-secondarycolor/60 shadow-md shadow-textprimary/5 flex flex-col items-center text-center w-full sm:w-64">
                                <div className="w-20 h-20 rounded-full mb-4 overflow-hidden border-2 border-textprimary shadow-sm flex items-center justify-center bg-gray-100 shrink-0">
                                    <img src={figaroPhoto} className="w-full h-full object-cover min-h-full min-w-full" alt="Figaro" />
                                </div>
                                <h4 className="font-bold text-base text-textprimary mb-0.5">Figaro</h4>
                                <span className="text-[10px] uppercase tracking-wider font-semibold text-textprimary mb-3">Chef över staketkontroll</span>
                                <p className="text-xs text-gray-600 leading-relaxed italic">
                                    "Patrullerar hagarna med Klas och ser till att inga traktorer startar utan hans godkännande."
                                </p>
                            </div>

                        </div>
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

            {/* andra bilder ska in senare */}
            {/* Galleri-sektion */}
            <section className="py-12 md:py-20 px-4 sm:px-6 max-w-6xl mx-auto font-primary">
                <div className="text-center mb-10 md:mb-14">
                    <span className="text-xs uppercase tracking-[0.2em] font-bold text-textprimary">Glimtar från gården</span>
                    <h2 className="text-2xl md:text-4xl font-secondary text-textprimary mt-1">Galleri</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                    {/* Bild 1 */}
                    <div className="group relative h-64 rounded-2xl overflow-hidden border border-secondarycolor shadow-md shadow-textprimary/5 transform hover:scale-[1.02] transition-all duration-300">
                        <img src={tunavinter} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Stallmiljö" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <span className="text-white text-xs font-medium tracking-wide">Vinter på Tuna</span>
                        </div>
                    </div>

                    {/* Bild 2 */}
                    <div className="group relative h-64 rounded-2xl overflow-hidden border border-secondarycolor shadow-md shadow-textprimary/5 transform hover:scale-[1.02] transition-all duration-300">
                        <img src={hastarsova} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Historisk bild" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <span className="text-white text-xs font-medium tracking-wide">Mätta hästar</span>
                        </div>
                    </div>

                    {/* Bild 3 */}
                    <div className="group relative h-64 rounded-2xl overflow-hidden border border-secondarycolor shadow-md shadow-textprimary/5 transform hover:scale-[1.02] transition-all duration-300">
                        <img src={hastargrind} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Träning" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <span className="text-white text-xs font-medium tracking-wide">I väntan på att få komma in</span>
                        </div>
                    </div>

                    {/* Bild 4 */}
                    <div className="group relative h-64 rounded-2xl overflow-hidden border border-secondarycolor shadow-md shadow-textprimary/5 transform hover:scale-[1.02] transition-all duration-300">
                        <img src={hastar} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Gemenskap" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <span className="text-white text-xs font-medium tracking-wide">Gräset är godare på andra sidan staketet</span>
                        </div>
                    </div>

                </div>
            </section>


        </>
    )
}

export default AboutUs;