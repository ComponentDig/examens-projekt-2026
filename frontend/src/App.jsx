import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';

// import of admin
import Dashboard from '../admin/pages/Dashboard';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/admin' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App
