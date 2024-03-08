import React from 'react';

function ListadoFichasPage() {
  return (
    <div className="overflow-x-auto">
      <div className="text-center m-8">
        <h1 className="text-2xl font-bold" id="tit-form-ing">
          Lista de Fichas
        </h1>
      </div>

      <table className="min-w-full bg-white border rounded-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4 border-b">IDFicha</th>
            <th className="py-2 px-4 border-b">Tutor</th>
            <th className="py-2 px-4 border-b">Mascota</th>
            <th className="py-2 px-4 border-b">Fecha</th>
            <th className="py-2 px-4 border-b">Diagnóstico</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b">{}</td>
            <td className="py-2 px-4 border-b ">{}</td>
            <td className="py-2 px-4 border-b">{}</td>
            <td className="py-2 px-4 border-b">{}</td>
            <td className="py-2 px-4 border-b">{}</td>
          </tr>
        </tbody>
      </table>
      <div className="max-w-sm bg-white border border-gray-300 p-6 rounded-lg shadow-md m-5 hover:scale-90 duration-700">
        <h2 className="text-2xl font-semibold mb-4">
          Mi Tarjeta con Tailwind CSS
        </h2>
        <p className="text-gray-700 mb-4">¡Aquí puedes poner tu contenido!</p>
        <a href="#" className="text-blue-500 hover:underline">
          Leer más
        </a>
      </div>
    </div>
  );
}

export default ListadoFichasPage;
