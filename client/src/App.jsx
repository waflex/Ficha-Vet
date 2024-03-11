import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IngresoPage from './pages/IngresoPage';
import LoginPage from './pages/LoginPage';
import FichaMedicaPage from './pages/FichaMedicaPage';
import ListadoFichasPage from './pages/ListadoFichasPage';
import HomePage from './pages/HomePage';
import SalaDeEspera from './pages/SalaDeEspera';
import RegistroUser from './pages/RegistroUser';
import { AuthProvider } from './context/AuthContext';
import { DatosMProvider } from './context/DatosMedicos';

function App() {
  return (
    <AuthProvider>
      <DatosMProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/IngresoPage" element={<IngresoPage />} />
            <Route path="/Ficha/:id" element={<FichaMedicaPage />} />
            <Route path="/Home" element={<HomePage />} />
            <Route path="/SalaDeEspera" element={<SalaDeEspera />} />
            <Route path="/Registro" element={<RegistroUser />} />
            <Route
              path="/ListadoFichasMedicas"
              element={<ListadoFichasPage />}
            />
          </Routes>
        </BrowserRouter>
      </DatosMProvider>
    </AuthProvider>
  );
}

export default App;
