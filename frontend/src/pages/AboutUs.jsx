import HeroImage from '../assets/Tuna-vinter.jpg'
function AboutUs() {

    return (
        <>
            {/* Hero-section? */}
            <section className="relative h-[60vh] flex items-center justify-center">
                <img src={HeroImage} className="absolute inset-0 w-full h-full object-cover" alt="" />
                <div className='absolute inset-0 bg-black/40'></div>
                <div className="relative text-center text-white px-4">
                    <h1 className="text-4xl md:text-6xl font-secondary mb-4">Vi på Tuna</h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto font-light italic font-primary">nån fin text</p>
                </div>
            </section>

            {/* historien om tuna */}
            <section className="">
                <div className="">
                    <div>
                        <h2 className="">Hur allt började</h2>
                        <p className="">text om gården/starten</p>
                        <p className="">mer text om gården</p>
                    </div>
                    <div className="">
                        {/* bild från förr? om man kan hitta*/}
                        <img src="" className="" alt="" />
                    </div>
                </div>
            </section>

            {/* ägarna */}
            <section className="">
                <div className="">
                    <h2 className=""></h2>
                    <p className=""></p>
                </div>

                <div className="">
                    <div className="">
                        <div className="">
                            <img src="" className="" alt="" />
                        </div>
                        <h3 className="">Kristina Kristiansson</h3>
                        <p className=""></p>
                        <p className=""></p>
                    </div>
                    {/* nästa ägare */}
                    <div className="">
                        <div className="">
                            <div className="">
                                <img src="" className="" alt="" />
                            </div>
                            <h3 className="">Klas Wallsten</h3>
                            <p className=""></p>
                            <p className=""></p>
                        </div>
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