import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IngresoPage from './pages/IngresoPage';
import LoginPage from './pages/LoginPage';
import RegistroUser from './pages/RegistroUser';
import FichaMedicaPage from './pages/FichaMedicaPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IngresoPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reg" element={<RegistroUser />} />
        <Route path="/fich" element={<FichaMedicaPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
