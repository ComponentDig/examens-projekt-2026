import startImage from '../assets/Tuna-vinter2.jpg';


function Home() {

    return (
        <>
            <div className='py-16 px-16 max-w-6xl mx-auto font-primary'>
                <div className='flex flex-col md:flex-row items-center gap-12'>
                    <div className='w-full md:w-1/2'>
                        <div className='rounded-2xl overflow-hidden shadow-2xl'>
                            <img src={startImage} className='w-full h-full object-cover' />
                        </div>
                    </div>

                    <div className='w-full md:w-1/2'>
                        <h1 className='text-5xl font-bold mb-6'>Välkommen till Stall Tuna</h1>
                        <p className='text-lg mb-4'>Här möts intresset för islandshästar i en lugn och naturnära miljö - där samarbete och glädjen för hästlivet står i centrum.</p>
                        <p className='mb-4'>På gården finns en fin ovalbana som kan bokas för träning och tävling. Vårat stall en perfekt plats för att rida, umgås och njuta av tiden i stallet.</p>
                        <p>På stall Tuna vill vi att det ska vara en plats där man trivs och känner sig välkommen - här är vi som en stor familj.</p>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Home;