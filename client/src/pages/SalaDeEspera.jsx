import { useState, useEffect } from 'react';
import { useDatosM } from '../context/DatosMedicos';
import { Lateral } from '../components/Sidebar';
import { HiMinusCircle, HiCheckCircle } from 'react-icons/hi';
import { FichaAtender, FichaCancelar } from '../api/salaEspera';
import { useNavigate } from 'react-router-dom';
import {
  FaClock,
  FaGlasses,
  FaTimesCircle,
  FaCheckCircle,
} from 'react-icons/fa';
import { HiFilter } from 'react-icons/hi';
import { Button, Pagination, Spinner } from 'flowbite-react';

function SalaDeEspera() {
  const { obtenerDatosM, DatosM } = useDatosM();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtro, setFiltro] = useState(null);
  const Navigate = useNavigate();

  useEffect(() => {
    obtenerDatosM()
      .then(() => setLoading(false))
      .catch((error) => console.error('Error al obtener los datos:', error));
  }, []);

  useEffect(() => {
    obtenerDatosM()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => console.error('Error al obtener los datos:', error));
  }, [filtro]);

  const handleFiltro = (filtroSeleccionado) => {
    if (filtro === filtroSeleccionado) {
      setFiltro(null);
    } else {
      setFiltro(filtroSeleccionado);
    }
  };

  const handelAtender = async (idPaciente) => {
    // Lógica para atender al paciente y comunicarse con la función FichaAtender
    try {
      const res = await FichaAtender(idPaciente);
      console.log(res);
      if (res.status === 200) {
        Navigate(`/Ficha/${idPaciente}`);
        // Redireccionar a "/Ficha/${fila._id}"
      }
    } catch (error) {
      alert('Error al atender al paciente \n intentalo denuevo', error);
      console.error('Error al atender al paciente:', error);
    }
  };

  const handelCancelar = async (data) => {
    // Lógica para atender al paciente y comunicarse con la función FichaAtender
    try {
      const res = await FichaCancelar(data);
      console.log(res);
      if (res.status === 200) {
        Navigate(`/Ficha/${data}`);
        // Redireccionar a "/Ficha/${fila._id}"
      }
    } catch (error) {
      alert('Error al atender al paciente \n intentalo denuevo', error);
      console.error('Error al atender al paciente:', error);
    }
  };

  const pacientesFiltrados = filtro
    ? DatosM.Fichas.filter((paciente) => paciente.Estado === filtro)
    : DatosM.Fichas;

  const pacientesPorPagina = 9;
  const indexOfLastPaciente = currentPage * pacientesPorPagina;
  const indexOfFirstPaciente = indexOfLastPaciente - pacientesPorPagina;
  const pacientesActuales = pacientesFiltrados?.slice(
    indexOfFirstPaciente,
    indexOfLastPaciente
  );
  if (loading) {
    return (
      <div className="flex h-full bg-gradient-to-br from-teal-200 to-teal-400 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 items-center">
        <div className="grid w-full justify-items-center scale-150">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full h-full dark:text-white" id="main-content">
      <Lateral />
      <div
        className="flex items-center flex-grow flex-col justify-start p-4 bg-gray-100"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(22, 189, 202, 0.2), rgba(23, 189, 202, 1)), url(/img/bg_doc_dog.jpg)`,
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
        <div className="bg-gray-200 rounded m-0 p-4 flex justify-center space-x-6">
          <button
            className="dark:text-black"
            onClick={() => handleFiltro(null)}>
            <HiFilter className="relative mx-auto my-2 scale-200" />
          </button>
          <button
            className="filter-btn"
            onClick={() => handleFiltro('En Espera')}>
            <FaClock className="relative mx-auto my-2 scale-200 text-gray-500 opacity-50 " />
          </button>
          <button
            className="filter-btn"
            onClick={() => handleFiltro('Ingresado')}>
            <FaGlasses className="relative mx-auto my-2 scale-200 text-blue-500 opacity-50" />
          </button>
          <button
            className="filter-btn"
            onClick={() => handleFiltro('Finalizado')}>
            <FaCheckCircle className="relative mx-auto my-2 scale-200 text-green-500   opacity-50" />
          </button>
          <button
            className="filter-btn"
            onClick={() => handleFiltro('Cancelado')}>
            <FaTimesCircle className="relative mx-auto my-2 scale-200 text-red-500 opacity-50" />
          </button>
        </div>
        {pacientesActuales.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 max-h-full overflow-y-auto shadow-inner">
            {pacientesActuales.map((fila) => (
              <div
                key={fila._id}
                className="relative select-none hover:cursor-pointer min-w-48 card max-w-96 rounded-md p-2 hover:scale-105 duration-150 ml-6">
                <div className="block max-w-sm p-6 min-h-72 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
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

                  <Button.Group
                    className={`relative w-full justify-center mt-6 ${
                      fila.Estado === 'Cancelado' ? 'hidden' : 'none'
                    }`}>
                    <Button
                      color="success"
                      onClick={() => handelAtender(fila._id)}>
                      <HiCheckCircle className="mr-3 h-4 w-4" />
                      Atender
                    </Button>
                    <Button
                      color="failure"
                      onClick={() => handelCancelar(fila._id)}>
                      <HiMinusCircle className="mr-3 h-4 w-4" />
                      Cancelar
                    </Button>
                  </Button.Group>
                </div>
                {(() => {
                  switch (fila.Estado) {
                    case 'En Espera':
                      return (
                        <FaClock
                          className="absolute top-0 right-0 mr-2 mt-2 text-gray-500 opacity-50"
                          style={{
                            fontSize: '5em',
                          }}
                        />
                      );
                    case 'Ingresado':
                      return (
                        <FaGlasses
                          className="absolute top-0 right-0 mr-2 mt-2 text-blue-500 opacity-50"
                          style={{
                            fontSize: '5em',
                          }}
                        />
                      );
                    case 'Cancelado':
                      return (
                        <FaTimesCircle
                          className="absolute top-0 right-0 mr-2 mt-2 text-red-500 opacity-50"
                          style={{
                            fontSize: '5em',
                          }}
                        />
                      );
                    case 'Finalizado':
                      return (
                        <FaCheckCircle
                          className="absolute top-0 right-0 mr-2 mt-2 text-green-500 opacity-50"
                          style={{
                            fontSize: '5em',
                          }}
                        />
                      );
                    default:
                      return null;
                  }
                })()}
              </div>
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
          totalPages={Math.ceil(
            pacientesFiltrados?.length / pacientesPorPagina
          )}
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
  const fechaBase = new Date('1900-01-01T00:00:00.000Z');
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
