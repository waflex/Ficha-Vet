import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IngresoPage from './pages/IngresoPage';
import LoginPage from './pages/LoginPage';
import FichaMedicaPage from './pages/FichaMedicaPage';
import ListadoFichasPage from './pages/ListadoFichasPage';
import HomePage from './pages/HomePage';
import SalaDeEspera from './pages/SalaDeEspera';
import RegistroUser from './pages/RegistroUser';
import ListadoControles from './pages/ListadoControles';
import Usuarios from './pages/Usuarios';
import { AuthProvider } from './context/AuthContext';
import { DatosMProvider } from './context/DatosMedicos';
import { ProtectedRoute, ProtectedAdminRoute } from './routes';
import { Flowbite } from 'flowbite-react';
import { UsersProvider } from './context/UsersContext';
import { ControlesProvider } from './context/ControlesContext';
import DosisPage from './pages/DosisPage';
import DietasPage from './pages/DietasPage';
import Chat from './pages/ChatGPTPage';
// import Prueba from './pages/Prueba';

function App() {
  return (
    <Flowbite>
      <AuthProvider>
        <DatosMProvider>
          <UsersProvider>
            <ControlesProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  {/* <Route path="/Prueba" element={<Prueba />} /> */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/IngresoPage" element={<IngresoPage />} />
                    <Route path="/Ficha/:id" element={<FichaMedicaPage />} />
                    <Route path="/Home" element={<HomePage />} />
                    <Route path="/SalaDeEspera" element={<SalaDeEspera />} />
                    <Route path="/Dosis" element={<DosisPage />}></Route>
                    <Route path="/Dietas" element={<DietasPage />}></Route>
                    <Route path="/Chat" element={<Chat />}></Route>
                    <Route path="/Registro" element={<RegistroUser />} />
                    <Route element={<ProtectedAdminRoute />}>
                      <Route path="/Usuarios" element={<Usuarios />} />
                    </Route>
                    <Route
                      path="/ListadoControles"
                      element={<ListadoControles />}
                    />
                    <Route
                      path="/ListadoFichasMedicas"
                      element={<ListadoFichasPage />}
                    />
                  </Route>
                </Routes>
              </BrowserRouter>
            </ControlesProvider>
          </UsersProvider>
        </DatosMProvider>
      </AuthProvider>
    </Flowbite>
  );
}

export default App;
