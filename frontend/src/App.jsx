import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';

// import of admin
import Dashboard from '../admin/pages/Dashboard';
import ProtectedRoute from '../admin/components/ProtectedRoute';
import AdminLayout from '../layouts/AdminLayout';
import AdminLogin from '../admin/pages/AdminLogin';
import AdminSchedulePage from '../admin/pages/AdminSchedulePage';

function App() {


  return (
    <BrowserRouter>
      <Routes>
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
          {/* <Route path='users' element={}/> */}
        </Route>

        {/*         
        <Route path='/admin'
          element={<ProtectedRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>} /> */}

      </Routes>
    </BrowserRouter>
  )

}

export default App
