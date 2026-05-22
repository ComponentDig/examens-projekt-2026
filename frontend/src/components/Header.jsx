import { Link, NavLink } from 'react-router-dom';

function Header() {
    return (
        <>

            <header className='w-full md:h-80 min-h-64 bg-secondarycolor flex flex-col items-center justify-between py-4 md:py-0'>

                <div className='flex-1 flex items-center justify-between px-4 text-center'>
                    <h1 className='font-secondary md:text-8xl text-4xl sm:text-5xl text-textprimary'><Link to="/">Hemma På Tuna</Link></h1>
                </div>

                <nav className='w-full flex justify-center'>
                    <div className='w-11/12 sm:w-4/5 md:w-3/4 border-t border-primarybgcolor py-4 md:py-6'>
                        <ul className='flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-16 text-sm md:text-base font-primary tracking-wide'>
                            <li><NavLink to="/" className={({ isActive }) => isActive ? "active-link font-bold" : "link"}>Hem</NavLink></li>
                            <li><NavLink to="/about" className={({ isActive }) => isActive ? "active-link font-bold" : "link"}>Vi på Tuna</NavLink></li>
                            <li><NavLink to="/upcoming" className={({ isActive }) => isActive ? "active-link font-bold" : "link"}>På Gång</NavLink></li>
                            <li className="w-full sm:w-auto text-center mt-2 md:mt-0"><NavLink to="/booking" className={({ isActive }) => `inline-block w-full sm:w-auto px-4 md:px-5 py-1.5 md:py-2 rounded-full font-bold transition-all duration-300 border-2 border-primarybgcolor text-textprimary hover:bg-opacity-90 ${isActive ? "bg-primarybgcolor shadow-md scale-105" : "bg-secondarycolor hover:bg-primarybgcolor"}`}>Boka Banan</NavLink></li>
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header;