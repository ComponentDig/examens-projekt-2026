import AdminSidebar from "../admin/components/AdminSidebar";

const AdminLayout = ({ children }) => {
    return (
        <>
            <div className="flex min-h-screen">
                <AdminSidebar />

                <div className="flex-1 flex flex-col">
                    <header className="h-16 bg-white flex items-center px-8">
                        <h2 className="text-xl font-semibold text-admintext">Adminpanel - Stallportal</h2>
                    </header>

                    <main className="p-8">
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
};

export default AdminLayout;