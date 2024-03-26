import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Flowbite } from 'flowbite-react';
import { ProtectedRoute, ProtectedAdminRoute } from './routes';
{
  /*IMPORT CONTEXT*/
}
import { AuthProvider } from './context/AuthContext';
import { DatosMProvider } from './context/DatosMedicos';
import { UsersProvider } from './context/UsersContext';
import { ControlesProvider } from './context/ControlesContext';
import { MascotasProvider } from './context/MascotasContext';
{
  /*IMPORT PAGES */
}
import LoginPage from './pages/LoginPage';
import IngresoPage from './pages/IngresoPage';
import ListadoControles from './pages/ListadoControles';
import FichaMedicaPage from './pages/FichaMedicaPage';
import ListadoMascotasPage from './pages/ListadoMascotasPage';
import SalaDeEspera from './pages/SalaDeEspera';
import HomePage from './pages/HomePage';
import Usuarios from './pages/Usuarios';
import DosisPage from './pages/DosisPage';
import DietasPage from './pages/DietasPage';
import Chat from './pages/ChatGPTPage';
import MascotaDetallePage from './pages/MascotaDetallePage';
// import Prueba from './pages/Prueba';

function App() {
  return (
    <Flowbite>
      <AuthProvider>
        <DatosMProvider>
          <UsersProvider>
            <ControlesProvider>
              <BrowserRouter>
                <MascotasProvider>
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
                      <Route element={<ProtectedAdminRoute />}>
                        <Route path="/Usuarios" element={<Usuarios />} />
                      </Route>
                      <Route
                        path="/ListadoControles"
                        element={<ListadoControles />}
                      />
                      <Route
                        path="/ListadoFichasMedicas"
                        element={<ListadoMascotasPage />}
                      />
                    </Route>
                    <Route
                      path="ListadoFichasMedicas/Mascota/:id"
                      element={<MascotaDetallePage />}></Route>
                  </Routes>
                </MascotasProvider>
              </BrowserRouter>
            </ControlesProvider>
          </UsersProvider>
        </DatosMProvider>
      </AuthProvider>
    </Flowbite>
  );
}

export default App;
