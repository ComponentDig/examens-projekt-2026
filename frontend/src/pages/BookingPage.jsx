

function BookingPage() {

    return (
        <>

            <div className=" min-h-screen font-primary pt-24 pb-16 px-6 md:px-16">
                <div className="max-w-6xl mx-auto">

                    <div className="mb-12">
                        <h1 className="text-4xl font-bold mb-4">Boka Bana</h1>
                        <div className="h-1 w-20 bg-secondarycolor"></div> {/* linje under rubrik*/}
                    </div>

                    <div className="flex flex-col md:flex-row gap-12">
                        <div className="w-full md:w-1/3 space-y-6">
                            <div className="p-6 rounded-2xl border shadow-md">
                                <h2 className="text-xl font-bold mb-6">Information & Regler</h2>

                                {/* prislista */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-sm tracking-wider font-bold mb-3">Prislista</h3>
                                        <ul className="space-y-3">
                                            <li className="flex justify-between items-center border-b pb-2">
                                                <span>Enstaka träning</span>
                                                <span className="font-bold text-lg">150 kr</span>
                                            </li>
                                            <li className="flex justify-between items-center border-b pb-2">
                                                <span>Halvdag</span>
                                                <span className="font-bold text-lg">1000 kr</span>
                                            </li>
                                            <li className="flex justify-between items-center border-b pb-2">
                                                <span>Heldag</span>
                                                <span className="font-bold text-lg">1500 kr</span>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* regler */}
                                    <div className="pt-4 border-t">
                                        <h3 className="text-sm tracking-wider font-bold mb-3">Viktigt att veta</h3>
                                        <ul className="space-y-4">
                                            <li className="flex items-start gap-3">
                                                <span className="text-xl leading-none">&sdot;</span>
                                                <p className="text-sm"><strong>Mockning: </strong>Banan ska alltid mockas efter avslutad träning.</p>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-xl leading-none">&sdot;</span>
                                                <p className="text-sm"><strong>Drop-in: </strong>Du är välkommen att träna utan bokning, men då kan du få sällskap av andra.</p>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-xl leading-none">&sdot;</span>
                                                <p className="text-sm italic">Genom att boka garanteras du ensamrätt till banan under din valda tid.</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* kalendervy */}
                        <div className="w-full md:w-2/3">
                            <div className="p-8 rounded-2xl border-2 border-dashed min-h-100 flex items-center justify-center">
                                <p>Här ska kalendern ligga</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default BookingPage;