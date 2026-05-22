// importera lite bilder senare
import sommarbete from '../assets/sommarbete.jpg';
import mockning from '../assets/mockning.jpg';
import lagtavlning from '../assets/lagtavling.jpg';

function UpComing() {
    const events = [
        {
            id: 1,
            title: "Hagmockning",
            date: "9 Maj",
            category: "Gemenskap",
            description: "Vi hjälps åt att mocka i vinterhagarna. Stina och Klas startar grillen vid 16!",
            status: "Aktivitet"
        },
        {
            id: 2,
            title: "Dags för sommarbete!",
            date: "21 Maj",
            category: "Gemenskap",
            description: "Klockan 17 goes vi i samlad trupp med vallackarna till sommarhagen. Om någon inte kan vara med så oroa er inte, vi lämnar ingen häst kvar.",
            status: "Aktivitet"
        },
        {
            id: 3,
            title: "Helen Blom kurs",
            date: "24 Maj",
            category: "Träning",
            description: "Helen Blom kommer och hjälper med det ni vill träna på!",
            status: "Kurs"
        },
        {
            id: 4,
            title: "Lagtävling",
            date: "12-13 September",
            category: "Tävling",
            description: "Den årliga lagtävlingen går av stapeln!",
            status: "Tävling"
        }
    ];

    return (
        <div className="bg-primarybgcolor/30 min-h-screen font-primary">

            {/* Intro / Header */}
            <section className="py-12 md:py-16 px-4 max-w-4xl mx-auto text-center">
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-textprimary block mb-2">Händer på gården</span>
                <h1 className="text-3xl md:text-5xl font-secondary text-textprimary">På gång på Tuna</h1>
                <p className="text-sm md:text-base text-gray-600 mt-3 max-w-md mx-auto leading-relaxed">
                    Här hittar du information om sommarbete, träningar, tävlingar och andra gemensamma aktiviteter vi gör på gården.
                </p>
            </section>

            {/* Nyhets- & Aktivitetsflöde */}
            <section className="px-4 pb-16 max-w-3xl mx-auto">
                <div className="space-y-6">
                    {events.map((event) => (
                        <div key={event.id} className="bg-white rounded-2xl border border-secondarycolor/60 shadow-sm shadow-textprimary/5 p-6 md:p-8 relative overflow-hidden">
                            
                            {/* FIX: Denna stänger sig själv nu med /> och ligger separat från texten */}
                            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                                event.category === 'Träning' ? 'bg-textprimary' : 
                                event.category === 'Tävling' ? 'bg-[#A89F91]' : 'bg-secondarycolor'
                            }`} />

                            {/* FIX: Denna ligger nu fritt utanför sidolinjen och får ta plats */}
                            <div className="flex flex-col space-y-3 pl-2">
                                <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                                    <div className="flex items-center gap-2">
                                        <span className="uppercase tracking-wider font-bold bg-primarybgcolor text-textprimary px-2.5 py-0.5 rounded-full border border-secondarycolor/50 text-[10px]">
                                            {event.category}
                                        </span>
                                        <span className="text-gray-400 font-semibold">
                                            📅 {event.date}
                                        </span>
                                        <span className="text-gray-400 italic text-[11px]">
                                            {event.status}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="text-lg md:text-xl font-bold text-textprimary">
                                    {event.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {event.description}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>
            </section>

            {/* Galleri: Bilder på saker som hänt */}
            <section className="border-t border-secondarycolor/40 py-16 px-4 max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <span className="text-xs uppercase tracking-[0.2em] font-bold text-textprimary">Härliga stunder</span>
                    <h2 className="text-2xl md:text-3xl font-secondary text-textprimary mt-1">Glimtar från gården</h2>
                    <p className="text-xs text-gray-400 mt-1">Bilder från betessläpp, kurser och vardagsmys på Tuna</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                    {/* Bild 1 */}
                    <div className="group relative h-64 rounded-xl overflow-hidden border border-secondarycolor/60 shadow-sm bg-white">
                        <img src={sommarbete} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-textprimary">Maj</span>
                            <span className="text-white text-sm font-medium mt-0.5">Glada hästar på sommarbetet</span>
                        </div>
                    </div>

                    {/* Bild 2 */}
                    <div className="group relative h-64 rounded-xl overflow-hidden border border-secondarycolor/60 shadow-sm bg-white">
                        <img src={lagtavlning} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Träning på ovalbanan" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-textprimary">Tävling</span>
                            <span className="text-white text-sm font-medium mt-0.5">Lagtävling 2025</span>
                        </div>
                    </div>

                    {/* Bild 3 */}
                    <div className="group relative h-64 rounded-xl overflow-hidden border border-secondarycolor/60 shadow-sm bg-white">
                        <img src={mockning} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Gemenskap på Tuna" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-textprimary">Gemenskap</span>
                            <span className="text-white text-sm font-medium mt-0.5">Välförtjänt paus under hagmockning</span>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}

export default UpComing;