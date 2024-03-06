import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IngresoPage from './pages/IngresoPage';
import LoginPage from './pages/LoginPage';
import FichaMedicaPage from './pages/FichaMedicaPage';
import HomePage from './pages/HomePage';
import SalaDeEspera from './pages/SalaDeEspera';
import RegistroUser from './pages/RegistroUser';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/IngresoPage" element={<IngresoPage />} />
          <Route path="/Ficha" element={<FichaMedicaPage />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/SalaDeEspera" element={<SalaDeEspera />} />
          <Route path="/Registro" element={<RegistroUser />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
