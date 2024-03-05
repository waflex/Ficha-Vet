import React from 'react';

function SalaDeEspera() {
  return (
    <div className="overflow-x-auto">
      <div className="text-center m-8">
        <h1 className="text-2xl font-bold" id="tit-form-ing">
          Formulario de ingreso
        </h1>
      </div>
      <div className="flex justify-end items-center bg-gray-200 p-4">
        <div className="flex space-x-4">
          <button className="filter-btn">Reloj</button>
          <button className="filter-btn">!!!</button>
          <button className="filter-btn">check</button>
          <button className="filter-btn">X</button>
        </div>
      </div>
      <table className="min-w-full bg-white border rounded-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Tutor</th>
            <th className="py-2 px-4 border-b">Mascota</th>
            <th className="py-2 px-4 border-b">Hora</th>
            <th className="py-2 px-4 border-b">Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b"></td>
            <td className="py-2 px-4 border-b"></td>
            <td className="py-2 px-4 border-b"></td>
            <td className="py-2 px-4 border-b"></td>
            <td className="py-2 px-4 border-b"></td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b"></td>
            <td className="py-2 px-4 border-b"></td>
            <td className="py-2 px-4 border-b"></td>
            <td className="py-2 px-4 border-b"></td>
            <td className="py-2 px-4 border-b"></td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b"></td>
            <td className="py-2 px-4 border-b"></td>
            <td className="py-2 px-4 border-b"></td>
            <td className="py-2 px-4 border-b"></td>
            <td className="py-2 px-4 border-b"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SalaDeEspera;
