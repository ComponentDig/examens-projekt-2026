import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
// import av login

// import of admin
import AdminSidebar from '../admin/components/AdminSidebar';
import Dashboard from '../admin/pages/Dashboard';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<RegisterPage />} />

        <Route path='/admin' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App
