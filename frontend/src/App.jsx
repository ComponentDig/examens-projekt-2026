import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';

// import of admin
import Dashboard from './admin/pages/Dashboard';
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './admin/pages/AdminLogin';
import AdminSchedulePage from './admin/pages/AdminSchedulePage';
import AdminUserPage from './admin/pages/AdminUserPage';


function App() {


  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={
          <MainLayout>
            <Home />
          </MainLayout>
        } />


        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />


        {/* Admin routes */}
        <Route path='/admin/login' element={<AdminLogin />} />

        <Route path='/admin' element={<ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>}
        >
          <Route index element={<Dashboard />} />
          <Route path='schedule' element={<AdminSchedulePage />} />
          <Route path='users' element={<AdminUserPage />} />
        </Route>



      </Routes>
    </BrowserRouter>
  )

}

export default App
