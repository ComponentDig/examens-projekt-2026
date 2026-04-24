import { Link, NavLink } from 'react-router-dom';


function Header() {

    return (
        <>
            <header className='w-full md:h-80 h-60 bg-secondarycolor flex flex-col items-center justify-between'>
                <div className='flex-1 flex items-center justify-between'>
                    <h1 className='font-secondary md:text-8xl text-6xl text-textprimary'>Hemma På Tuna</h1>
                </div>

                <nav className='w-full flex justify-center'>
                    <div className='w-4/5 md:w-3/4 border-t border-primarybgcolor py-6'>
                        <ul className='flex justify-center gap-8 md:gap-16 py-6 text-sm md:text-base tracking font-primary'>
                            <li><NavLink to="/" className={({ isActive }) => isActive ? "active-link" : "link"}>Hem</NavLink></li>
                            <li><NavLink to="/" className={({ isActive }) => isActive ? "active-link" : "link"}>Vi på Tuna</NavLink></li>
                            <li><NavLink to="/" className={({ isActive }) => isActive ? "active-link" : "link"}>Boka Banan</NavLink></li>
                            <li><NavLink to="/" className={({ isActive }) => isActive ? "active-link" : "link"}>På gång</NavLink></li>
                            <li><NavLink to="/login" className={({ isActive }) => isActive ? "active-link" : "link"}>Logga in</NavLink></li>
                        </ul>
                    </div>
                </nav>

            </header>
        </>
    )
}

export default Header;