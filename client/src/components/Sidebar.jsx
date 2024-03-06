// import React from "react";
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white">
      <ul className="whitespace-nowrap m-5 mt-9">
        <li className="mb-4">
          <Link to="/Home" className="cursor-pointer text-lg font-semibold">
            Home
          </Link>
        </li>
        <hr className="my-2 border-gray-600"></hr>
        {/*  */}
        <li className="mb-4">
          <Link to="/Ficha" className="mb-4 cursor-pointer text-gray-300">
            Ficha Médica
          </Link>
          <hr className="my-2 border-gray-600"></hr>
        </li>
        {/*  */}
        <li className="mb-4">
          <Link to="/IngresoPage" className="mb-4 cursor-pointer text-gray-300">
            Ingreso Paciente
          </Link>
        </li>
        <hr className="my-2 border-gray-600"></hr>
        {/*  */}
        <li className="mb-4">
          <Link to="/SalaDeEspera" className="mb-4 cursor-pointer text-gray-300">
            Sala de espera
          </Link>
        </li>
        <hr className="my-2 border-gray-600"></hr>
        {/*  */}
        <li className="mb-4 cursor-pointer text-gray-300">Sección 2</li>
        <hr className="my-2 border-gray-600"></hr>
        <li className="mb-4 cursor-pointer text-gray-300">Sección 3</li>
        <hr className="my-2 border-gray-600"></hr>
      </ul>
    </div>
  );
};
