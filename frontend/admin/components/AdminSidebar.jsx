import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <>
            <aside className='w-64 bg-adminsidebar text-admintext flex flex-col'>
                <div className='p-6 text-xl font-bold text-admintext'>Stallhantering</div>
                <nav className='flex-1 p-4 space-y-2'>
                    <Link to="/admin" className='block p-3'>Dashboard</Link>
                    <Link to="/admin/users" className='block p-3'>Användare</Link>
                    <Link to="/admin/schedule" className='block p-3'>Schema</Link>
                </nav>

                <div className='p-4 text-xs text-center'>Inloggad som Administratör</div>
            </aside>
        </>
    )
};

export default AdminSidebar;