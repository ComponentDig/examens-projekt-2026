import { Link, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('userToken');

        navigate('/admin/login', { replace: true });
    }

    return (
        <>
            <aside className='bg-sky-950 text-blue-100 flex flex-col md:w-64 md:h-screen border-b md:border-b-0 md:border-r border-sky-900 shadow-sm'>
                <div className='p-5 border-b border-sky-900 bg-sky-900/40'>
                    <div className='text-base font-bold text-white tracking-wide'>Stallhantering</div>
                    <div className='text-[10px] text-sky-400 font-bold uppercase tracking-wider'>Adminpanel</div>
                </div>

                <nav className='flex flex-row md:flex-col flex-1 p-2 md:p-4 gap-1 overflow-x-auto md:overflow-x-visible'>
                    <Link to="/admin" className='px-4 py-2.5 rounded-lg text-sm font-semibold text-sky-200 hover:bg-sky-900 hover:text-white transition-colors whitespace-nowrap'>Dashboard</Link>
                    <Link to="/admin/users" className='px-4 py-2.5 rounded-lg text-sm font-semibold text-sky-200 hover:bg-sky-900 hover:text-white transition-colors whitespace-nowrap'>Användare</Link>
                    <Link to="/admin/schedule" className='px-4 py-2.5 rounded-lg text-sm font-semibold text-sky-200 hover:bg-sky-900 hover:text-white transition-colors whitespace-nowrap'>Schema</Link>
                </nav>


                <div className='p-2 md:p-4 border-t border-sky-900 flex items-center justify-between md:flex-col md:items-stretch gap-2 bg-sky-950'>
                    <div className='hidden md:block px-3 py-1.5 text-[11px] text-sky-300 bg-sky-900/30 rounded-md text-center border border-sky-800/60 font-semibold'>Inloggad som Administratör</div>

                    <button onClick={handleLogout} className='px-4 py-2 md:w-full text-xs font-bold text-red-400 hover-bg-red-950/40 border border-transparent hover:border-red-900/40 rounded-lg transition-colors'>Logga ut</button>
                </div>
            </aside>
        </>
    )
};

export default AdminSidebar;