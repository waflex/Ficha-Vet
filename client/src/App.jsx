import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IngresoPage from './pages/IngresoPage';
import LoginPage from './pages/LoginPage';
import FichaMedicaPage from './pages/FichaMedicaPage';
import HomePage from './pages/HomePage';
import SalaDeEspera from './pages/SalaDeEspera';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/IngresoPage" element={<IngresoPage/>} />
        <Route path="/Ficha" element={<FichaMedicaPage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/SalaDeEspera" element={<SalaDeEspera />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
