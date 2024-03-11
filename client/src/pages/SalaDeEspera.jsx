import { useState, useEffect } from 'react';
import { filtroDatos } from '../api/salaEspera';
import { useDatosM } from '../context/DatosMedicos';
import { Lateral } from '../components/Sidebar';
import { Link } from 'react-router-dom';

function SalaDeEspera() {
  const [datos, setDatos] = useState([]);
  const [filtro, setFiltro] = useState(null);
  const { obtenerDatosM, DatosM } = useDatosM();

  useEffect(() => {
    obtenerDatosM();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFiltro = (filtroSeleccionado) => {
    setFiltro(filtroSeleccionado);
  };

  useEffect(() => {
    obtenerDatosM();
  }, [filtro]);

  return (
    <div className="flex w-full h-full">
      <Lateral />
      <div className="flex flex-grow flex-col justify-start p-4 bg-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold" id="tit-form-ing">
            Sala de Espera
          </h1>
        </div>
        <div className="bg-gray-200 m-0 p-4 flex justify-end space-x-4">
          <button className="filter-btn" onClick={() => handleFiltro('espera')}>
            <img src="/img/reloj.png" alt="Icono en espera" />
          </button>
          <button
            className="filter-btn"
            onClick={() => handleFiltro('ingresado')}>
            <img src="/img/!.png" alt="Icono ingresado" />
          </button>
          <button
            className="filter-btn"
            onClick={() => handleFiltro('finalizado')}>
            <img src="/img/check.png" alt="Icono finzalizado" />
          </button>
          <button
            className="filter-btn"
            onClick={() => handleFiltro('anulado')}>
            <img src="/img/x.png" alt="Icono anulado" />
          </button>
        </div>
        {/* Contenedor de las fichas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-5">
          {DatosM.Fichas &&
            DatosM.Fichas.map((fila) => (
              <Link
                to={`/Ficha/${fila._id}`}
                key={fila._id}
                className="card max-w-96 rounded-md p-2 hover:scale-105 duration-150 ml-6">
                <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  {/* Contenido de la ficha */}
                  <h6 className="font-normal text-gray-700 dark:text-gray-400">
                    Nombre Paciente
                  </h6>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {fila.ID_Mascota.Nombre}
                  </h5>
                  <h6 className="font-normal text-gray-700 dark:text-gray-400">
                    Nombre Tutor: {fila.ID_Tutor.Nombre}
                  </h6>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    ID: {fila._id}
                  </p>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    Fecha: {hora(fila.Fecha)}
                  </p>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    Estado: {fila.Estado}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SalaDeEspera;

function hora(fechaCompleta) {
  const fecha = new Date(fechaCompleta);
  return fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
