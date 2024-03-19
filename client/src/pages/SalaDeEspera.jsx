import { useState, useEffect } from 'react';
import { useDatosM } from '../context/DatosMedicos';
import { Lateral } from '../components/Sidebar';
import { Link } from 'react-router-dom';
import {
  FaClock,
  FaGlasses,
  FaTimesCircle,
  FaCheckCircle,
} from 'react-icons/fa';
import { HiFilter, HiMenu } from 'react-icons/hi';
import { Pagination } from 'flowbite-react';

function SalaDeEspera() {
  const [filtro, setFiltro] = useState(null);
  const { obtenerDatosM, DatosM } = useDatosM();
  const [loading, setLoading] = useState(true); //
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    obtenerDatosM()
      .then(() => setLoading(false))
      .catch((error) => console.error('Error al obtener los datos:', error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFiltro = (filtroSeleccionado) => {
    if (filtro === filtroSeleccionado) {
      setFiltro(null);
    } else {
      setFiltro(filtroSeleccionado);
    }
  };

  useEffect(() => {
    obtenerDatosM();
  }, [filtro]);

  // Pacientes a mostrar en la página actual
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }
  const pacientesPorPagina = 9; // Cantidad de pacientes por página
  const indexOfLastPaciente = currentPage * pacientesPorPagina;
  const indexOfFirstPaciente = indexOfLastPaciente - pacientesPorPagina;
  const pacientesActuales = DatosM.Fichas.slice(
    indexOfFirstPaciente,
    indexOfLastPaciente
  );
  return (
    <div className="flex w-full h-full dark:text-white" id="main-content">
      <Lateral />
      <div
        className="flex items-center flex-grow flex-col justify-start p-4 bg-gray-100"
        style={{
          backgroundImage: `url(/img/bg_doc_dog.jpg)`,
          backgroundSize: 'contain',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#f3f4ef',
        }}>
        <div className="text-center mb-8">
          <h1 className="dark:text-black text-2xl font-bold" id="tit-form-ing">
            Sala de Espera
          </h1>
        </div>
        <div className="bg-gray-200 rounded m-0 p-4 flex justify-center space-x-4">
          <button className="dark:text-black">
            <HiFilter onClick={() => handleFiltro(null)} />
          </button>
          <button
            className="filter-btn"
            onClick={() => handleFiltro('En Espera')}>
            <img src="/img/reloj.png" alt="Icono en espera" />
          </button>
          <button
            className="filter-btn"
            onClick={() => handleFiltro('Ingresado')}>
            <img src="/img/!.png" alt="Icono ingresado" />
          </button>
          <button
            className="filter-btn"
            onClick={() => handleFiltro('Finalizado')}>
            <img src="/img/check.png" alt="Icono finzalizado" />
          </button>
          <button
            className="filter-btn"
            onClick={() => handleFiltro('Cancelado')}>
            <img src="/img/x.png" alt="Icono anulado" />
          </button>
        </div>
        {/* Contenedor de las fichas */}
        {DatosM.Fichas && DatosM.Fichas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-5 max-h-full overflow-y-auto shadow-inner">
            {pacientesActuales.map((fila) => (
              <Link
                to={`/Ficha/${fila._id}`}
                key={fila._id}
                className="relative  min-w-48 card max-w-96 rounded-md opacity-75 p-2 hover:scale-105 duration-150 ml-6">
                {/* Contenido de la ficha */}
                <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
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
                    Hora Ingreso: {hora(fila.Fecha)}
                  </p>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    Estado: {fila.Estado}
                  </p>
                </div>
                {/* Icono de estado */}
                {(() => {
                  switch (fila.Estado) {
                    case 'En Espera':
                      return (
                        <FaClock
                          className="absolute top-0 right-0 mr-2 mt-2 text-gray-500 opacity-50"
                          style={{
                            fontSize: '5em',
                            position: 'absolute',
                          }}
                        />
                      );
                    case 'Ingresado':
                      return (
                        <FaGlasses
                          className="absolute top-0 right-0 mr-2 mt-2 text-blue-500 opacity-50"
                          style={{
                            fontSize: '5em',
                            position: 'absolute',
                          }}
                        />
                      );
                    case 'Cancelado':
                      return (
                        <FaTimesCircle
                          className="absolute top-0 right-0 mr-2 mt-2 text-red-500 opacity-50"
                          style={{
                            fontSize: '5em',
                            position: 'absolute',
                          }}
                        />
                      );
                    case 'Finalizado':
                      return (
                        <FaCheckCircle
                          className="absolute top-0 right-0 mr-2 mt-2 text-green-500 opacity-50"
                          style={{
                            fontSize: '5em',
                            position: 'absolute',
                          }}
                        />
                      );
                    default:
                      return null;
                  }
                })()}
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            No hay resultados
          </div>
        )}
        <Pagination
          layout="pagination"
          currentPage={currentPage}
          totalPages={Math.ceil(DatosM.Fichas.length / pacientesPorPagina)}
          {...console.log(Math.ceil(DatosM.Fichas.length / pacientesPorPagina))}
          previousLabel="Volver"
          nextLabel="Siguiente"
          itemsperpage={pacientesPorPagina}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}

export default SalaDeEspera;

function hora(fechaCompleta) {
  const fecha = new Date(fechaCompleta);
  const fechaBase = new Date('1900-01-01T00:00:00.196Z');
  const fechaActual = new Date();

  // Si la fecha es igual a la fecha base, devuelve "Nunca"
  if (fecha.getTime() === fechaBase.getTime()) {
    return 'Nunca';
  } else {
    // Calcula la diferencia de tiempo en milisegundos
    const diferencia = Math.abs(fecha.getTime() - fechaActual.getTime());
    // Convierte la diferencia de tiempo a minutos
    const minutos = Math.floor(diferencia / 60000);

    // Si la diferencia es menor a 60 minutos, devuelve la diferencia en minutos
    if (minutos < 60) {
      return `Hace ${minutos} minutos`;
    } else {
      // Si la diferencia es mayor o igual a 60 minutos, calcula las horas y los minutos
      const horas = Math.floor(minutos / 60);
      const minutosRestantes = minutos % 60;
      return `Hace ${horas} horas con ${minutosRestantes} minutos`;
    }
  }
}
