import startImage from '../assets/Tuna-vinter2.jpg';
import { NavLink } from 'react-router-dom';

function Home() {
    return (
        <div className='py-10 md:py-16 px-4 sm:px-8 md:px-16 max-w-6xl mx-auto font-primary'>
            <div className='flex flex-col md:flex-row items-center gap-8 md:gap-12'>
                <div className='w-full md:w-1/2'>
                    <div className='rounded-2xl overflow-hidden shadow-xl md:shadow-2xl h-60 sm:h-80 md:h-auto'>
                        <img src={startImage} className='w-full h-full object-cover' alt="Stall Tuna i vinterskrud" />
                    </div>
                </div>
                <div className='w-full md:w-1/2 text-center md:text-left flex flex-col items-center md:items-start'>
                    <h1 className='text-3xl sm:text-4xl md:text-5xl font-secondary text-textprimary font-bold mb-6 leading-tight'>Välkommen till Stall Tuna</h1>
                    <p className='text-base sm:text-lg text-gray-700 mb-4 leading-relaxed'>Här möts intresset för islandshästar i en lugn och naturnära miljö - där samarbete och glädjen för hästlivet står i centrum.</p>
                    <p className='text-sm sm:text-base text-gray-600 mb-4 leading-relaxed'>På gården finns en fin ovalbana som kan bokas för träning och tävling. Vårt stall är en perfekt plats för att rida, umgås och njuta av tiden i stallet.</p>
                    <p className='text-sm sm:text-base text-gray-600 mb-6 leading-relaxed'>På Stall Tuna vill vi att det ska vara en plats där man trivs och känner sig välkommen - här är vi som en stor familj.</p>
                    <NavLink to="/booking" className="inline-block w-full sm:w-auto text-center bg-secondarycolor text-textprimary px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-opacity-90 hover:scale-105 transition-all border border-primarybgcolor/20">Boka Banan</NavLink>
                </div>

            </div>
        </div>
    );
}

export default Home;