'use client';

import { Link } from 'react-router-dom';
import { Sidebar } from 'flowbite-react';
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from 'react-icons/hi';

export const Lateral = () => {
  // IngresoPage" element={<IngresoPage />} />
  //           <Route path="/Ficha" element={<FichaMedicaPage />} />
  //           <Route path="/Home" element={<HomePage />} />
  //           <Route path="/SalaDeEspera" element={<SalaDeEspera />} />
  //           <Route path="/Registro" element={<RegistroUser />} />
  //           <Route path="/LisListadoFichasMedicas
  return (
    <Sidebar aria-label="Sidebar">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/" icon={HiChartPie}>
            Inicio
          </Sidebar.Item>
          <Sidebar.Item
            href="/SalaDeEspera"
            icon={HiViewBoards}
            label="Pro"
            labelColor="dark">
            SalaDeEspera
          </Sidebar.Item>
          <Sidebar.Item href="/Registro" icon={HiUser}>
            Registro
          </Sidebar.Item>
          <Sidebar.Item href="/IngresoPage" icon={HiShoppingBag}>
            Nueva Consulta
          </Sidebar.Item>
          <Sidebar.Item href="/LisListadoFichasMedicas" icon={HiShoppingBag}>
            Registro Mascota
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiTable}>
            Cerrar Sesion
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};
