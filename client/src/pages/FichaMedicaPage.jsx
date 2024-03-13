import React, { useState, useEffect } from 'react';
import { Lateral } from '../components/Sidebar';
import AgendarControlModal from '../components/AgendarControlModal';
import { useDatosM } from '../context/DatosMedicos';
import { useParams } from 'react-router-dom';

function FichaMedicaPage() {
  const { obtenerDatosFiltrados, DatosMFiltrados } = useDatosM();
  const { id } = useParams();
  const { Ficha } = DatosMFiltrados;
  useEffect(() => {
    obtenerDatosFiltrados(id);
  }, [id]);

  // Verificar si los datos han sido cargados antes de renderizar
  if (!DatosMFiltrados || !DatosMFiltrados.Fichas) {
    return <div>Cargando datos...</div>;
  }

  // Extraer los datos del tutor y la mascota
  const { ID_Tutor, ID_Mascota } = DatosMFiltrados.Fichas;

  return (
    <div className="flex h-full">
      {/* Menú */}
      <Lateral />

      <div className="flex-grow p-6 max-h-full overflow-y-auto">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">Ficha Médica</h1>
        </div>

        <div>
          {/* Datos tutor */}
          <h2 className="font-bold py-3">Datos tutor:</h2>
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="py-2 px-3 border border-gray-400">Campo</th>
                <th className="py-2 px-3 border border-gray-400">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-3 border border-gray-400">RUT</td>
                <td className="py-2 px-3 border border-gray-400">{ID_Tutor.rutTutor}</td>
              </tr>
              <tr>
                <td className="py-2 px-3 border border-gray-400">Nombre</td>
                <td className="py-2 px-3 border border-gray-400">{ID_Tutor.Nombre}</td>
              </tr>
              <tr>
                <td className="py-2 px-3 border border-gray-400">Correo</td>
                <td className="py-2 px-3 border border-gray-400">{ID_Tutor.Correo}</td>
              </tr>
              <tr>
                <td className="py-2 px-3 border border-gray-400">Dirección</td>
                <td className="py-2 px-3 border border-gray-400">{ID_Tutor.Direccion}</td>
              </tr>
              <tr>
                <td className="py-2 px-3 border border-gray-400">Celular</td>
                <td className="py-2 px-3 border border-gray-400">{ID_Tutor.Celular}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          {/* Datos mascota */}
          <h2 className="font-bold py-3">Datos mascota:</h2>
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="py-2 px-3 border border-gray-400">Campo</th>
                <th className="py-2 px-3 border border-gray-400">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-3 border border-gray-400">RUT o Chip</td>
                <td className="py-2 px-3 border border-gray-400">{ID_Mascota.Rut_Ficha_Masc}</td>
              </tr>
              <tr>
                <td className="py-2 px-3 border border-gray-400">Nombre</td>
                <td className="py-2 px-3 border border-gray-400">{ID_Mascota.Nombre}</td>
              </tr>
              <tr>
                <td className="py-2 px-3 border border-gray-400">Especie</td>
                <td className="py-2 px-3 border border-gray-400">{ID_Mascota.Especie}</td>
              </tr>
              <tr>
                <td className="py-2 px-3 border border-gray-400">Raza</td>
                <td className="py-2 px-3 border border-gray-400">{ID_Mascota.Raza}</td>
              </tr>
              <tr>
                <td className="py-2 px-3 border border-gray-400">Antecedentes médicos</td>
                <td className="py-2 px-3 border border-gray-400">{ID_Mascota.Antencedentes}</td>
              </tr>
              <tr>
                <td className="py-2 px-3 border border-gray-400">Peso</td>
                <td className="py-2 px-3 border border-gray-400"><input type="number" className="w-full border p-2 mb-2"/></td>
              </tr>
              <tr>
                <td className="py-2 px-3 border border-gray-400">Tamaño</td>
                <td className="py-2 px-3 border border-gray-400"><input type="number" className="w-full border p-2 mb-2"/></td>
              </tr>
              <tr>
                <td className="py-2 px-3 border border-gray-400">Edad</td>
                <td className="py-2 px-3 border border-gray-400"><input type="number" className="w-full border p-2 mb-2"/></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex mt-5">
          <AgendarControlModal />
        </div>
      </div>
    </div>
  );
}

export default FichaMedicaPage;
