import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('userToken');
    const location = useLocation();

    const isAdmin = token && user && user.role === 'admin';

    if (!isAdmin) {
        return <Navigate to="/admin/login" state={{from: location}} replace />
    }

    return children;
}

export default ProtectedRoute;