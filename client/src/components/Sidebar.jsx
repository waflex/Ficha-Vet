import { Sidebar, Spinner } from 'flowbite-react';
import {
  HiHome,
  HiBookOpen,
  HiClipboard,
  HiUser,
  HiUserAdd,
  HiHeart,
  HiUserGroup,
  HiKey,
  HiCalculator,
  HiMenu,
} from 'react-icons/hi';
import { TbPremiumRights } from 'react-icons/tb';
import { useAuth } from '../context/AuthContext';
import { DarkThemeToggle } from 'flowbite-react';
import { useEffect } from 'react';

export const Lateral = () => {
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (loading && !user) {
      window.location.reload();
    }
  }, [loading, user]);

  if (loading || !user) {
    return (
      <div className="flex h-full bg-gradient-to-br from-teal-200 to-teal-400 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 items-center overflow-hidden">
        <div className="grid w-full justify-items-center scale-150">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      </div>
    );
  }

  // Renderizar la barra lateral cuando los datos del usuario estén listos

  return (
    <>
      <button
        className="cel fixed top-5 left-5 right-0 dark:text-gray-500"
        onClick={onClick}>
        <HiMenu />
      </button>
      <Sidebar
        aria-label="Sidebar"
        className="SideBar rounded-none w-72 min-w-72">
        <Sidebar.Items className="items-start max-w-52">
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/Home" icon={HiHome}>
              Inicio
            </Sidebar.Item>
            <Sidebar.Item href="/SalaDeEspera" icon={HiHeart} labelColor="dark">
              SalaDeEspera
            </Sidebar.Item>
            <Sidebar.Item href="/IngresoPage" icon={HiClipboard}>
              Nueva Consulta
            </Sidebar.Item>
            <Sidebar.Item href="/ListadoFichasMedicas" icon={HiBookOpen}>
              Ver Fichas Medicas
            </Sidebar.Item>
            <Sidebar.Item href="/ListadoControles" icon={HiBookOpen}>
              Controles
            </Sidebar.Item>
            <Sidebar.Collapse
              icon={HiCalculator}
              label="Herramientas"
              className="inline-flex">
              <Sidebar.Item href="/Dosis">Calcular dosis</Sidebar.Item>
              <Sidebar.Item href="/Dietas">Dietas</Sidebar.Item>
              <Sidebar.Item href="/#" icon={TbPremiumRights}>
                Chat IA
              </Sidebar.Item>
            </Sidebar.Collapse>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
        <Sidebar.Items className="absolute bottom-5 left-5">
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiUser}>
              {obtenerNombreApellido(user.Nombre)}
            </Sidebar.Item>
            {user && parseInt(user.TipoUsuario) === 1 ? (
              <>
                <Sidebar.Item href="/Registro" icon={HiUserAdd}>
                  Agregar Usuario
                </Sidebar.Item>
                <Sidebar.Item href="/Usuarios" icon={HiUserGroup}>
                  Ver usuarios
                </Sidebar.Item>
              </>
            ) : (
              <></>
            )}
            <Sidebar.Item href="/" onClick={() => logout()} icon={HiKey}>
              Cerrar Sesion
            </Sidebar.Item>
            <Sidebar.Item>
              <DarkThemeToggle className="w-full text-left dark:text-right" />
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
};

function obtenerNombreApellido(nombreCompleto) {
  // Dividir el nombre completo en partes separadas por espacios
  if (!nombreCompleto) {
    window.location.reload();
    return 'Cargando Datos';
  }
  const partes = nombreCompleto.split(' ');

  // Si hay menos de 2 partes, no hay suficientes datos para determinar nombre y apellido
  if (partes.length < 2) {
    return partes[0];
  }
  if (partes.length > 2) {
    return partes[0] + ' ' + partes[partes.length - 1];
  }
}
function onClick() {
  const sideBar = document.querySelector('.SideBar');
  sideBar.classList.toggle('show');
  const cel = document.querySelector('.cel');
  cel.classList.toggle('show');
}
