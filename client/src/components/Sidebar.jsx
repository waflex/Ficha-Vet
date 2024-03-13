'use client';

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
} from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import { DarkThemeToggle } from 'flowbite-react';

export const Lateral = () => {
  const { user, logout } = useAuth();
  if (!user || !user.TipoUsuario) {
    <div className="flex flex-wrap gap-2">
      <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    </div>;
  }
  return (
    <Sidebar aria-label="Sidebar" className="">
      <Sidebar.Items className="items-start">
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
          <Sidebar.Collapse icon={HiCalculator} label="Herramientas">
            <Sidebar.Item href="#">Calcular dosis</Sidebar.Item>
            <Sidebar.Item href="#">Sales</Sidebar.Item>
            <Sidebar.Item href="#">Refunds</Sidebar.Item>
            <Sidebar.Item href="#">Shipping</Sidebar.Item>
          </Sidebar.Collapse>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
      <Sidebar.Items className="absolute bottom-5 left-5">
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiUser}>
            Perfil
          </Sidebar.Item>
          {console.log(user.TipoUsuario)}
          {parseInt(user.TipoUsuario) === 1 ? (
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
            <DarkThemeToggle />
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};
