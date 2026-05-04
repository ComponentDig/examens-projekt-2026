import HeroImage from '../assets/Tuna-vinter.jpg';
import oldPhoto from '../assets/Tuna-80tal.jpg';
function AboutUs() {

    return (
        <>
            {/* Hero-section? */}
            <section className="relative h-[60vh] flex items-center justify-center">
                <img src={HeroImage} className="absolute inset-0 w-full h-full object-cover" alt="Ovalbanan i vintertid" />
                <div className='absolute inset-0 bg-black/40'></div>
                <div className="relative text-center text-white px-4">
                    <h1 className="text-4xl md:text-6xl font-secondary mb-4">Vi på Tuna</h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto font-light italic font-primary">nån fin text</p>
                </div>
            </section>

            {/* historien om tuna */}
            <section className="py-16 px-16 max-w-6xl mx-auto font-primary">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Hur allt började</h2>
                        <p className="mb-4 leading-relaxed">
                            Gården - som är från tidigt 1900-tal - köptes av nuvarande ägare i slutet av 80-talet.
                            Från början var det halvblods hästar som huserade i stallet. Först XXXX kom den första islandshästen till gården.
                            1996 hölls islandshäst SM på Stall Tuna.
                        </p>
                        <p className="leading-relaxed">Text om ovalbana bla.bla</p>
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-2xl transform rotate-2">
                        {/* bild från förr? om man kan hitta. kanske byta bilden till flygfoto*/}
                        <img src={oldPhoto} className="w-full h-80 object-cover" alt="Stallet från 80-talet" />
                    </div>
                </div>
            </section>

            {/* ägarna */}
            <section className="py-16 px-16 font-primary">
                <div className="max-6-xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold">Hjärtat i stallet</h2>
                    <p className="mt-2">Det är vi äger Stall Tuna</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="p-6 rounded-lg shadow-sm text-center">
                        <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden border-4">
                            <img src="" className="" alt="" />
                        </div>
                        <h3 className="font-bold text-xl">Kristina Kristiansson</h3>
                        <p className="text-sm font-semibold mb-3">Ägare och hästfantast</p>
                        <p className=""></p>
                    </div>
                    {/* nästa ägare */}
                        <div className="p-6 rounded-lg shadow-sm text-center">
                            <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden border-4">
                                <img src="" className="" alt="" />
                            </div>
                            <h3 className="font-bold text-xl">Klas Wallsten</h3>
                            <p className="text-sm font-semibold mb-3">Ägare och gårdstomte</p>
                            <p className=""></p>
                        </div>
                    </div>
            </section>

            {/* värdegrund? */}
            <section className="">

            </section>

        </>
    )
}

export default AboutUs;